import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ParallaxProvider } from "react-scroll-parallax";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import Footer from "../components/footer";
config.autoAddCss = false;

function MyApp({ Component, pageProps }: AppProps) {
  return (
      <div className="min-w-full min-h-full bg-neutral-900 dark:text-black">
        <Component {...pageProps} />
        <Footer />
      </div>
  );
}


export default MyApp;
