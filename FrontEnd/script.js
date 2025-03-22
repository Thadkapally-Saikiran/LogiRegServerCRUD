// /*---------------------- Registration ----------------------*/  // Section header for Registration functions
async function register(event) { // Define an async function 'register' that takes an event parameter
  event.preventDefault(); // Prevent the default form submission behavior

  const form = document.forms.registerForm; // Get the form element with name 'registerForm'
  const nameEle = form.name; // Get the input element for name from the form
  const emailEle = form.email; // Get the input element for email from the form
  const phNoEle = form.phNo; // Get the input element for phone number from the form
  const passEle = form.pass; // Get the input element for password from the form

  const name = nameEle.value.trim(); // Retrieve and trim the name value
  const email = emailEle.value.trim(); // Retrieve and trim the email value
  const phNo = phNoEle.value.trim(); // Retrieve and trim the phone number value
  const password = passEle.value.trim(); // Retrieve and trim the password value

  // Get error display elements by their IDs
  const errorNameEle = document.getElementById("errorName"); // Element to display name error
  const errorEmailEle = document.getElementById("errorEmail"); // Element to display email error
  const errorPhEle = document.getElementById("errorPh"); // Element to display phone error
  const errorPassEle = document.getElementById("errorPass"); // Element to display password error

  // Reset previous errors and input borders
  errorNameEle.innerText = ""; // Clear previous name error message
  errorEmailEle.innerText = ""; // Clear previous email error message
  errorPhEle.innerText = ""; // Clear previous phone error message
  errorPassEle.innerText = ""; // Clear previous password error message
  nameEle.style.border = ""; // Reset name input border style
  emailEle.style.border = ""; // Reset email input border style
  phNoEle.style.border = ""; // Reset phone number input border style
  passEle.style.border = ""; // Reset password input border style

  let isValid = true; // Initialize a flag to track validation status

  // Validate name: letters and spaces, minimum 2 characters
  const namePattern = /^[A-Za-z ]{2,}$/; // Regular expression pattern for valid names
  if (!namePattern.test(name)) { // If the name does not match the pattern
    errorNameEle.innerText = "Invalid Name. Only letters and spaces (min 2 characters) allowed."; // Set error message for name
    nameEle.style.border = "1px solid red"; // Highlight name input border in red
    isValid = false; // Mark validation as failed
  }

  // Validate email using a regex pattern
  const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/; // Regular expression pattern for valid emails
  if (!emailPattern.test(email)) { // If the email does not match the pattern
    errorEmailEle.innerText = "Invalid Email address."; // Set error message for email
    emailEle.style.border = "1px solid red"; // Highlight email input border in red
    isValid = false; // Mark validation as failed
  }

  // Validate phone: exactly 10 digits
  const phonePattern = /^\d{10}$/; // Regular expression pattern for a 10-digit number
  if (!phonePattern.test(phNo)) { // If the phone number does not match the pattern
    errorPhEle.innerText = "Invalid Phone Number. Must be exactly 10 digits."; // Set error message for phone
    phNoEle.style.border = "1px solid red"; // Highlight phone input border in red
    isValid = false; // Mark validation as failed
  }

  // Validate password: must be at least 6 characters long
  if (password.length < 6) { // If password length is less than 6 characters
    errorPassEle.innerText = "Password must be at least 6 characters."; // Set error message for password
    passEle.style.border = "1px solid red"; // Highlight password input border in red
    isValid = false; // Mark validation as failed
  }

  if (!isValid) return; // If any validation failed, exit the function

  // Prepare user data object with validated values
  const userData = { name, email, phNo, password }; // Create an object to store user data

  try { // Try block to catch any errors during registration process
      // POST new user data to JSON server
      await axios.post("http://localhost:3000/students", userData); // Send POST request with userData to JSON server endpoint
      alert("Registration successful!"); // Alert the user of successful registration
      form.reset();
      // Redirect to login page after successful registration
      window.location.href = "./Login.html"; // Navigate to the Login page
  } catch (error) { // Catch block for handling errors during registration
    console.error("Error during registration:", error); // Log error details to the console
    alert("Registration failed. Please try again."); // Alert the user of failure
  }
}

