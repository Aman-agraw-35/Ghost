import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = process.env.CLOUDFLARE_API_TOKEN;

  if (!token) {
    return res.status(500).json({ error: 'Missing API token' });
  }

  try {
    // Build the query parameters
    const params = new URLSearchParams({
      metric: 'latency',    // singular
      limit: "10", // number of series groups
      dateRange: '4d',      // last 7 days
    });

    const url = `https://api.cloudflare.com/client/v4/radar/quality/iqi/timeseries_groups?${params}`;

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Handle Cloudflare errors
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Cloudflare API Error:', errorData);
      return res
        .status(response.status)
        .json({ error: errorData.errors || 'Unknown API error' });
    }

    // Success: parse and return the JSON
    const data = await response.json();
    return res.status(200).json(data.result);
  } catch (err) {
    console.error('Internal Server Error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
