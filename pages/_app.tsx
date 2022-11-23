import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ParallaxProvider } from "react-scroll-parallax";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import Footer from "../components/footer";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
config.autoAddCss = false;

function MyApp({ Component, pageProps }: AppProps) {
  const [promotion, setPromotion] = useState<string>("flex");
  return (
    <ParallaxProvider>
      <div className="min-w-full min-h-full bg-neutral-900 dark:text-black">
        <div
          className={`h-[30px] text-white flex flex-row items-center justify-center ${promotion}`}
        >
          <p>
            <FontAwesomeIcon
              icon={faClose}
              className="text-red-400 mr-2 cursor-pointer"
              onClick={() => setPromotion("hidden")}
            />{" "}
            It{"'"}s our Black Friday Sale!
          </p>
        </div>
        <Component {...pageProps} />
        <Footer />
      </div>
    </ParallaxProvider>
  );
}

export default MyApp;
