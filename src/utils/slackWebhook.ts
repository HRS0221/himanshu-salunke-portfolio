interface SlackMessage {
  text: string;
  blocks?: any[];
  attachments?: any[];
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export class SlackWebhook {
  private webhookUrl: string;

  constructor() {
    // Use Express server in development, Vercel API route in production
    this.webhookUrl = import.meta.env.DEV 
      ? 'http://localhost:3002/api/submit-form'
      : '/api/submit-form';
  }

  private createContactMessage(data: ContactFormData): SlackMessage {
    const { name, email, subject, message } = data;

    return {
      text: `New contact form submission from ${name}`,
      blocks: [
        {
          type: 'header',
          text: {
            type: 'plain_text',
            text: '📬 New Portfolio Message',
            emoji: true,
          },
        },
        {
          type: 'divider',
        },
        {
          type: 'section',
          fields: [
            {
              type: 'mrkdwn',
              text: `*From:*\n${name}`,
            },
            {
              type: 'mrkdwn',
              text: `*Email:*\n${email}`,
            },
            {
              type: 'mrkdwn',
              text: `*Subject:*\n${subject}`,
            },
          ],
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `*Message:*\n${message}`,
          },
        },
        {
          type: 'context',
          elements: [
            {
              type: 'plain_text',
              text: `Received on: ${new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' })}`,
              emoji: true,
            },
          ],
        },
      ],
    };
  }

  async sendContactNotification(data: ContactFormData): Promise<boolean> {
    try {
      const response = await fetch(this.webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.log('✅ Contact form submitted successfully');
        return true;
      } else {
        console.error('❌ Failed to submit contact form:', response.statusText);
        return false;
      }
    } catch (error) {
      console.error('❌ Error submitting contact form:', error);
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
