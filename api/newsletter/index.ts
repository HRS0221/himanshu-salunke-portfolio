import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { email } = req.body

  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Valid email is required' })
  }

  try {
    // In a real application, you would:
    // 1. Validate the email format
    // 2. Check if email already exists
    // 3. Add to your newsletter service (Mailchimp, ConvertKit, etc.)
    // 4. Send confirmation email
    
    // For now, we'll just log the subscription
    console.log('Newsletter subscription:', email)
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500))
    
    return res.status(200).json({ 
      message: 'Successfully subscribed to newsletter!',
      email: email
    })
  } catch (error) {
    console.error('Newsletter subscription error:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
