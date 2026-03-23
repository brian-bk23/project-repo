// Smooth scroll
function scrollToSection(id) {
    document.getElementById(id).scrollIntoView({ behavior: "smooth" });
}

// Typing animation
const roles = ["Web Developer", "Student", "Designer"];
let index = 0;
let charIndex = 0;
const typingElement = document.getElementById("typing");

function type() {
    if (charIndex < roles[index].length) {
        typingElement.innerHTML += roles[index].charAt(charIndex);
        charIndex++;
        setTimeout(type, 100);
    } else {
        setTimeout(erase, 1000);
    }
}

function erase() {
    if (charIndex > 0) {
        typingElement.innerHTML = roles[index].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, 50);
    } else {
        index = (index + 1) % roles.length;
        setTimeout(type, 200);
    }
}

document.addEventListener("DOMContentLoaded", type);

//  IMPORTANT: Replace with your Render backend URL
const API_URL = "https://project-repo-x3if.onrender.com/contact";

// Contact form
document.getElementById("contactForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    // Basic validation
    if (!name || !email || !message) {
        alert("Please fill all fields");
        return;
    }

    const data = { name, email, message };

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (result.success) {
            alert(" Message sent successfully!");
            document.getElementById("contactForm").reset();
        } else {
            alert(" Failed: " + result.message);
        }

    } catch (error) {
        console.error("Error:", error);
        alert(" Server error. Try again later.");
    }
});