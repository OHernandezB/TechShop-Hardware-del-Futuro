import axios from 'axios';
import fs from 'fs';

const logFile = 'auth_debug_log.txt';

const candidates = [
    { url: 'https://x8ki-letl-twmt.n7.xano.io/api:E-NnALTq', name: 'Group E-NnALTq' },
    { url: 'https://x8ki-letl-twmt.n7.xano.io/api:WUqbQvot', name: 'Group WUqbQvot' },
    { url: 'https://x8ki-letl-twmt.n7.xano.io/api:mZqu911u', name: 'Group mZqu911u' }
];

const paths = [
    '/auth/signup',
    '/signup',
    '/user',
    '/account'
];

const payload = {
    name: "Debug User",
    email: `debug_${Date.now()}@example.com`,
    password: "password123"
};

function log(msg) {
    console.log(msg);
    fs.appendFileSync(logFile, msg + '\n');
}

async function debugAuth() {
    fs.writeFileSync(logFile, "=== STARTING AUTH DEBUG ===\n");
    log("=== STARTING AUTH DEBUG ===");

    for (const cand of candidates) {
        log(`\nChecking ${cand.name} (${cand.url})`);

        for (const path of paths) {
            const fullUrl = `${cand.url}${path}`;
            try {
                log(`  POST ${path}...`);
                const res = await axios.post(fullUrl, payload);
                log(`  ✅ SUCCESS! Status: ${res.status}`);
                log(`     Response: ${JSON.stringify(res.data)}`);
            } catch (err) {
                if (err.response) {
                    log(`  ❌ Failed with Status: ${err.response.status}`);
                    log(`     Data: ${JSON.stringify(err.response.data)}`);
                } else {
                    log(`  ❌ Network Error: ${err.message}`);
                }
            }
        }
    }
}

debugAuth();
