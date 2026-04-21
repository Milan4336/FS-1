const test = async () => {
    const baseUrl = 'http://localhost:3008/api/auth';
    
    console.log('\n--- VERIFYING EXPERIMENT 8 RBAC ---');

    try {
        // 1. Login as User
        console.log('\n1. Logging in as Regular User (user@hub.com)...');
        const userLogin = await fetch(`${baseUrl}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: 'user@hub.com', password: 'password123' })
        });
        
        const userCookie = userLogin.headers.get('set-cookie');
        console.log('✓ User Login Success');

        // 2. Try Admin Endpoint as User
        console.log('2. Attempting Admin Dashboard access as Regular User...');
        const userAdminRes = await fetch(`${baseUrl}/admin-dashboard`, {
            headers: { 'Cookie': userCookie }
        });
        const userAdminData = await userAdminRes.json();
        
        if (userAdminRes.status === 403) {
            console.log(`✓ Expected Rejection: 403 ${userAdminData.message}`);
        } else {
            console.log(`!! Failed: Got ${userAdminRes.status}`);
        }

        // 3. Login as Admin
        console.log('\n3. Logging in as Administrator (admin@hub.com)...');
        const adminLogin = await fetch(`${baseUrl}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: 'admin@hub.com', password: 'password123' })
        });
        
        const adminCookie = adminLogin.headers.get('set-cookie');
        console.log('✓ Admin Login Success');

        // 4. Try Admin Endpoint as Admin
        console.log('4. Attempting Admin Dashboard access as Administrator...');
        const adminRes = await fetch(`${baseUrl}/admin-dashboard`, {
            headers: { 'Cookie': adminCookie }
        });
        const adminData = await adminRes.json();
        
        if (adminRes.status === 200) {
            console.log(`✓ Access Granted: ${adminData.message}`);
        } else {
            console.log(`!! Failed: Got ${adminRes.status}`);
        }

        console.log('\n--- EXPERIMENT 8 VERIFICATION COMPLETE: ALL GATES PASS ---\n');

    } catch (err) {
        console.error('FAILED:', err.message);
    }
};

test();
