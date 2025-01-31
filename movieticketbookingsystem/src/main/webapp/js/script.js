
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







// This is for admin to add movie
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("addMovieForm").addEventListener("submit", async function (event) {
        event.preventDefault(); // Prevent default form submission

        // Get form values
        const movieName = document.getElementById("movieName").value;
        const duration = document.getElementById("duration").value;
        const rating = document.getElementById("rating").value;
        const releaseDate = document.getElementById("releaseDate").value;
        const genre = document.getElementById("genre").value;
        const language = document.getElementById("language").value;

        console.log("Adding movie with details:", { movieName, duration, rating, releaseDate, genre, language });

        // Prepare request body
        const requestBody = {
            movieName,
            duration,
            rating,
            releaseDate,
            genre,
            language
        };

        try {
            console.log("Sending movie data to server...");

            const response = await fetch("http://localhost:8099/movie/addNew", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("authToken") // Add token for authorization if needed
                },
                body: JSON.stringify(requestBody)
            });

            if (!response.ok) {
                throw new Error("Movie creation failed: " + response.statusText);
            }

            const responseData = await response.json();
            console.log("Movie added successfully:", responseData);

            // Handle response (e.g., show success message or redirect)
            alert("Movie added successfully!");

            // Optionally, redirect to another page after successful addition
            window.location.href = "movie_dashboard.html"; // Or another page if required

        } catch (error) {
            console.error("Error during movie addition:", error);
            alert("Failed to add movie. Please try again.");
        }
    });
});








// for adding a show ans associated seats

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("addShowForm").addEventListener("submit", async function (event) {
        event.preventDefault(); // Prevent default form submission

        // Get form values
        const movieName = document.getElementById("movieId").value; // Ensure the ID matches the input field
        const theaterAddress = document.getElementById("theaterId").value; // Ensure the ID matches the input field
        const showTime = document.getElementById("showTime").value;
        const showDate = document.getElementById("showDate").value;

        console.log("Adding show with details:", { movieName, theaterAddress, showTime, showDate });

        try {
            // Step 1: Get Theater ID from the theater/getByName/{address} endpoint
            const theaterResponse = await fetch(`http://localhost:8099/theater/getByName/${theaterAddress}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("authToken") // Add token if needed
                }
            });

            if (!theaterResponse.ok) {
                throw new Error("Theater not found: " + theaterResponse.statusText);
            }

            const theaterData = await theaterResponse.json();
            const theaterId = theaterData.id;
            console.log("Theater ID:", theaterId);

            // Step 2: Get Movie ID from the movie/getByName/{name} endpoint
            const movieResponse = await fetch(`http://localhost:8099/movie/getByName/${movieName}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("authToken") // Add token if needed
                }
            });

            if (!movieResponse.ok) {
                throw new Error("Movie not found: " + movieResponse.statusText);
            }

            const movieData = await movieResponse.json();
            const movieId = movieData.id;
            console.log("Movie ID:", movieId);

            // Step 3: Create Show and send to show/addNew endpoint
            const showRequestBody = {
                movieId,
                theaterId,
                showTime,
                showDate
            };

            const showResponse = await fetch("http://localhost:8099/show/addNew", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("authToken") // Add token if needed
                },
                body: JSON.stringify(showRequestBody)
            });

            if (!showResponse.ok) {
                throw new Error("Failed to add show: " + showResponse.statusText);
            }

            const showData = await showResponse.json();
            console.log("Show added successfully:", showData);

            alert("Show added successfully!");

            // Optionally, redirect to another page after successful addition
            window.location.href = "show_dashboard.html"; // Or another page if required

        } catch (error) {
            console.error("Error during show creation:", error);
            alert("Failed to add show. Please try again.");
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("associateSeatsForm").addEventListener("submit", async function (event) {
        event.preventDefault(); // Prevent default form submission

        // Get form values
        const showId = document.getElementById("showId").value;
        const classicPrice = document.getElementById("classicPrice").value;
        const premiumPrice = document.getElementById("premiumPrice").value;

        console.log("Associating seats with show:", { showId, classicPrice, premiumPrice });

        // Prepare request body
        const requestBody = {
            showId,
            classicPrice,
            premiumPrice
        };

        try {
            const response = await fetch("http://localhost:8099/show/associateSeats", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("authToken") // Add token if needed
                },
                body: JSON.stringify(requestBody)
            });

            if (!response.ok) {
                throw new Error("Failed to associate seats: " + response.statusText);
            }

            const responseData = await response.json();
            console.log("Seats associated successfully:", responseData);

            alert("Seats associated successfully!");

            // Optionally, reset the form after submission
            document.getElementById("associateSeatsForm").reset();

        } catch (error) {
            console.error("Error during seat association:", error);
            alert("Failed to associate seats. Please try again.");
        }
    });
});











