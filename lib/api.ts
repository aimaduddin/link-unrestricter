import axios from 'axios';

export async function unrestrict(link: string) {
  const apiKey = process.env.NEXT_PUBLIC_REAL_DEBRID_API_KEY;
  const endpoint = 'https://api.real-debrid.com/rest/1.0/unrestrict/link';

  const params = new URLSearchParams();
  params.append('link', link);

  const response = await axios.post(endpoint, params, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
  return response.data;
}

