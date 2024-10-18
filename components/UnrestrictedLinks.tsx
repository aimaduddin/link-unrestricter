import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Link, ExternalLink, Copy, Check, File, Music } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface UnrestrictedLink {
  url: string;
  fileName: string;
  quality: string;
  mimeType: string;
}

interface UnrestrictedLinksProps {
  links: UnrestrictedLink[];
}

export default function UnrestrictedLinks({ links }: UnrestrictedLinksProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

  if (links.length === 0) return null

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  return (
    <Card className="w-full max-w-2xl mx-auto mt-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl font-bold">
          <Link className="h-6 w-6" />
          Unrestricted Links
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] w-full rounded-md border p-4">
          {links.map((link, index) => (
            <div key={index} className="flex items-center justify-between py-3 group border-b last:border-b-0">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                {link.mimeType.startsWith('audio') ? (
                  <Music className="h-5 w-5 flex-shrink-0 text-muted-foreground" />
                ) : (
                  <File className="h-5 w-5 flex-shrink-0 text-muted-foreground" />
                )}
                <div className="flex flex-col min-w-0">
                  <span className="text-sm font-medium truncate">{link.fileName}</span>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs">
                      {link.quality}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {link.mimeType}
                    </Badge>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 ml-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => copyToClipboard(link.url, index)}
                  className="flex-shrink-0"
                >
                  {copiedIndex === index ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary/80"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
