import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'OpporSphere | Global Opportunities, Scholarships, Fellowships & Grants',
  description:
    'Discover curated global opportunities: fully funded scholarships, high-impact fellowships, pilot grants, student internships, hackathons, and tech jobs worldwide.',
  keywords: [
    'opportunities',
    'scholarships',
    'fellowships',
    'grants',
    'internships',
    'hackathons',
    'GSoC',
    'Thiel Fellowship',
    'Rhodes Scholarship',
    'tech jobs',
    'funding'
  ],
  authors: [{ name: 'OpporSphere Global' }],
  openGraph: {
    title: 'OpporSphere | Global Opportunities Hub',
    description:
      'Connecting ambitious builders, researchers, and students with world-class funding, fellowships, and careers.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased dark">
      <body className="min-h-full flex flex-col bg-slate-950 text-slate-100 font-sans selection:bg-violet-600 selection:text-white">
        {children}
      </body>
    </html>
  );
}
