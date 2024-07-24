const axios = require("axios");

class ChatController {
  static async chat(req, res, next) {
    console.log("Received request:", req.body);
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",  // You can switch to "gpt-4" if needed
          messages: [{ role: "user", content: message }],
          max_tokens: 150,
          n: 1,
          stop: null,
          temperature: 0.9,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      const reply = response.data.choices[0].message.content.trim();
      res.json({ reply });
    } catch (error) {
      console.error("Error while calling OpenAI API:", error.response ? error.response.data : error.message);
      next(error);
    }
  }
}

module.exports = ChatController;
