import localFont from "next/font/local";

// One local variable font, shared with the independent root error fallback.
export const dmSans = localFont({
  src: "../public/fonts/dm-sans.woff2",
  display: "swap",
  variable: "--font-dm-sans",
  weight: "100 1000",
});
