'use client';

import { useState } from 'react';
import { unrestrict } from '@/lib/api';
import LinkForm from '@/components/LinkForm';
import UnrestrictedLinks from '@/components/UnrestrictedLinks';
import ErrorMessage from '@/components/ErrorMessage';

export default function Home() {
  const [unrestrictedLinks, setUnrestrictedLinks] = useState<string[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (link: string) => {
    setError('');
    setUnrestrictedLinks([]);
    setLoading(true);

    try {
      const response = await unrestrict(link.trim());
      if (response.download) {
        setUnrestrictedLinks([response.download, ...response.alternative.map((alt: any) => alt.download)]);
      } else {
        setError('Unexpected response format. Please try again.');
      }
    } catch (error) {
      console.error('Error unrestricting link:', error);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">Real-Debrid Clone</h1>
      <LinkForm onSubmit={handleSubmit} loading={loading} />
      <ErrorMessage message={error} />
      <UnrestrictedLinks links={unrestrictedLinks} />
    </main>
  );
}
