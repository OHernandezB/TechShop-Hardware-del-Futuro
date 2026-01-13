import axios from 'axios';

// URL obtenida de api.js (previo view_file)
const PRODUCT_API_URL = 'https://x8ki-letl-twmt.n7.xano.io/api:HmzuGqkP';

async function checkCrudEndpoints() {
    console.log(`Checking CRUD endpoints on ${PRODUCT_API_URL}...`);

    try {
        // Check POST (Create) - Send empty to see if 400/422/500 (exists) vs 404
        console.log('Testing POST /product...');
        await axios.post(`${PRODUCT_API_URL}/product`, {});
        console.log('✅ POST /product found (200 OK - unexpected for empty body but path exists)');
    } catch (error) {
        if (error.response) {
            if (error.response.status === 404) {
                console.log('❌ POST /product NOT FOUND');
            } else {
                console.log(`✅ POST /product found (Status: ${error.response.status})`);
            }
        } else {
            console.log('❌ Network Error on POST');
        }
    }

    try {
        // Check DELETE (Delete) - Use dummy ID 0
        console.log('Testing DELETE /product/0...');
        await axios.delete(`${PRODUCT_API_URL}/product/0`);
        console.log('✅ DELETE /product/{id} found');
    } catch (error) {
        if (error.response) {
            if (error.response.status === 404) {
                // Xano often returns 404 if the item doesn't exist, which is ambiguous for "endpoint not found".
                // But usually "Endpoint not found" has a specific body.
                if (error.response.data && error.response.data.code === "ERROR_CODE_NOT_FOUND") {
                    console.log('⚠️ DELETE /product/0 returned 404. Might be "Item not found" OR "Endpoint not found".');
                    console.log('   Body:', JSON.stringify(error.response.data));
                } else {
                    console.log('✅ DELETE /product/{id} likely exists (404 refers to resource, not path)');
                }
            } else {
                console.log(`✅ DELETE /product/{id} found (Status: ${error.response.status})`);
            }
        } else {
            console.log('❌ Network Error on DELETE');
        }
    }
}

checkCrudEndpoints();
