/* eslint-disable */

import Head from "next/head";
import Navbar from "../components/navbar";

const Contact = () => {
  return (
    <>
      <Head>
        <title>Contact</title>
        <meta charSet="UTF-8" />
        <meta
          name="description"
          content="Contact us for any help you may need."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="keywords"
          content="mad vibes, madvibes, mad vibes la, madvibes la, madvibesla, mens clothes, womens clothes, designer, fashion, fashion style, men fashion, women fashion, new fashion, fashion trends"
        />
        <link rel="shortcut icon" href="/mad_vibes_logo_favicon.png" />
        <link href="https://dl.dafont.com/dl/?f=chomsky" rel="stylesheet" />
      </Head>
      <Navbar />
      <main className="min-h-screen flex flex-row justify-center items-center">
        <div className="w-full md:w-1/3 bg-neutral-800 rounded-lg h-fit md:h-[80vh] flex flex-col items-start p-5">
          <h1 className="text-3xl text-white">Contact</h1>
        </div>
      </main>
    </>
  );
};

export default Contact;
