import Link from 'next/link'
import { Button } from './ui/button'

export function NavBar() {
  return (
    <header className="bg-background sticky top-0 z-40 w-full border-b">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <div className="flex gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <span className="inline-block font-bold">RealDebrid</span>
          </Link>
          <nav className="flex gap-6">
            <Link href="/torrents">
              <Button variant="ghost">Torrents</Button>
            </Link>
            <Link href="/downloads">
              <Button variant="ghost">Downloads</Button>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}

