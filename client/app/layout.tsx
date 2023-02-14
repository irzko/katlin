import "@/styles/globals.css";
import { ContextProvider } from "@/context/user/context";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body>
        <ContextProvider>{children}</ContextProvider>
      </body>
    </html>
  );
}