/*---------------------- Login ----------------------*/ // Section header for Login functions
async function login(event) { // Define an async function 'login' that takes an event parameter
  event.preventDefault(); // Prevent default form submission behavior

  const form = document.forms.loginForm; // Get the form element with name 'loginForm'
  const emailEle = form.email; // Get the email input element from the login form
  const passwordEle = form.password; // Get the password input element from the login form

  const email = emailEle.value.trim(); // Retrieve and trim the email value
  const password = passwordEle.value.trim(); // Retrieve and trim the password value

  const errorEmailEle = document.getElementById("errorEmail"); // Get element to display email errors
  const errorPasswordEle = document.getElementById("errorPassword"); // Get element to display password errors

  // Reset previous error messages and input borders
  errorEmailEle.innerText = ""; // Clear email error message
  errorPasswordEle.innerText = ""; // Clear password error message
  emailEle.style.border = ""; // Reset email input border style
  passwordEle.style.border = ""; // Reset password input border style

  let isValid = true; // Initialize validation flag

  // Validate email format
  const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/; // Regular expression for valid email
  if (!emailPattern.test(email)) { // If email does not match pattern
    errorEmailEle.innerText = "Invalid Email address."; // Set error message for email
    emailEle.style.border = "1px solid red"; // Highlight email input border in red
    isValid = false; // Mark validation as failed
  }

  // Validate password length
  if (password.length < 6) { // If password is less than 6 characters long
    errorPasswordEle.innerText = "Password must be at least 6 characters."; // Set error message for password
    passwordEle.style.border = "1px solid red"; // Highlight password input border in red
    isValid = false; // Mark validation as failed
  }

  if (!isValid) return; // If any validation fails, exit the function

  try { // Try block to handle login process
    // GET all users from JSON server
    let res = await axios.get("http://localhost:3000/students"); // Send GET request to JSON server to fetch all users
    const users = res.data; // Store the retrieved users data
    // Find a user that matches the credentials provided in the form
    const foundUser = users.find(user => user.email === email && user.password === password); // Use find() to search for matching user
    if (!foundUser) { // If no matching user is found
      errorEmailEle.innerText = "User not found or invalid credentials."; // Display error message for invalid credentials
      emailEle.style.border = "1px solid red"; // Highlight email input border in red
      passwordEle.style.border = "1px solid red"; // Highlight password input border in red
      return; // Exit the function
    }
    alert("Login successful!"); // Alert the user of successful login
    // Redirect to Dashboard (Manage Users) page upon successful login
    window.location.href = "./Dashboard.html"; // Navigate to Dashboard page
  } catch (error) { // Catch block for handling errors during login process
    console.error("Error during login:", error); // Log error details to the console
    alert("Login failed. Please try again."); // Alert the user of login failure
  }
}

/*---------------------- Dashboard / Manage Users ----------------------*/ // Section header for Dashboard functions

// Fetch and display users in a table
async function getUsers() { // Define an async function 'getUsers'
  try { // Try block to catch errors during user retrieval
    let res = await axios.get("http://localhost:3000/students"); // Send GET request to JSON server to fetch all students
    const users = res.data; // Store the retrieved user data
    // Start building HTML table string
    let tableHTML = `
      <table class="table table-bordered table-striped">
        <thead class="table-dark">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone No</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
    `;
    // Loop through each user to build table rows
    users.forEach(user => { // For each user in the users array
      tableHTML += `
        <tr>
          <td>${user.id}</td> <!-- Display user ID -->
          <td>${user.name}</td> <!-- Display user name -->
          <td>${user.email}</td> <!-- Display user email -->
          <td>${user.phNo ? user.phNo : ""}</td> <!-- Display user phone number if exists -->
          <td>
            <button class="btn btn-warning btn-sm" onclick="openUpdateModal('${user.id}')">Update</button> <!-- Button to open update modal for the user -->
            <button class="btn btn-danger btn-sm" onclick="deleteUser('${user.id}')">Delete</button> <!-- Button to delete the user -->
          </td>
        </tr>
      `;
    });
    // End of table HTML
    tableHTML += `
        </tbody>
      </table>
    `;
    // Inject the table HTML into the container div
    document.getElementById("userTableContainer").innerHTML = tableHTML;
  } catch (error) { // Catch block for errors during fetching users
    console.error("Error fetching users:", error); // Log error details
    document.getElementById("userTableContainer").innerHTML = "<p class='text-danger'>Failed to load users.</p>"; // Display error message in the container
  }
}

// Delete a user by ID
async function deleteUser(userId) { // Define an async function 'deleteUser' that takes a user ID as parameter
  if (!confirm("Are you sure you want to delete this user?")) return; // Confirm deletion; if canceled, exit function
  try { // Try block to handle deletion process
    await axios.delete(`http://localhost:3000/students/${userId}`); // Send DELETE request to JSON server for the specific user
    alert("User deleted successfully!"); // Alert that the user was deleted successfully
    getUsers(); // Refresh the user list by calling getUsers()
  } catch (error) { // Catch block for deletion errors
    console.error("Error deleting user:", error); // Log error details
    alert("Failed to delete user."); // Alert the user that deletion failed
  }
}

