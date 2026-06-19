import { useEffect } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { FloatingActions } from "./FloatingActions";
import { getThemeColors } from "../../styles/themes";

export function CookiePolicyPage() {
  const c = getThemeColors();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Cookie Policy | Amaan India";
  }, []);

  return (
    <div style={{ background: c.sectionLight, minHeight: "100vh" }}>
      <Navbar />

      {/* Hero Section */}
      <div 
        className="pt-32 pb-16 md:pt-40 md:pb-24 text-center px-6"
        style={{ background: c.sectionDark, borderBottom: `1px solid ${c.borderSubtle}` }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span 
              style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.72rem", letterSpacing: "0.15em", color: c.accent }}
              className="uppercase font-semibold"
            >
              Legal & Privacy
            </span>
          </div>
          <h1 
            style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 500, color: c.textPrimary }}
            className="text-4xl md:text-5xl uppercase tracking-wider"
          >
            Cookie Policy
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-16 md:py-24">
        <div 
          className="p-8 md:p-12 shadow-sm rounded-sm"
          style={{ background: c.cardBg, border: `1px solid ${c.borderSubtle}` }}
        >
          <div className="space-y-8" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: "0.95rem", lineHeight: 1.8, color: c.textSecondary }}>
            
            <p>
              This Cookie Policy sets out the basis on which <strong>Amaan India</strong>, which term includes all subsidiaries and affiliated entities ("Company", "we", "us", or "Amaan"), use cookies and similar tracking technologies on or in relation to our websites.
            </p>

            <section className="space-y-4">
              <h2 
                style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 600, fontSize: "1.25rem", color: c.textPrimary }}
                className="pt-4"
              >
                1. What are Cookies and Other Tracking Technologies?
              </h2>
              <p>
                <strong>Cookies:</strong> Cookies are small text files that a website may place on your computer or mobile device when you visit a site or page. The cookie helps the website, or another website, to recognize your device the next time you visit. 
              </p>
              <p>
                We use the term cookies in this policy to refer to all files that collect information in this way. There are many functions cookies serve. For example, they can help us to remember your username and preferences, analyze how well our website is performing, or even allow us to recommend content we believe will be most relevant to you.
              </p>
            </section>

            <section className="space-y-4">
              <h2 
                style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 600, fontSize: "1.25rem", color: c.textPrimary }}
                className="pt-4"
              >
                2. Types of Cookies We Use
              </h2>
              <p>
                Generally, our cookies perform up to four different functions:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Essential Cookies:</strong> Some cookies are essential for the operation of our website. For example, some cookies allow us to identify subscribers and ensure they can access subscription-only pages. If a subscriber opts to disable these cookies, the user will not be able to access all of the content that a subscription entitles them to.
                </li>
                <li>
                  <strong>Performance & Analytical Cookies:</strong> We utilize other cookies to analyze how our visitors use our websites and to monitor website performance. This allows us to provide a high-quality experience by customizing our offering and quickly identifying and fixing any issues that arise. For example, we might use performance cookies to keep track of which pages are most popular and which method of linking between pages is most effective.
                </li>
                <li>
                  <strong>Functionality Cookies:</strong> We use functionality cookies to allow us to remember your preferences. For example, cookies save you the trouble of typing in your username every time you access the site, and recall your customization preferences.
                </li>
                <li>
                  <strong>Targeting & Remarketing Cookies:</strong> We and our third-party advertising partners use cookies to serve you with advertisements that we believe are relevant to you and your interests. These cookies track your browsing habits across different websites and enable remarketing campaigns so we can tailor promotional messages to you on platforms like Google, Meta, and others.
                </li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 
                style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 600, fontSize: "1.25rem", color: c.textPrimary }}
                className="pt-4"
              >
                3. How to Manage or Block Cookies
              </h2>
              <p>
                If you do not want to accept cookies, you can change your browser settings so that cookies are not accepted. If you do this, please be aware that you may lose some of the functionality of this website.
              </p>
              <p>
                To opt out of being tracked by Google Analytics across all websites, you can visit the Google Analytics Opt-out Browser Add-on. For remarketing preferences, you can adjust settings directly on third-party platforms (such as Facebook Ad Preferences or Google Ad Settings).
              </p>
            </section>

            <section className="space-y-4">
              <h2 
                style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 600, fontSize: "1.25rem", color: c.textPrimary }}
                className="pt-4"
              >
                4. Updates to this Policy
              </h2>
              <p>
                We may update this Cookie Policy from time to time in order to reflect changes to the cookies we use or for other operational, legal, or regulatory reasons. Please therefore re-visit this Cookie Policy regularly to stay informed about our use of cookies and related technologies.
              </p>
            </section>

            <section className="space-y-4">
              <h2 
                style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 600, fontSize: "1.25rem", color: c.textPrimary }}
                className="pt-4"
              >
                5. Contact Us
              </h2>
              <p>
                If you have any questions about our use of cookies or other tracking technologies, please email us at <a href="mailto:connect@amaanindia.com" className="underline" style={{ color: c.accent }}>connect@amaanindia.com</a> or call us at <a href="tel:+919000090000" className="underline" style={{ color: c.accent }}>+91 9000090000</a>.
              </p>
            </section>

          </div>
        </div>
      </div>

      <Footer />
      <FloatingActions />
    </div>
  );
}
