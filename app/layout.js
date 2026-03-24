export const metadata = {
    title: "Lokia Telegram Bot",
    description: "Telegram bot for Lokia Sales",
};

export default function RootLayout({ children }) {
    return (
          <html lang="fr">
            <body>{children}</body>
      </html>
    );
}
