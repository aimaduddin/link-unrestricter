'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { getTorrents } from '@/lib/api'

interface Torrent {
  id: string;
  filename: string;
  status: string;
  progress: number;
  links: string[];
  added: string;
}

export function TorrentList() {
  const [torrents, setTorrents] = useState<Torrent[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    fetchTorrents()
  }, [page])

  async function fetchTorrents() {
    setLoading(true)
    try {
      const data = await getTorrents(page)
      setTorrents(data)
      // Assuming the API returns the total count in the response headers
      // You might need to adjust this based on the actual API response
      setTotalPages(Math.ceil(parseInt(data.headers['x-total-count'] || '0') / 10))
    } catch (error) {
      console.error('Error fetching torrents:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Torrent List</CardTitle>
      </CardHeader>
      <CardContent>
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
                <TableCell>{torrent.filename}</TableCell>
                <TableCell>{torrent.status}</TableCell>
                <TableCell>{torrent.progress}%</TableCell>
                <TableCell>{new Date(torrent.added).toLocaleString()}</TableCell>
                <TableCell>
                  {torrent.links && torrent.links.map((link, index) => (
                    <Button key={index} variant="link" asChild className="mr-2">
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
        <div className="flex justify-between mt-4">
          <Button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>
            Previous
          </Button>
          <span>Page {page} of {totalPages}</span>
          <Button onClick={() => setPage(p => p + 1)} disabled={page === totalPages}>
            Next
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
