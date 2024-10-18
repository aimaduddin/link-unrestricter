interface UnrestrictedLinksProps {
  links: string[];
}

export default function UnrestrictedLinks({ links }: UnrestrictedLinksProps) {
  if (links.length === 0) return null;

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-2">Unrestricted Links:</h2>
      <ul>
        {links.map((link, index) => (
          <li key={index} className="mb-2">
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              {link}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

