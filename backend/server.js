const http = require("http");

const PORT = process.env.PORT || 3000;

// 🔥 Replace this with your GitHub Pages URL
const FRONTEND_URL = "https://your-username.github.io";

const server = http.createServer((req, res) => {

    // ✅ CORS (only allow your frontend)
    res.setHeader("Access-Control-Allow-Origin", FRONTEND_URL);
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    // ✅ Handle preflight request
    if (req.method === "OPTIONS") {
        res.writeHead(200);
        return res.end();
    }

    // ✅ Contact form API
    if (req.url === "/contact" && req.method === "POST") {
        let body = "";

        req.on("data", chunk => {
            body += chunk.toString();
        });

        req.on("end", () => {
            try {
                const data = JSON.parse(body);

                // 🔥 LOGS → visible in Render logs
                console.log("📩 New Message Received:");
                console.log("Name:", data.name);
                console.log("Email:", data.email);
                console.log("Message:", data.message);
                console.log("-------------------------");

                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(JSON.stringify({
                    success: true,
                    message: "Message sent successfully!"
                }));

            } catch (err) {
                res.writeHead(400, { "Content-Type": "application/json" });
                res.end(JSON.stringify({
                    success: false,
                    message: "Invalid data"
                }));
            }
        });
    }

    // ✅ Default route
    else {
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end("Backend is running 🚀");
    }
});

server.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});