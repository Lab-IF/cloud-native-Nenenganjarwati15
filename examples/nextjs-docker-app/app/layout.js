import "./globals.css";

export const metadata = {
  title: "Next.js Docker App",
  description: "Contoh implementasi Next.js yang siap dikemas dengan Docker"
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
