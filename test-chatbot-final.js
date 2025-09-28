// Test chatbot with new API key
import fetch from 'node-fetch';

async function testChatbot() {
  try {
    console.log('Testing chatbot with new Google AI Studio API key...');
    
    const response = await fetch('http://localhost:5000/api/projects?chatbot=true', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: 'What projects has Himanshu worked on?',
        conversationHistory: []
      })
    });

    const data = await response.json();
    
    if (response.ok) {
      console.log('✅ CHATBOT SUCCESS!');
      console.log('AI Response:', data.response);
      console.log('Timestamp:', data.timestamp);
      console.log('Fallback:', data.fallback || false);
    } else {
      console.log('❌ ERROR:');
      console.log('Status:', response.status);
      console.log('Error:', data.error);
    }
  } catch (error) {
    console.log('❌ NETWORK ERROR:');
    console.log(error.message);
  }
}

// Wait for server to start
setTimeout(testChatbot, 3000);
