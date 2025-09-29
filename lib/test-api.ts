// Test script to verify API connectivity
async function testApiEndpoint() {
  const API_URL = "http://localhost:6060/api";
  const userId = "96bd82b0-ca1c-4ebc-a4b0-1bb107219595"; // Example user ID
  
  console.log("Testing API connectivity...");
  
  try {
    // Test base endpoint
    console.log(`Testing: ${API_URL}/users`);
    const usersResponse = await fetch(`${API_URL}/users`, {
      headers: {
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
      },
      cache: 'no-store'
    });
    
    if (usersResponse.ok) {
      const users = await usersResponse.json();
      console.log("✅ Users endpoint working. First user:", users[0]);
      
      // Test specific user endpoint
      console.log(`Testing: ${API_URL}/users/${userId}`);
      const userResponse = await fetch(`${API_URL}/users/${userId}`, {
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache',
        },
        cache: 'no-store'
      });
      
      if (userResponse.ok) {
        const user = await userResponse.json();
        console.log("✅ Specific user endpoint working:", user);
      } else {
        console.log("❌ Specific user endpoint failed:", userResponse.status, userResponse.statusText);
      }
    } else {
      console.log("❌ Users endpoint failed:", usersResponse.status, usersResponse.statusText);
    }
  } catch (error) {
    console.error("❌ API test failed:", error);
  }
}

// Run the test if this script is executed directly
if (typeof window !== 'undefined') {
  // Browser environment
  testApiEndpoint();
} else {
  // Node environment
  console.log("Copy and paste this function into your browser console to test the API");
}

export { testApiEndpoint };