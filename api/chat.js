export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { message } = req.body;

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.CLAUDE_API_KEY,
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify({
        model: "claude-3-haiku-20240307",
        max_tokens: 200,
        messages: [
          {
            role: "user",
            content: `Respond like a Punjabi hustler mentor:\n${message}`
          }
        ]
      })
    });

    const data = await response.json();

    res.status(200).json({
      reply: data.content[0].text
    });

  } catch (err) {
    res.status(500).json({
      reply: "AI error"
    });
  }
}
