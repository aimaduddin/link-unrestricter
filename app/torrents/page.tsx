'use client';

import { TorrentList } from '@/components/TorrentList'

export default function TorrentsPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Torrents</h1>
      <TorrentList />
    </div>
  )
}
