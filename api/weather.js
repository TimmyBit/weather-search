export default async function handler(req, res) {
    const city = req.query.city; // comes from frontend
    const apiKey = process.env.OWM_KEY; // stored securely

    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );
        const data = await response.json();
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching weather' });
    }
}
