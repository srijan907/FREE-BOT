import axios from "axios";

export default async function handler(req, res) {
  try {
    const { number } = req.query;
    if (!number)
      return res.status(400).json({ status: "error", message: "❌ Number missing" });

    const apiUrl = process.env.MAIN_API_URL;
    const botName = process.env.BOT_NAME || "R4BBIT-MINI";

    // Forward request to the real API
    const { data } = await axios.get(`${apiUrl}?code=${number}`);

    return res.status(200).json({
      status: data.status || "success",
      bot: botName,
      number: data.number || number,
      code: data.code || "N/A",
      message: data.message || "✅ Code generated successfully",
    });
  } catch (err) {
    console.error("Error fetching pairing code:", err.message);
    return res.status(500).json({
      status: "error",
      message: "❌ Failed to get pairing code",
    });
  }
}
