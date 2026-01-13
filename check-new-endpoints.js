import axios from 'axios';

const baseUrl = 'https://x8ki-letl-twmt.n7.xano.io/api:WUqbQvot';
const endpoints = ['/auth/register', '/auth/login'];

async function check() {
    console.log(`Checking ${baseUrl}...`);
    for (const ep of endpoints) {
        try {
            console.log(`POST ${ep}...`);
            // Empty body expecting 400/422/500 if exists, 404 if not.
            const res = await axios.post(baseUrl + ep, {});
            console.log(`✅ ${ep} EXISTS (Status: ${res.status})`);
            console.log(res.data);
        } catch (err) {
            if (err.response) {
                if (err.response.status === 404) {
                    console.log(`❌ ${ep} NOT FOUND (404)`);
                } else {
                    console.log(`✅ ${ep} EXISTS (Status: ${err.response.status}) - ${err.response.data?.message}`);
                }
            } else {
                console.log(`❌ Network Error: ${err.message}`);
            }
        }
    }
}

check();
