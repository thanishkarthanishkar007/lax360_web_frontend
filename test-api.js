async function test() {
    try {
        const response = await fetch('https://lax360-web-backend.onrender.com/api/contacts/createContact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                Name: "Test",
                email: "test@test.com",
                phone: "1234567890",
                service: "Web Development",
                message: "Test message"
            })
        });
        const text = await response.text();
        console.log("HTTP Status:", response.status);
        console.log("Response Body:", text);
    } catch (err) {
        console.error("Error:", err.message);
    }
}
test();
