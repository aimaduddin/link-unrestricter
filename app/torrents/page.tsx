'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { getTorrents } from '@/lib/api';

interface Torrent {
  id: string;
  filename: string;
  hash: string;
  bytes: number;
  host: string;
  split: number;
  progress: number;
  status: string;
  added: string;
  links: string[];
  ended?: string;
  speed?: number;
  seeders?: number;
}

const ITEMS_PER_PAGE = 10;

export default function TorrentsPage() {
  const [torrents, setTorrents] = useState<Torrent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    fetchTorrents();
  }, [page]);

  async function fetchTorrents() {
    try {
      setLoading(true);
      const data = await getTorrents(page, ITEMS_PER_PAGE);
      setTorrents(data.torrents);
      setTotalCount(data.totalCount);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching torrents:', err);
      setError('Failed to fetch torrents');
      setLoading(false);
    }
  }

  function handlePrevPage() {
    setPage((prevPage) => Math.max(1, prevPage - 1));
  }

  function handleNextPage() {
    setPage((prevPage) => prevPage + 1);
  }

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardHeader>
        <CardTitle className="text-3xl font-bold">Torrents List</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-2">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="w-full h-12" />
            ))}
          </div>
        ) : error ? (
          <div className="text-red-500">Error: {error}</div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Filename</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead>Added</TableHead>
                <TableHead>Links</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {torrents.map((torrent) => (
                <TableRow key={torrent.id}>
                  <TableCell className="font-medium">{torrent.filename}</TableCell>
                  <TableCell>{torrent.status}</TableCell>
                  <TableCell>{torrent.progress}%</TableCell>
                  <TableCell>{new Date(torrent.added).toLocaleString()}</TableCell>
                  <TableCell>
                    {torrent.links.map((link, index) => (
                      <Button key={index} variant="link" className="p-0 h-auto" asChild>
                        <a href={link} target="_blank" rel="noopener noreferrer">
                          Link {index + 1}
                        </a>
                      </Button>
                    ))}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
      <div className="flex justify-between items-center p-4">
        <Button onClick={handlePrevPage} disabled={page === 1}>
          Previous
        </Button>
        <span>
          Page {page} of {Math.ceil(totalCount / ITEMS_PER_PAGE)}
        </span>
        <Button onClick={handleNextPage} disabled={page * ITEMS_PER_PAGE >= totalCount}>
          Next
        </Button>
      </div>
    </Card>
  );
}
