const form = document.getElementById("contactForm");
const msg = document.getElementById("msg");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    try {
        const response = await fetch("https://project-repo-x3if.onrender.com/submit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, email, message })
        });

        const result = await response.text();

        msg.style.color = "lightgreen";
        msg.textContent = result;

        form.reset();

    } catch (error) {
        msg.style.color = "red";
        msg.textContent = "Failed to send message!";
        console.error(error);
    }
});