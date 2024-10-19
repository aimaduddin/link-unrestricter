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

export interface DownloadItem {
  id: string;
  filename: string;
  mimeType: string;
  filesize: number;
  link: string;
  host: string;
  chunks: number;
  download: string;
  generated: string;
}

export async function getDownloadHistory(page: number, limit: number = 10) {
  const apiKey = process.env.NEXT_PUBLIC_REAL_DEBRID_API_KEY;
  const endpoint = 'https://api.real-debrid.com/rest/1.0/downloads';

  try {
    const response = await axios.get(endpoint, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
      params: {
        page,
        limit,
      },
    });

    return {
      downloads: response.data,
      totalCount: parseInt(response.headers['x-total-count'] || '0', 10),
    };
  } catch (error) {
    console.error('Error fetching download history:', error);
    throw error;
  }
}

export async function addTorrent(torrentData: string | File) {
  const apiKey = process.env.NEXT_PUBLIC_REAL_DEBRID_API_KEY;
  const endpoint = 'https://api.real-debrid.com/rest/1.0/torrents/addMagnet';

  try {
    let formData = new FormData();
    if (typeof torrentData === 'string') {
      formData.append('magnet', torrentData);
    } else {
      formData.append('torrent', torrentData);
    }

    const response = await axios.post(endpoint, formData, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error adding torrent:', error);
    throw error;
  }
}

export async function getTorrents(page: number, limit: number = 10) {
  const apiKey = process.env.NEXT_PUBLIC_REAL_DEBRID_API_KEY;
  const endpoint = 'https://api.real-debrid.com/rest/1.0/torrents';

  try {
    const response = await axios.get(endpoint, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
      params: {
        page,
        limit,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching torrents:', error);
    throw error;
  }
}
