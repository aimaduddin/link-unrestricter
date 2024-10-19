'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UnrestrictForm } from "@/components/UnrestrictForm"
import { TorrentForm } from "@/components/TorrentForm"

export default function Home() {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Link Unrestricter</h1>
      <Tabs defaultValue="direct" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="direct">Direct Link</TabsTrigger>
          <TabsTrigger value="torrent">Torrent</TabsTrigger>
        </TabsList>
        <TabsContent value="direct">
          <UnrestrictForm />
        </TabsContent>
        <TabsContent value="torrent">
          <TorrentForm />
        </TabsContent>
      </Tabs>
    </div>
  )
}
