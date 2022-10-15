/* eslint-disable */
import type { GetServerSideProps, NextPage } from "next";
import { Parallax } from "react-scroll-parallax";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { shopifyClient, parseShopifyResponse } from "../functions/functions";
import { useRouter } from "next/router";
import MyApp from "./_app";
import Navbar from "../components/navbar";

interface productProps {
  products: Array<any>;
}

const Home = (props: productProps) => {
  let products: any = props.products;

  const [hoverTest, setHoverTest] = useState(false);

  const router = useRouter();

  return (
    <>
      <Head>
        <title>Mad Vibes</title>
        <meta charSet="UTF-8" />
        <meta
          name="description"
          content="Find your next favorite item for your closet. Find wardrobe that will have you looking fresh."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="keywords"
          content="mad vibes, madvibes, mad vibes la, madvibes la, madvibesla, mens clothes, womens clothes, designer, fashion, fashion style, men fashion, women fashion, new fashion, fashion trends"
        />
        <link rel="shortcut icon" href="/mad_vibes_logo_favicon.png" />
        <link href="https://dl.dafont.com/dl/?f=chomsky" rel="stylesheet" />
      </Head>
      <Navbar products={props.products} />
      {/* <div className=' bg-fixed bg-center bg-no-repeat md:bg-repeat bg-contain'> */}

      <section className='w-full h-[70vh] md:h-[80vh] flex flex-row mx-auto justify-center bg-[url("../public/IMG_7920.jpg")] bg-fixed bg-top md:bg-center relative'>
        <div className="w-1/3 h-full hidden md:block"></div>
        <div className="md:w-1/3 h-full md:border-x-2 md:border-white/50 flex flex-col justify-center items-center">
          <div className="bg-[#e8eddf] w-4/5 p-3">
            <img src="/mad_vibes_logo.png"></img>
            <a href="#main">
              <h3 className="hover:underline">Shop mad vibes</h3>
            </a>
          </div>
        </div>
        <div className="w-1/3 h-full hidden md:block"></div>
      </section>
      <Parallax speed={100} className="z-50 absolute">
        <img
          src="flying-bats.png"
          className="w-auto h-[40vh] md:h-[60vh] top-0 left-20"
        />
      </Parallax>
      <main
        id="main"
        className="w-full flex flex-col mx-auto  relative justify-between bg-neutral-900 "
      >
        <section className="h-fit flex flex-col-reverse md:flex-row relative overflow-hidden py-10 md:py-20 px-4 md:px-10">
          {/* <div className="w-full md:w-1/2 flex flex-row flex-wrap mt-8 md:mt-0"> */}
          <div className="w-full md:w-1/4 p-4">
            <img
              src="/FullSizeRender.JPG"
              className="rounded-sm shadow-md shadow-orange-400 border-2 border-orange-400 saturate-150"
            ></img>
          </div>

          {/* </div> */}

          <div className="w-full md:w-11/12 flex flex-col justify-center md:items-center relative my-24 md:my-0">
            <h1 className="text-4xl md:text-6xl font-chomsky text-orange-400 font-semibold text-center">
              ITS SPOOKY SEASON
            </h1>
            <p className=" text-2xl md:text-3xl text-white font-chomsky text-center mt-5">
              Shop our scariest drop yet!
            </p>
            <button
              className="bg-orange-400 shadow-md shadow-orange-400 p-2 mt-3 black font-bold hover:scale-105 transition rounded-lg w-fit self-center"
              onClick={() => router.push("collections")}
            >
              Shop Collections
            </button>
            <img
              src="pumpkin1.png"
              className="absolute w-14 h-14  left-6 -bottom-3 md:w-20 md:h-20 md:bottom-4 md:left-20 z-30"
            />
            <img
              src="pumpkin2.png"
              className="absolute w-14 h-14 right-6 -bottom-3 md:w-20 md:h-20 md:bottom-4 md:right-20 z-30"
            />
            {/* <img src="candel.png" className="absolute w-14 h-14 right-0  md:w-auto md:h-20 md:bottom-4 md:left-1/2 md:-translate-x-[90%] "/> */}
            {/* <img src="candel.png" className="absolute w-14 h-14 right-0  md:w-auto md:h-20 md:bottom-4 md:left-1/2 md:-translate-x-[10%] "/> */}
          </div>
          <div className="w-full md:w-1/4 p-4">
            <img
              src="/IMG_4599.JPG"
              className="rounded-sm shadow-md shadow-orange-400 border-2 border-orange-400 saturate-150"
            ></img>
          </div>
        </section>
        <div className="border-2 border-neutral-800 w-11/12 mx-auto rounded-lg"></div>
        <section className="h-fit w-full md:h-[80vh] md:w-[95%] mx-auto py-20 md:px-5 flex flex-col md:flex-row gap-8">
          <div className="w-10/12 mx-auto h-[50vh] md:h-full md:w-1/4 overflow-hidden relative shadow-white shadow-md border-2 border-white hover:shadow-lg hover:shadow-white transition">
            <img
              src="IMG_8029.jpg"
              className="absolute top-[-9999px] bottom-[-9999px] left-[-9999px] right-[-9999px] m-auto min-h-full min-w-full rounded-sm"
            ></img>
          </div>
          <div className="w-10/12 mx-auto h-[50vh] md:h-full md:w-1/4 overflow-hidden relative shadow-white shadow-md border-2 border-white hover:shadow-lg hover:shadow-white transition">
            <img
              src="IMG_1000.png"
              className="absolute top-[-9999px] bottom-[-9999px] left-[-9999px] right-[-9999px] m-auto min-h-full min-w-full rounded-sm"
            ></img>
          </div>
          <div className="w-10/12 mx-auto h-[50vh] md:h-full md:w-1/4 overflow-hidden relative shadow-white shadow-md border-2 border-white hover:shadow-lg hover:shadow-white transition">
            <img
              src="IMG_8088.jpg"
              className="absolute top-[-9999px] bottom-[-9999px] left-[-9999px] right-[-9999px] m-auto min-h-full min-w-full rounded-sm"
            ></img>
          </div>
          <div className="w-10/12 mx-auto h-[50vh] md:h-full md:w-1/4 overflow-hidden relative shadow-white shadow-md border-2 border-white hover:shadow-lg hover:shadow-white transition">
            <img
              src="IMG_7920.jpg"
              className="absolute top-[-9999px] bottom-[-9999px] left-[-9999px] right-[-9999px] m-auto min-h-full min-w-full rounded-sm"
            ></img>
          </div>
          
        </section>
        <div className="border-2 border-neutral-800 w-11/12 mx-auto rounded-lg"></div>
        <section className="h-fit md:h-[15vh] my-20 mb-24 flex flex-col items-center justify-center w-fit mx-auto">
          <h1 className="text-xl md:text-3xl text-white">Shop our latest drops now</h1>
          <button className="bg-rose-500 p-2 md:p-3 px-4 rounded-lg mt-3 text-white w-full text-base md:text-lg" onClick={() => router.push('/collections')}>Shop Collections</button>
        </section>
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const products = await shopifyClient.product.fetchAll();

  return {
    props: {
      products: parseShopifyResponse(products),
    },
  };
};

export default Home;
