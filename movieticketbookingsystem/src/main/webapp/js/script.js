
// This is for registration

document.addEventListener("DOMContentLoaded", function () {

    document.getElementById("registerForm").addEventListener("submit", async function (event) {

        event.preventDefault(); // Prevent default form submission

        console.log("Form submission triggered");

        alert("Submitting form...");

        // Get form values
        const name = document.getElementById("name").value;
        const age = document.getElementById("age").value;
        const address = document.getElementById("address").value;
        const gender = document.getElementById("gender").value;
        const mobileNo = document.getElementById("mobile").value;
        const emailId = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        console.log("Collected Data:", { name, age, address, gender, mobileNo, emailId });

        

        // Prepare request body
        const requestBody = {
            name,
            age: parseInt(age, 10), // Ensure age is a number
            address,
            gender,
            mobileNo,
            emailId,
            password,
         
        };

        try {
            console.log("Sending data to server...");
            const response = await fetch("http://localhost:8099/user/addNew", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(requestBody)
                
            });
            console.log(JSON.stringify(requestBody))

            if (!response.ok) {
                throw new Error("Failed to register user");
            }

            const responseData = await response.json();
            alert("User registered successfully!");
            console.log("Response:", responseData);
            document.getElementById("registerForm").reset(); 
        } catch (error) {
            console.error("Error:", error);
            alert("Error registering user. Please try again.");
        }

    });

});


// This is for login

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("loginForm").addEventListener("submit", async function (event) {
        event.preventDefault(); // Prevent default form submission

        // Get form values
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        console.log("Logging in with", { username, password });

        // Prepare request body
        const requestBody = {
            username,
            password
        };

        try {
            console.log("Sending login data to server...");

            const response = await fetch("http://localhost:8099/user/getToken", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(requestBody)
            });

            if (!response.ok) {
                throw new Error("Login failed: " + response.statusText);
            }

            // Get token and role from response
            const responseData = await response.json();
            console.log("Login successful. Token:", responseData.token);
            console.log("User role:", responseData.role);

            // Store token and role in localStorage
            localStorage.setItem("authToken", responseData.token);
            localStorage.setItem("userRole", responseData.role);

            alert("Login successful!");

            // Redirect based on role
            if (responseData.role === "ROLE_ADMIN") {
                window.location.href = "../Pages/admin_dashboard.html"; // Redirect to admin page
            } else {
                window.location.href = "../Pages/user_dashboard.html"; // Redirect to user page
            }

        } catch (error) {
            console.error("Error during login:", error);
            alert("Login failed. Please check your credentials.");
        }
    });
});
