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
  const products: any = props.products;
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
      <section className='w-full h-[70vh] md:h-[80vh] flex flex-row mx-auto justify-center bg-[url("../public/IMG_1000.png")] bg-fixed bg-left md:bg-no-repeat md:bg-cover md:bg-center relative'>
        <div className="w-1/3 h-full hidden md:block"></div>
        <div className="md:w-1/3 h-full md:border-x-2 md:border-white/50 flex flex-col justify-center items-center">
          <div className="bg-[#e8eddf] w-4/5 p-3 rounded-[3px]">
            <img loading="lazy" src="/mad_vibes_logo.png"></img>
            <a href="/collections">
              <h3 className="text-center uppercase border-2 border-black mt-5 rounded-md bg-black text-white hover:scale-[101%] transition">
                Shop mad vibes
              </h3>
            </a>
          </div>
        </div>
        <div className="w-1/3 h-full hidden md:block"></div>
      </section>

      <main
        id="main"
        className="w-full flex flex-col mx-auto  relative justify-between bg-neutral-900 "
      >
        <section className="h-fit flex flex-col-reverse md:flex-row overflow-hidden py-10 md:py-20 px-4 md:px-10 relative">
          <img
            className="max-h-[150px] max-w-[150px] z-10 md:max-h-[300px] md:max-w-[300px] absolute md:z-40 top-2 right-2  md:top-1/2 md:-translate-y-1/2 md:right-1/4 md:translate-x-3/4"
            src="/redSnowFlake.png"
          ></img>
          <img
            className="max-h-[150px] max-w-[150px] z-10 md:max-h-[300px] md:max-w-[300px] absolute md:z-40 bottom-1/4 translate-y-2/4 left-2 md:top-1/2 md:-translate-y-1/2 md:left-1/4 md:-translate-x-3/4"
            src="/redSnowFlake.png"
          ></img>

          <div className="w-11/2 md:w-full flex flex-col justify-center items-center relative my-24 md:my-0 z-40">
            <div className="flex flex-col w-fit h-full">
              <h1 className="text-5xl md:text-7xl text-[white] font-thin text-center tracking-wide">
                HOLIDAY<br></br>
                <span className="font-bold tracking-widest">SEASON</span>
              </h1>
              <p className=" text-lg sm:text-xl md:text-2xl text-center mt-5 text-gray-400">
                Just in time for the holidays!
              </p>
              <button
                className="bg-white shadow-sm shadow-white hover:scale-105 p-1 md:p-2 mt-10 black font-bold transition rounded-lg w-full self-center text-black"
                onClick={() => router.push("/collections?shop=new")}
              >
                Shop Collections
              </button>
            </div>
          </div>
        </section>
        <div className="border-2 border-neutral-800 w-11/12 mx-auto rounded-lg"></div>
        <section className="h-fit w-full md:h-[80vh] md:w-[95%] mx-auto py-20 md:px-5 flex flex-col md:flex-row gap-8">
          <div
            onClick={() =>
              router.push("/collections/beige-on-white-puff-vibe-tee")
            }
            className="w-10/12 mx-auto h-[50vh] md:h-full md:w-1/4 overflow-hidden relative shadow-white shadow-md border-2 border-white hover:shadow-lg hover:shadow-white transition cursor-pointer"
          >
            <img
              loading="lazy"
              src="IMG_8029.jpg"
              className="absolute top-[-9999px] bottom-[-9999px] left-[-9999px] right-[-9999px] m-auto min-h-full min-w-full rounded-sm"
            ></img>
          </div>
          <div
            onClick={() =>
              router.push("/collections/mad-vibes-trucker-hat-camo")
            }
            className="w-10/12 mx-auto h-[50vh] md:h-full md:w-1/4 overflow-hidden relative shadow-white shadow-md border-2 border-white hover:shadow-lg hover:shadow-white transition cursor-pointer"
          >
            <img
              loading="lazy"
              src="IMG_1000.png"
              className="absolute top-[-9999px] bottom-[-9999px] left-[-9999px] right-[-9999px] m-auto min-h-full min-w-full rounded-sm"
            ></img>
          </div>
          <div
            onClick={() => router.push("/collections/blackout-puff-vibe-tee")}
            className="w-10/12 mx-auto h-[50vh] md:h-full md:w-1/4 overflow-hidden relative shadow-white shadow-md border-2 border-white hover:shadow-lg hover:shadow-white transition cursor-pointer"
          >
            <img
              loading="lazy"
              src="IMG_8088.jpg"
              className="absolute top-[-9999px] bottom-[-9999px] left-[-9999px] right-[-9999px] m-auto min-h-full min-w-full rounded-sm"
            ></img>
          </div>
          <div
            onClick={() => router.push("/collections/blackout-puff-vibe-tee")}
            cursor-pointer
            className="w-10/12 mx-auto h-[50vh] md:h-full md:w-1/4 overflow-hidden relative shadow-white shadow-md border-2 border-white hover:shadow-lg hover:shadow-white transition cursor-pointer"
          >
            <img
              loading="lazy"
              src="IMG_7920.jpg"
              className="absolute top-[-9999px] bottom-[-9999px] left-[-9999px] right-[-9999px] m-auto min-h-full min-w-full rounded-sm"
            ></img>
          </div>
        </section>
        <div className="border-2 border-neutral-800 w-11/12 mx-auto rounded-lg"></div>
        <section className="h-fit md:h-[15vh] my-20 mb-24 flex flex-col items-center justify-center w-fit mx-auto">
          <h1 className="text-xl md:text-3xl text-white">
            Shop our latest drops now
          </h1>
          <button
            className="bg-rose-500 p-2 md:p-3 px-4 rounded-lg mt-3 text-white w-full text-base md:text-lg hover:scale-105 ease-in-out transition"
            onClick={() => router.push("/collections")}
          >
            Shop Collections
          </button>
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
