import { useState } from 'react'
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Card, CardContent } from "./ui/card"
import { unrestrict } from '@/lib/api'
import UnrestrictedLinks from './UnrestrictedLinks'

interface UnrestrictedLink {
  url: string;
  fileName: string;
  quality: string;
  mimeType: string;
}

export function UnrestrictForm() {
  const [directLink, setDirectLink] = useState('')
  const [unrestrictedLinks, setUnrestrictedLinks] = useState<UnrestrictedLink[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const data = await unrestrict(directLink)
      setUnrestrictedLinks(data)
      setDirectLink('')
    } catch (error) {
      console.error('Error unrestricting link:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit}>
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
        <UnrestrictedLinks links={unrestrictedLinks} />
      </CardContent>
    </Card>
  )
}
