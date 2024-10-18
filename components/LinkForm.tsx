import { useState } from 'react';

interface LinkFormProps {
  onSubmit: (link: string) => Promise<void>;
  loading: boolean;
}

export default function LinkForm({ onSubmit, loading }: LinkFormProps) {
  const [link, setLink] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(link);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md">
      <input
        type="text"
        value={link}
        onChange={(e) => setLink(e.target.value)}
        placeholder="Paste your link here"
        className="w-full p-2 mb-4 border rounded"
        required
      />
      <button
        type="submit"
        className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        disabled={loading}
      >
        {loading ? 'Processing...' : 'Unrestrict Link'}
      </button>
    </form>
  );
}

