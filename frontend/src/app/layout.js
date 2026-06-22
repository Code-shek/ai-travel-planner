import "./globals.css";

export const metadata = {
  title: "AI Travel Planner",
  description: "Plan your trip with AI",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-white antialiased">
        {children}
      </body>
    </html>
  );
}