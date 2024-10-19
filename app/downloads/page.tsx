'use client';

import { useState, useEffect } from 'react';
import { getDownloadHistory } from '@/lib/api';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

interface DownloadItem {
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

const ITEMS_PER_PAGE = 10;

export default function HistoryPage() {
  const [history, setHistory] = useState<DownloadItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    fetchHistory();
  }, [page]);

  async function fetchHistory() {
    try {
      setLoading(true);
      const data = await getDownloadHistory(page, ITEMS_PER_PAGE);
      setHistory(data.downloads);
      setTotalCount(data.totalCount);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching download history:', err);
      setError('Failed to fetch download history');
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
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-3xl font-bold">Download History</CardTitle>
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
                <TableHead>Type</TableHead>
                <TableHead>Generated</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {history.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.filename}</TableCell>
                  <TableCell>{item.mimeType}</TableCell>
                  <TableCell>{new Date(item.generated).toLocaleString()}</TableCell>
                  <TableCell>
                    <Button asChild variant="link">
                      <a href={item.download} target="_blank" rel="noopener noreferrer">
                        Download
                      </a>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <Button onClick={handlePrevPage} disabled={page === 1}>
          Previous
        </Button>
        <span>
          Page {page}
        </span>
        <Button onClick={handleNextPage}>
          Next
        </Button>
      </CardFooter>
    </Card>
  );
}
