// Test script for Google AI Studio API key
import fetch from 'node-fetch';

async function testAIStudioKey(apiKey) {
  try {
    console.log('Testing Google AI Studio API key...');
    console.log('API Key:', apiKey.substring(0, 10) + '...');
    
    // Test with Gemini 2.5 Flash (latest model)
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: "Hello! This is a test message. Please respond with a short greeting."
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        }
      })
    });

    console.log('Response Status:', response.status);
    
    const data = await response.json();
    
    if (response.ok) {
      console.log('✅ SUCCESS!');
      if (data.candidates && data.candidates[0] && data.candidates[0].content) {
        console.log('AI Response:', data.candidates[0].content.parts[0].text);
        console.log('✅ API Key is working perfectly!');
      }
    } else {
      console.log('❌ ERROR:');
      console.log('Error Code:', data.error?.code);
      console.log('Error Message:', data.error?.message);
      console.log('Error Status:', data.error?.status);
    }
  } catch (error) {
    console.log('❌ NETWORK ERROR:');
    console.log(error.message);
  }
}

// Replace 'YOUR_API_KEY_HERE' with the actual API key
const API_KEY = 'AIzaSyDQ4LT8laNpRlIkb4qGW0sjNpJhr6_lj84';

if (API_KEY === 'YOUR_API_KEY_HERE') {
  console.log('Please replace YOUR_API_KEY_HERE with your actual API key from Google AI Studio');
} else {
  testAIStudioKey(API_KEY);
}
