// Vercel Serverless Function — /api/analyze
// Hält den ANTHROPIC_API_KEY serverseitig geheim und reicht die Analyse-Anfrage
// vom Browser an die Anthropic API weiter. Wird automatisch von Vercel als
// Function erkannt, sobald diese Datei im /api-Ordner liegt — kein Framework
// und keine zusätzliche Konfiguration nötig.

// Vercel Serverless Function — /api/analyze
// Hält den ANTHROPIC_API_KEY serverseitig geheim und reicht die Analyse-Anfrage
// vom Browser an die Anthropic API weiter. Wird automatisch von Vercel als
// Function erkannt, sobald diese Datei im /api-Ordner liegt — kein Framework
// und keine zusätzliche Konfiguration nötig.

// Sehr einfaches In-Memory Rate-Limiting pro IP. Das schützt nur begrenzt
// (jede Serverless-Instanz hat ihren eigenen Speicher und setzt bei Kaltstart
// zurück), reicht aber als erste Bremse gegen versehentlichen Missbrauch,
// bevor eine echte Lösung (z. B. Upstash Redis / Vercel KV) angebunden wird.
const requestLog = new Map();
const RATE_LIMIT = 15; // Anfragen
const RATE_WINDOW_MS = 10 * 60 * 1000; // pro 10 Minuten

const ALLOWED_MEDIA_TYPES = new Set([
  'image/jpeg', 'image/png', 'image/webp', 'image/gif', 'application/pdf'
]);
const MAX_BASE64_CHARS = 14 * 1024 * 1024; // ~10 MB Datei als Base64

function isRateLimited(ip) {
  const now = Date.now();
  const entry = requestLog.get(ip) || [];
  const recent = entry.filter(ts => now - ts < RATE_WINDOW_MS);
  recent.push(now);
  requestLog.set(ip, recent);
  return recent.length > RATE_LIMIT;
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const ip = (req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'unknown').split(',')[0].trim();
  if (isRateLimited(ip)) {
    return res.status(429).json({ error: 'Zu viele Anfragen. Bitte versuch es in ein paar Minuten erneut.' });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(500).json({
      error: 'ANTHROPIC_API_KEY ist nicht gesetzt. In den Vercel-Projekteinstellungen unter "Environment Variables" hinterlegen und neu deployen.'
    });
  }

  const { contentBlock, promptText } = req.body || {};
  if (!contentBlock || !promptText || typeof promptText !== 'string') {
    return res.status(400).json({ error: 'contentBlock und promptText sind erforderlich.' });
  }

  const source = contentBlock.source;
  if (
    !source ||
    !ALLOWED_MEDIA_TYPES.has(source.media_type) ||
    typeof source.data !== 'string' ||
    source.data.length > MAX_BASE64_CHARS
  ) {
    return res.status(400).json({ error: 'Ungültiges oder zu großes Dokument.' });
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-5',
        max_tokens: 1000,
        messages: [
          { role: 'user', content: [contentBlock, { type: 'text', text: promptText }] }
        ]
      })
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        error: data?.error?.message || 'Fehler bei der Anthropic API.'
      });
    }

    return res.status(200).json(data);
  } catch (err) {
    console.error('DEASY /api/analyze error:', err);
    return res.status(500).json({ error: 'Unerwarteter Serverfehler bei der Analyse.' });
  }
}
