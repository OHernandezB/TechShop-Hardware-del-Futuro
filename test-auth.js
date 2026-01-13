import axios from 'axios';

const baseUrls = [
    'https://x8ki-letl-twmt.n7.xano.io/api:mZqu911u',
    'https://x8ki-letl-twmt.n7.xano.io/api:E-NnALTq',
    'https://x8ki-letl-twmt.n7.xano.io/api:WUqbQvot'
];

const endpoints = [
    '/auth/login',
    '/auth/signup',
    '/login',
    '/signup',
    '/account'
];

async function testEndpoints() {
    console.log('Testing Auth Endpoints...\n');

    for (const url of baseUrls) {
        console.log(`Checking Group: ${url}`);
        for (const endpoint of endpoints) {
            try {
                // Try POST with empty body, looking for 400 (Bad Request) or 422 (Validation Error)
                // 404 means it doesn't exist.
                await axios.post(`${url}${endpoint}`, {});
                console.log(`  [FOUND] POST ${endpoint} - 200 OK (Unexpected for empty body but exists)`);
            } catch (error) {
                if (error.response) {
                    const status = error.response.status;
                    if (status !== 404) {
                        console.log(`  [FOUND] POST ${endpoint} - Status: ${status} (Exists!)`);
                        // log schema hints if available
                        if (error.response.data) console.log(`      Msg: ${JSON.stringify(error.response.data)}`);
                    }
                }
            }
        }
        console.log('---');
    }
}

testEndpoints();
