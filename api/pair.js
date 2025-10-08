export default async function handler(req, res) {
  const { code } = req.query;

  if (!code || !/^[0-9]{11,15}$/.test(code)) {
    return res.status(400).json({
      bot: "R4BBIT-MINI",
      status: "error",
      message: "Invalid or missing number"
    });
  }

  const mainApi = process.env.MAIN_API || "http://mainline.proxy.rlwy.net:55620/pair?code=";

  try {
    const response = await fetch(`${mainApi}${code}`);
    const data = await response.json();

    return res.status(200).json({
      bot: "R4BBIT-MINI",
      number: data.number || code,
      code: data.code || "UNKNOWN",
      status: data.status || "failed"
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      bot: "R4BBIT-MINI",
      status: "error",
      message: "Failed to connect to main API"
    });
  }
}
