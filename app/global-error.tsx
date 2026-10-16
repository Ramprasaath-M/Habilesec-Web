"use client";
/* eslint-disable @next/next/no-html-link-for-pages -- Hard navigation recovers from a failed root layout. */
export default function GlobalError({ retry }: { retry: () => void }) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          background: "#fff",
          color: "#17212b",
          fontFamily: '"Segoe UI", Arial, sans-serif',
        }}
      >
        <style>{`a:focus-visible,button:focus-visible{outline:2px solid #2874a6;outline-offset:5px}`}</style>
        <main style={{ maxWidth: 800, margin: "0 auto", padding: "80px 24px" }}>
          <p style={{ color: "#123b63", fontSize: 16 }}>HabileSec</p>
          <h1
            style={{
              fontSize: "clamp(32px,5vw,48px)",
              fontWeight: 500,
              lineHeight: 1.2,
            }}
          >
            We couldn&apos;t load this page.
          </h1>
          <p style={{ color: "#52606d", lineHeight: 1.7 }}>
            Please try again, or return to the homepage.
          </p>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 24,
              marginTop: 32,
              alignItems: "center",
            }}
          >
            <button
              type="button"
              onClick={() => retry()}
              style={{
                padding: "12px 20px",
                minHeight: 48,
                border: "1px solid #123b63",
                background: "#123b63",
                color: "white",
                fontSize: 16,
                cursor: "pointer",
              }}
            >
              Try again
            </button>
            <a href="/" style={{ color: "#123b63", padding: "12px 0" }}>
              Return to home
            </a>
          </div>
        </main>
      </body>
    </html>
  );
}
