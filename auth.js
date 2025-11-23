let chosenRole = null;

// Step 1: User selects Student or Teacher
function selectRole(role) {
    chosenRole = role;
    document.getElementById("login-box").style.display = "block";
}

// Step 2: Firebase login logic
function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;

            // YOUR ADMIN UID (Teacher)
            const adminUID = "lPvZ7WGuTVP1LcYvKjGYtOj1GBD3";

            // Teacher login
            if (chosenRole === "teacher") {
                if (user.uid === adminUID) {
                    window.location.href = "edit.html";   // teacher page
                } else {
                    alert("Access denied. Only authorized teachers may edit the timetable.");
                    firebase.auth().signOut();
                }
            }

            // Student login
            if (chosenRole === "student") {
                window.location.href = "view.html";  // student page
            }

        })
        .catch((error) => {
            alert("Login failed: " + error.message);
        });
}

// Prevent people from typing edit.html directly (teacher page protection)
firebase.auth().onAuthStateChanged((user) => {
    const path = window.location.pathname;

    if (!user && (path.includes("view.html") || path.includes("edit.html"))) {
        window.location.href = "index.html";
    }
});

