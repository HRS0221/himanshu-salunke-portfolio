interface SlackMessage {
  text: string;
  blocks?: any[];
  attachments?: any[];
}

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  company?: string;
  phone?: string;
}

export class SlackWebhook {
  private webhookUrl: string;

  constructor() {
    this.webhookUrl = import.meta.env.VITE_SLACK_WEBHOOK_URL || '';
  }

  private createContactMessage(data: ContactFormData): SlackMessage {
    const { name, email, subject, message, company, phone } = data;

    return {
      text: `New contact form submission from ${name}`,
      blocks: [
        {
          type: 'header',
          text: {
            type: 'plain_text',
            text: '📧 New Contact Form Submission'
          }
        },
        {
          type: 'section',
          fields: [
            {
              type: 'mrkdwn',
              text: `*Name:*\n${name}`
            },
            {
              type: 'mrkdwn',
              text: `*Email:*\n${email}`
            },
            {
              type: 'mrkdwn',
              text: `*Subject:*\n${subject}`
            },
            {
              type: 'mrkdwn',
              text: `*Company:*\n${company || 'Not provided'}`
            }
          ]
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `*Message:*\n${message}`
          }
        },
        ...(phone ? [{
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `*Phone:*\n${phone}`
          }
        }] : []),
        {
          type: 'context',
          elements: [
            {
              type: 'mrkdwn',
              text: `📅 ${new Date().toLocaleString()} | 🌐 Portfolio Contact Form`
            }
          ]
        }
      ]
    };
  }

  async sendContactNotification(data: ContactFormData): Promise<boolean> {
    if (!this.webhookUrl) {
      console.warn('Slack webhook URL not configured');
      return false;
    }

    try {
      const message = this.createContactMessage(data);
      
      const response = await fetch(this.webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
      });

      if (response.ok) {
        console.log('✅ Slack notification sent successfully');
        return true;
      } else {
        console.error('❌ Failed to send Slack notification:', response.statusText);
        return false;
      }
    } catch (error) {
      console.error('❌ Error sending Slack notification:', error);
      return false;
    }
  }

  async sendProjectNotification(projectData: {
    projectName: string;
    clientName: string;
    description: string;
    budget?: string;
    timeline?: string;
  }): Promise<boolean> {
    if (!this.webhookUrl) {
      console.warn('Slack webhook URL not configured');
      return false;
    }

    try {
      const message: SlackMessage = {
        text: `New project inquiry: ${projectData.projectName}`,
        blocks: [
          {
            type: 'header',
            text: {
              type: 'plain_text',
              text: '🚀 New Project Inquiry'
            }
          },
          {
            type: 'section',
            fields: [
              {
                type: 'mrkdwn',
                text: `*Project:*\n${projectData.projectName}`
              },
              {
                type: 'mrkdwn',
                text: `*Client:*\n${projectData.clientName}`
              },
              {
                type: 'mrkdwn',
                text: `*Budget:*\n${projectData.budget || 'Not specified'}`
              },
              {
                type: 'mrkdwn',
                text: `*Timeline:*\n${projectData.timeline || 'Not specified'}`
              }
            ]
          },
          {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text: `*Description:*\n${projectData.description}`
            }
          },
          {
            type: 'context',
            elements: [
              {
                type: 'mrkdwn',
                text: `📅 ${new Date().toLocaleString()} | 💼 Project Inquiry`
              }
            ]
          }
        ]
      };

      const response = await fetch(this.webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
      });

      return response.ok;
    } catch (error) {
      console.error('❌ Error sending project notification:', error);
      return false;
    }
  }
}
