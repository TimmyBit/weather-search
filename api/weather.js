export default async function handler(req, res) {
    const city = req.query.city;
    const apiKey = process.env.OWM_KEY;

    // Allow your frontend origin (replace with your actual frontend URL)
    res.setHeader(
        'Access-Control-Allow-Origin',
        'https://weather-search-git-main-igor-timushkovs-projects.vercel.app'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

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
