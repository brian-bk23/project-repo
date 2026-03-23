const express = require("express");
const cors = require("cors");
const fs = require("fs"); 
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());


app.post("/submit", (req, res) => {
    const { name, email, message } = req.body;

    
    console.log("Received:");
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Message:", message);

    
    const msg = `${new Date().toISOString()} | ${name} | ${email} | ${message}\n`;

    
    const filePath = path.join(__dirname, "messages.txt");
    fs.appendFile(filePath, msg, (err) => {
        if (err) {
            console.error("Error saving message:", err);
            return res.status(500).send("Error saving message");
        }
        res.send("Message received successfully!");
    });
});


app.get("/health", (req, res) => {
    res.json({ status: "Backend is running!" });
});


app.get("/", (req, res) => {
    res.send("Backend is running!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});