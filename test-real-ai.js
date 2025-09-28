// Test with different question to trigger real AI
import fetch from 'node-fetch';

async function testRealAI() {
  try {
    console.log('Testing with a question that should trigger real AI...');
    
    const response = await fetch('http://localhost:5000/api/projects?chatbot=true', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: 'Tell me about Himanshu\'s technical skills and what programming languages he knows.',
        conversationHistory: []
      })
    });

    const data = await response.json();
    
    if (response.ok) {
      console.log('✅ CHATBOT SUCCESS!');
      console.log('AI Response:', data.response);
      console.log('Fallback:', data.fallback || false);
      
      if (data.fallback) {
        console.log('⚠️  Still using fallback - checking server logs...');
      } else {
        console.log('🎉 REAL AI RESPONSE!');
      }
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

testRealAI();
