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
              This Cookie Policy sets out the basis on which <strong>Amaan India</strong> which term includes all subsidiaries of Amaan India, ("Company", "we", "us", or "Amaan India") use cookies and similar technologies on or in relation to our websites.
            </p>

            <section className="space-y-4">
              <h2
                style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 600, fontSize: "1.25rem", color: c.textPrimary }}
                className="pt-4"
              >
                1. What are Cookies and Other Tracking Technologies?
              </h2>
              <div className="space-y-4">
                <p>
                  <strong>Cookies:</strong> Cookies are small text files which a website may put on your computer or mobile device when you visit a site or page. The other tracking technologies work similarly to cookies and place small data files on your devices or monitor your website activity to enable us to collect information about how you use our Sites. This allows our Sites to recognise your device from those of other users of the Sites. Amaan India may use this data to analyse trends and statistics, use cookie data for re-targeting activities, and to help us provide a better customer service.
                </p>
                <p>
                  <strong>Flash Cookies:</strong> Certain features of our Website may use local stored objects (or Flash cookies) to collect and store information about your preferences and navigation to, from and on our Website. Flash cookies are not managed by the same browser settings as are used for browser cookies.
                </p>
                <p>
                  <strong>Web Beacons:</strong> Pages of the Website and our emails may contain small electronic files known as web beacons (also referred to as clear gifs, pixel tags and single-pixel gifs) that permit us, for example, to count users who have visited those pages or opened an email and for other related website statistics (for example, recording the popularity of certain website content and verifying system and server integrity).
                </p>
              </div>
            </section>

            <section className="space-y-4">
              <h2
                style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 600, fontSize: "1.25rem", color: c.textPrimary }}
                className="pt-4"
              >
                2. What Information We Collect Using Cookies and Other Tracking Technologies?
              </h2>
              <p>
                We may collect information that does not directly reveal your specific identity or does not directly relate to you as an individual. We may automatically collect the following information when you use our service:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Your device, browsing actions and patterns collected automatically as you navigate through our websites.</li>
                <li>Usage details, time of requests, browser types, operating system, IP addresses and information collected through cookies, web beacons and other tracking technologies.</li>
                <li>Details of your visits to our Website, including traffic data, location data, logs and other communication data and the resources that you access and use on the Website.</li>
                <li>Information about your computer and internet connection, operating system and browser type.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2
                style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 600, fontSize: "1.25rem", color: c.textPrimary }}
                className="pt-4"
              >
                3. How Do Our Sites Use Cookies and Other Tracking Technologies?
              </h2>
              <p>
                Amaan India uses cookies and other tracking technologies across its websites to improve their performance and enhance your user experience. At times we may seek to place a cookie on your device (for instance, your computer’s browsers) which allows the server to recognise the device when it visits again, to track statistical information about navigation to and throughout certain areas of our website, and to display Amaan India promotions on other websites.
              </p>
              <p>
                The information that is tracked by such a cookie is used only for internal purposes, such as to improve website navigation and to measure the effectiveness of our promotional placements. For example, we keep track of the domains from which people visit and we also measure visitor activity on the website, but in a manner that would keep the information anonymous.
              </p>
            </section>

            <section className="space-y-4">
              <h2
                style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 600, fontSize: "1.25rem", color: c.textPrimary }}
                className="pt-4"
              >
                4. Do We Use Any Cookies From Third-Party Companies?
              </h2>
              <p>
                To administer our Sites and for research purposes, Amaan India also has contracted with third-party service providers to track and analyse statistical usage and volume information from our Site users. These third-party service providers use persistent Cookies to help us to improve the user experience, manage our Site content, and analyse how users navigate and utilize the Sites.
              </p>
            </section>

            <section className="space-y-4">
              <h2
                style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 600, fontSize: "1.25rem", color: c.textPrimary }}
                className="pt-4"
              >
                5. What Types of Cookies Are There, and Which Ones Are Used on the Site?
              </h2>
              <p>
                Please click <a href="https://amaanindia.com/cookie-details/" className="underline font-medium" style={{ color: c.accent }} target="_blank" rel="noopener noreferrer">here</a> for information about cookies on our website.
              </p>
              <p>
                We maintain the highest levels of confidentiality for this information. This anonymous information is used and analysed only at an aggregate level to help us understand trends and patterns. If you do not want your transaction details used in this manner, you can either disable your cookies by following the instructions set out in the “How to enable and disable cookies using your browser” section below. However, if you prefer not to accept cookies, you can set your browser to reject them or to alert you before one is placed.
              </p>
            </section>

            <section className="space-y-4">
              <h2
                style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 600, fontSize: "1.25rem", color: c.textPrimary }}
                className="pt-4"
              >
                6. How to Enable and Disable Cookies Using Your Browser
              </h2>
              <p>
                There are several different ways in which you can accept or reject some or all cookies. Some of the main methods of doing so are described below.
              </p>
              <p>
                You are welcome to block the use of some or all the cookies we use on our website. However, please be aware that doing so may impair our website and its functionality or may even render some or all of it unusable.
              </p>
              <p>
                You should also be aware that clearing all cookies from your browser will also delete any cookies that are storing your preferences, for example, whether you have accepted cookies on a website or any cookies that are blocking other cookies.
              </p>
              <p>
                The following links provide more information on cookie settings for commonly used browsers:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <a href="http://windows.microsoft.com/en-GB/internet-explorer/delete-manage-cookies#ie=ie-10" className="underline" style={{ color: c.accent }} target="_blank" rel="noopener noreferrer">Cookie settings in Internet Explorer</a>
                </li>
                <li>
                  <a href="http://support.mozilla.com/en-US/kb/Cookies" className="underline" style={{ color: c.accent }} target="_blank" rel="noopener noreferrer">Cookie settings in Firefox</a>
                </li>
                <li>
                  <a href="https://support.google.com/chrome/answer/95647?hl=en&ref_topic=14666" className="underline" style={{ color: c.accent }} target="_blank" rel="noopener noreferrer">Cookie settings in Chrome</a>
                </li>
                <li>
                  <a href="https://support.apple.com/kb/PH17191?locale=en_US" className="underline" style={{ color: c.accent }} target="_blank" rel="noopener noreferrer">Cookie settings in Safari web</a>
                </li>
                <li>
                  <a href="http://support.apple.com/kb/HT1677" className="underline" style={{ color: c.accent }} target="_blank" rel="noopener noreferrer">Cookie settings in iOS (Safari Mobile)</a>
                </li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2
                style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 600, fontSize: "1.25rem", color: c.textPrimary }}
                className="pt-4"
              >
                7. Updates on Policy
              </h2>
              <p>
                This policy may change from time to time. Your continued use of our platforms after we make changes is deemed to be acceptance of those changes, so please check the policy periodically for updates.
              </p>
            </section>

            <section className="space-y-4">
              <h2
                style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 600, fontSize: "1.25rem", color: c.textPrimary }}
                className="pt-4"
              >
                8. How Do You Contact Us?
              </h2>
              <p>
                In case of any queries related to this policy, you can contact our Data Privacy Office in one of the following ways:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  Email us at <a href="mailto:customer.privacy@amaanindia.com" className="underline font-medium" style={{ color: c.accent }}>customer.privacy@amaanindia.com</a>
                </li>
                <li>
                  Call us at <a href="tel:+919000090000" className="underline font-medium" style={{ color: c.accent }}>+91 90000 90000</a>
                </li>
                <li>
                  Send us a communication to: <em>Data Privacy Office, Amaan India Properties, New Delhi, India</em>
                </li>
              </ul>
            </section>

          </div>
        </div>
      </div>

      <Footer />
      <FloatingActions />
    </div>
  );
}
