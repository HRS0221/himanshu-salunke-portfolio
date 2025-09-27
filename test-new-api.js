// Test script for new Gemini API key
import fetch from 'node-fetch';

async function testChatbot() {
  try {
    console.log('Testing chatbot with new API key...');
    
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
      console.log('✅ SUCCESS!');
      console.log('AI Response:', data.response);
    } else {
      console.log('❌ ERROR:');
      console.log('Status:', response.status);
      console.log('Error:', data.error);
      console.log('Fallback:', data.fallback);
    }
  } catch (error) {
    console.log('❌ NETWORK ERROR:');
    console.log(error.message);
  }
}

testChatbot();
