'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import UnrestrictedLinks from '@/components/UnrestrictedLinks';
import { unrestrict } from '@/lib/api';

interface UnrestrictedLink {
  url: string;
  fileName: string;
  quality: string;
  mimeType: string;
}

export default function Home() {
  const [inputLink, setInputLink] = useState('');
  const [unrestrictedLinks, setUnrestrictedLinks] = useState<UnrestrictedLink[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const data = await unrestrict(inputLink);
      const links: UnrestrictedLink[] = [
        {
          url: data.download,
          fileName: data.filename,
          quality: data.quality || 'Main',
          mimeType: data.mimeType
        },
        ...data.alternative.map((alt: any) => ({
          url: alt.download,
          fileName: alt.filename,
          quality: alt.quality || 'Alternative',
          mimeType: alt.mimeType
        }))
      ];
      setUnrestrictedLinks(links);
      setInputLink('');
    } catch (error) {
      setError('An error occurred while unrestricting the link');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col items-center">
      <Card className="w-full max-w-md mb-8">
        <CardHeader>
          <CardTitle>Link Unrestricter</CardTitle>
          <CardDescription>Enter a restricted link to get an unrestricted version</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="link">Restricted Link</Label>
                <Input 
                  id="link" 
                  placeholder="https://restricted.example.com/file" 
                  value={inputLink}
                  onChange={(e) => setInputLink(e.target.value)}
                />
              </div>
            </div>
            <Button className="w-full mt-4" type="submit" disabled={isLoading}>
              {isLoading ? 'Unrestricting...' : 'Unrestrict Link'}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col items-start">
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </CardFooter>
      </Card>
      <UnrestrictedLinks links={unrestrictedLinks} />
    </div>
  );
}
