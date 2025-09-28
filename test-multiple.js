// Test multiple questions to verify AI is working
import fetch from 'node-fetch';

async function testMultipleQuestions() {
  const questions = [
    'What is Himanshu\'s background and experience?',
    'Tell me about his AI and machine learning projects.',
    'What technologies does he use for web development?',
    'How can I contact Himanshu?'
  ];

  for (let i = 0; i < questions.length; i++) {
    try {
      console.log(`\n--- Question ${i + 1}: ${questions[i]} ---`);
      
      const response = await fetch('http://localhost:5000/api/projects?chatbot=true', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: questions[i],
          conversationHistory: []
        })
      });

      const data = await response.json();
      
      if (response.ok) {
        console.log('✅ AI Response:', data.response.substring(0, 100) + '...');
        console.log('Fallback:', data.fallback || false);
      } else {
        console.log('❌ Error:', data.error);
      }
    } catch (error) {
      console.log('❌ Network Error:', error.message);
    }
    
    // Wait between requests
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
}

testMultipleQuestions();
