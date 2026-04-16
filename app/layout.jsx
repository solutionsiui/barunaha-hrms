import "./globals.css";
import { AuthProvider } from "@/lib/auth-context";
import { ThemeProvider } from "@/lib/theme-context";
import appIcon from "@/lib/app icon.png";

export const metadata = {
  title: "Barunaha Entertainment — HRMS & Payroll",
  description: "Enterprise Human Resource Management System with attendance, payroll, leave management, and more.",
  icons: {
    icon: appIcon.src,
    shortcut: appIcon.src,
    apple: appIcon.src,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <AuthProvider>{children}</AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
