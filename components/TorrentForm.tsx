import { useState } from 'react'
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Card, CardContent } from "./ui/card"
import { addTorrent } from '@/lib/api'

export function TorrentForm() {
  const [magnetLink, setMagnetLink] = useState('')
  const [torrentFile, setTorrentFile] = useState<File | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      if (magnetLink) {
        await addTorrent(magnetLink)
      } else if (torrentFile) {
        await addTorrent(torrentFile)
      }
      setMagnetLink('')
      setTorrentFile(null)
    } catch (error) {
      console.error('Error adding torrent:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setTorrentFile(e.target.files[0])
    }
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="magnetLink">Magnet Link</Label>
              <Input 
                id="magnetLink" 
                placeholder="magnet:?xt=urn:btih:..." 
                value={magnetLink}
                onChange={(e) => setMagnetLink(e.target.value)}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="torrentFile">Or Upload .torrent File</Label>
              <Input 
                id="torrentFile" 
                type="file" 
                accept=".torrent"
                onChange={handleFileChange}
              />
            </div>
          </div>
          <Button className="w-full mt-4" type="submit" disabled={isLoading}>
            {isLoading ? 'Adding Torrent...' : 'Add Torrent'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

