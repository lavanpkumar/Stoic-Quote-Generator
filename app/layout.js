import "@styles/global.css"

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body className="dark">
        <div className="main-container">
          {children}
        </div>
      </body>
    </html>
  )
}
