import './globals.css'

export const metadata = {
  title: 'Gestion Centrale UCL',
  description: 'Student organization management system for UCL',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-sans">
        {children}
      </body>
    </html>
  )
}