// to add theater and theater seats

document.addEventListener("DOMContentLoaded", function () {
    // Handle adding a theater
    document.getElementById("addTheaterForm").addEventListener("submit", async function (event) {
        event.preventDefault(); // Prevent default form submission

        // Get form values for theater
        const theaterName = document.getElementById("theaterName").value;
        const address = document.getElementById("address").value;

        console.log("Adding theater with details:", { theaterName, address });

        try {
            const theaterRequestBody = {
                name: theaterName,
                address: address
            };

            const response = await fetch("http://localhost:8099/theater/addNew", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("authToken") // Add token if needed
                },
                body: JSON.stringify(theaterRequestBody)
            });

            if (!response.ok) {
                throw new Error("Failed to add theater: " + response.statusText);
            }

            const theaterData = await response.json();
            console.log("Theater added successfully:", theaterData);

            alert("Theater added successfully!");

            // Optionally, reset the form after submission
            document.getElementById("addTheaterForm").reset();

        } catch (error) {
            console.error("Error during theater addition:", error);
            alert("Failed to add theater. Please try again.");
        }
    });

    // Handle adding theater seats
    document.getElementById("addTheaterSeatForm").addEventListener("submit", async function (event) {
        event.preventDefault(); // Prevent default form submission

        // Get form values for theater seats
        const addressSeats = document.getElementById("addressSeats").value;
        const seatsInRow = document.getElementById("seatsInRow").value;
        const premiumSeats = document.getElementById("premiumSeats").value;
        const classicSeats = document.getElementById("classicSeats").value;

        console.log("Adding seats with details:", { addressSeats, seatsInRow, premiumSeats, classicSeats });

        try {
            
            // Prepare the seats data
            const seatsRequestBody = {
                addressSeats,
                seatsInRow,
                premiumSeats,
                classicSeats
            };

            // Send the seat data to the backend
            const seatsResponse = await fetch("http://localhost:8099/theater/addTheaterSeat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("authToken") // Add token if needed
                },
                body: JSON.stringify(seatsRequestBody)
            });

            if (!seatsResponse.ok) {
                throw new Error("Failed to add seats: " + seatsResponse.statusText);
            }

            const seatsData = await seatsResponse.json();
            console.log("Seats added successfully:", seatsData);

            alert("Seats added successfully!");

            // Optionally, reset the form after submission
            document.getElementById("addTheaterSeatForm").reset();

        } catch (error) {
            console.error("Error during seat addition:", error);
            alert("Failed to add seats. Please try again.");
        }
    });
});

// for user to book a ticket

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("bookTicketForm").addEventListener("submit", async function (event) {
        event.preventDefault(); // Prevent default form submission

        // Get form values
        const showId = document.getElementById("showId").value;
        const seats = document.getElementById("seats").value.split(",").map(seat => seat.trim()); // Split and trim seat numbers

        // Get userId from localStorage
        const userId = localStorage.getItem("userId");

        if (!userId) {
            alert("User ID not found in localStorage. Please log in again.");
            return;
        }

        console.log("Booking tickets for show:", { showId, userId, seats });

        // Prepare request body
        const requestBody = {
            showId,
            userId,
            seats
        };

        try {
            const response = await fetch("http://localhost:8099/ticket/book", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("authToken") // Add token if needed
                },
                body: JSON.stringify(requestBody)
            });

            if (!response.ok) {
                throw new Error("Booking failed: " + response.statusText);
            }

            const responseData = await response.json();
            console.log("Tickets booked successfully:", responseData);

            alert("Tickets booked successfully!");

            // Optionally, reset the form after submission
            document.getElementById("bookTicketForm").reset();

        } catch (error) {
            console.error("Error during ticket booking:", error);
            alert("Booking failed. Please try again.");
        }
    });
});

