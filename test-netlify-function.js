// Test-Script für die Netlify Function
const { handler } = require('./netlify/functions/update-test-data-daily.js');

async function testNetlifyFunction() {
  console.log('🧪 Teste Netlify Function lokal...\n');
  
  try {
    console.log('📡 Rufe Netlify Function auf...');
    const result = await handler({}, {});
    
    console.log('Status:', result.statusCode);
    console.log('Response:', JSON.parse(result.body));
    
    if (result.statusCode === 200) {
      console.log('✅ Netlify Function Test erfolgreich!');
    } else {
      console.log('❌ Netlify Function Test fehlgeschlagen');
    }
    
  } catch (error) {
    console.error('❌ Fehler beim Testen der Netlify Function:', error.message);
  }
}

testNetlifyFunction(); 