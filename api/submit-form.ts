import { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, subject, message } = req.body;

    // Check if the Slack Webhook URL is set up correctly
    const SLACK_WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL;
    
    if (!SLACK_WEBHOOK_URL) {
      console.error('❌ Slack Webhook URL is not configured');
      return res.status(500).json({ error: 'Slack Webhook URL is not configured.' });
    }

    // Format the data into a nice-looking Slack message using "Block Kit"
    const slackMessage = {
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

    // Send the message to your secret Slack Webhook URL
    const slackResponse = await fetch(SLACK_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(slackMessage),
    });

    if (slackResponse.ok) {
      console.log('✅ Slack notification sent successfully');
      res.json({ success: true });
    } else {
      console.error('❌ Failed to send Slack notification:', slackResponse.status, slackResponse.statusText);
      res.status(500).json({ error: 'Failed to send notification to Slack.' });
    }

  } catch (error) {
    console.error('❌ Failed to process request:', error);
    res.status(500).json({ error: 'Failed to process request.' });
  }
}
