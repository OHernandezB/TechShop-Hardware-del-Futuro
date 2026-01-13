import axios from 'axios';

const API_URL = 'https://x8ki-letl-twmt.n7.xano.io/api:HmzuGqkP';

async function checkCategories() {
    console.log(`Checking category endpoints on ${API_URL}...`);
    const endpoints = ['/category', '/categories'];

    for (const ep of endpoints) {
        try {
            console.log(`GET ${ep}...`);
            const res = await axios.get(API_URL + ep);
            console.log(`✅ ${ep} FOUND! (Status: ${res.status})`);
            console.log('Sample Data:', JSON.stringify(res.data.slice(0, 2))); // Show first 2
        } catch (error) {
            if (error.response) {
                console.log(`❌ ${ep} returned ${error.response.status}`);
            } else {
                console.log(`❌ Network Error on ${ep}`);
            }
        }
    }
}

checkCategories();