// Open the update modal and populate fields with user data
async function openUpdateModal(userId) { // Define an async function 'openUpdateModal' that takes a user ID as parameter
  try { // Try block to catch errors during user data retrieval
    let res = await axios.get(`http://localhost:3000/students/${userId}`); // Send GET request for specific user data from JSON server
    const user = res.data; // Store the retrieved user data
    document.getElementById("updateId").value = user.id; // Set the hidden update ID field with user ID
    document.getElementById("updateName").value = user.name; // Populate the update name field with user name
    document.getElementById("updateEmail").value = user.email; // Populate the update email field with user email
    document.getElementById("updatePhNo").value = user.phNo ? user.phNo : ""; // Populate the update phone field with user phone number if exists
    
    // Reset error messages and input borders in the update form
    document.getElementById("updateErrorName").innerText = "";
    document.getElementById("updateErrorEmail").innerText = "";
    document.getElementById("updateErrorPh").innerText = "";
    document.getElementById("updateName").style.border = "";
    document.getElementById("updateEmail").style.border = "";
    document.getElementById("updatePhNo").style.border = "";

    // Show the update modal using Bootstrap's Modal component
    let updateModal = new bootstrap.Modal(document.getElementById("updateModal")); // Create a new modal instance for the update modal
    updateModal.show(); // Display the modal
  } catch (error) { // Catch block for errors during opening update modal
    console.error("Error fetching user for update:", error); // Log error details
    alert("Failed to load user details."); // Alert that user details could not be loaded
  }
}

// Update user details from the modal form
async function updateUser() { // Define an async function 'updateUser'
  const id = document.getElementById("updateId").value; // Retrieve the user ID from the hidden input field
  const name = document.getElementById("updateName").value.trim(); // Get and trim the updated name value
  const email = document.getElementById("updateEmail").value.trim(); // Get and trim the updated email value
  const phNo = document.getElementById("updatePhNo").value.trim(); // Get and trim the updated phone number value

  // Get error display elements for the update form
  const errorNameEle = document.getElementById("updateErrorName");
  const errorEmailEle = document.getElementById("updateErrorEmail");
  const errorPhEle = document.getElementById("updateErrorPh");

  // Reset previous error messages and borders
  errorNameEle.innerText = "";
  errorEmailEle.innerText = "";
  errorPhEle.innerText = "";
  document.getElementById("updateName").style.border = "";
  document.getElementById("updateEmail").style.border = "";
  document.getElementById("updatePhNo").style.border = "";

  let isValid = true; // Initialize validation flag

  // Validate updated name using regex for letters and spaces
  const namePattern = /^[A-Za-z ]{2,}$/; // Regular expression for valid names
  if (!namePattern.test(name)) { // If name is invalid
    errorNameEle.innerText = "Invalid Name."; // Display error message for name
    document.getElementById("updateName").style.border = "1px solid red"; // Highlight update name input border in red
    isValid = false; // Mark validation as failed
  }

  // Validate updated email using regex
  const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/; // Regular expression for valid emails
  if (!emailPattern.test(email)) { // If email is invalid
    errorEmailEle.innerText = "Invalid Email."; // Display error message for email
    document.getElementById("updateEmail").style.border = "1px solid red"; // Highlight update email input border in red
    isValid = false; // Mark validation as failed
  }

  // Validate updated phone number if provided; if not empty, must be exactly 10 digits
  const phonePattern = /^\d{10}$/; // Regular expression for a 10-digit number
  if (phNo !== "" && !phonePattern.test(phNo)) { // If phone number is provided but invalid
    errorPhEle.innerText = "Invalid Phone Number."; // Display error message for phone number
    document.getElementById("updatePhNo").style.border = "1px solid red"; // Highlight update phone input border in red
    isValid = false; // Mark validation as failed
  }

  if (!isValid) return; // If any validation fails, exit the function

  // Prepare an object with updated user data
  const updatedData = { name, email, phNo };

  try { // Try block to catch errors during update
    await axios.put(`http://localhost:3000/students/${id}`, updatedData); // Send PUT request to update user data on JSON server
    alert("User updated successfully!"); // Alert the user that the update was successful
    // Hide the update modal
    let updateModal = bootstrap.Modal.getInstance(document.getElementById("updateModal")); // Retrieve the current modal instance
    updateModal.hide(); // Hide the modal
    // Refresh the user list by calling getUsers()
    getUsers(); // Call getUsers() to refresh the displayed user list
  } catch (error) { // Catch block for errors during update
    console.error("Error updating user:", error); // Log error details
    alert("Failed to update user."); // Alert the user that the update failed
  }
}
