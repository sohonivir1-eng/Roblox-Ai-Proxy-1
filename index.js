import express from "express";
import fetch from "node-fetch";
const app = express();
app.use(express.json());

app.post("/ask", async (req, res) => {
  const userMessage = req.body.message || "Hello";
  const openaiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.OPENAI_KEY}`
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: userMessage }]
    })
  });
  const data = await openaiResponse.json();
  res.json({ reply: data.choices?.[0]?.message?.content || "I’m not sure how to respond." });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
