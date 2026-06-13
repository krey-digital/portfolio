"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";
import WhatsappCta from "./WhatsappCta";
import { QuoteCartProvider } from "@/lib/quoteCart";
import CookieConsent from "react-cookie-consent";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdmin = pathname.includes("/admin");
  const isBuyer = pathname.includes("/buyer");

  return (
    <QuoteCartProvider>
      <>
        {!isAdmin && !isBuyer && <Navbar />}
        <main className="flex-1">{children}</main>
        {!isAdmin && !isBuyer && <Footer />}
        {!isAdmin && !isBuyer && <WhatsappCta />}
        
        {/* Cookie Consent Banner */}
        <CookieConsent
          location="bottom"
          buttonText="Accept"
          declineButtonText="Decline"
          cookieName="chemcorp_consent"
          expires={365}
          onAccept={() => {
            console.log("Analytics enabled");
          }}
        >
          We use cookies to improve your experience. By continuing, you consent to our use of cookies.
        </CookieConsent>
      </>
    </QuoteCartProvider>
  );
}
