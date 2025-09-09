export default async function handler(req, res) {
    // --- CORS setup ---
    const allowedOrigins = [
        'https://weather-search-gules.vercel.app',
        'https://weather-search-git-main-igor-timushkovs-projects.vercel.app'
    ];
    const origin = req.headers.origin;

    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    // --- Get city and API key ---
    const city = req.query.city;
    const apiKey = process.env.OWM_KEY;

    if (!city) {
        res.status(400).json({ error: 'City is required' });
        return;
    }

    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );

        if (!response.ok) {
            res.status(response.status).json({ error: 'City not found' });
            return;
        }

        const data = await response.json();
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching weather' });
    }
}
