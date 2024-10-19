'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UnrestrictedLinks from '@/components/UnrestrictedLinks';
import { unrestrict, addTorrent } from '@/lib/api';

interface UnrestrictedLink {
  url: string;
  fileName: string;
  quality: string;
  mimeType: string;
}

export default function Home() {
  const [directLink, setDirectLink] = useState('');
  const [magnetLink, setMagnetLink] = useState('');
  const [torrentFile, setTorrentFile] = useState<File | null>(null);
  const [unrestrictedLinks, setUnrestrictedLinks] = useState<UnrestrictedLink[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleDirectLinkSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const data = await unrestrict(directLink);
      const links: UnrestrictedLink[] = [
        {
          url: data.download,
          fileName: data.filename,
          quality: data.quality || 'Main',
          mimeType: data.mimeType
        },
        ...(data.alternative || []).map((alt: any) => ({
          url: alt.download,
          fileName: alt.filename,
          quality: alt.quality || 'Alternative',
          mimeType: alt.mimeType
        }))
      ];
      setUnrestrictedLinks(links);
      setDirectLink('');
    } catch (error) {
      setError('An error occurred while unrestricting the link');
    } finally {
      setIsLoading(false);
    }
  };

  const handleTorrentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      let result;
      if (magnetLink) {
        result = await addTorrent(magnetLink);
      } else if (torrentFile) {
        result = await addTorrent(torrentFile);
      } else {
        throw new Error('No magnet link or torrent file provided');
      }
      // Handle the result as needed
      console.log(result);
      setMagnetLink('');
      setTorrentFile(null);
    } catch (error) {
      setError('An error occurred while adding the torrent');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setTorrentFile(e.target.files[0]);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col items-center">
      <Card className="w-full max-w-md mb-8">
        <CardHeader>
          <CardTitle>Link Unrestricter</CardTitle>
          <CardDescription>Unrestrict direct links or add torrents</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="direct" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="direct">Direct Link</TabsTrigger>
              <TabsTrigger value="torrent">Torrent</TabsTrigger>
            </TabsList>
            <TabsContent value="direct">
              <form onSubmit={handleDirectLinkSubmit}>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="directLink">Direct Link</Label>
                    <Input 
                      id="directLink" 
                      placeholder="https://restricted.example.com/file" 
                      value={directLink}
                      onChange={(e) => setDirectLink(e.target.value)}
                    />
                  </div>
                </div>
                <Button className="w-full mt-4" type="submit" disabled={isLoading}>
                  {isLoading ? 'Unrestricting...' : 'Unrestrict Link'}
                </Button>
              </form>
            </TabsContent>
            <TabsContent value="torrent">
              <form onSubmit={handleTorrentSubmit}>
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
            </TabsContent>
          </Tabs>
        </CardContent>
        {error && (
          <Alert variant="destructive" className="mt-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </Card>
      <UnrestrictedLinks links={unrestrictedLinks} />
    </div>
  );
}
