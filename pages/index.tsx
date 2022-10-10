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
      <meta charSet="UTF-8"/>
      <meta name="description" content="Find your next favorite item for your closet. Find wardrobe that will have you looking fresh."/>
      <meta name="viewport" content="width=device-width, initial-scale=1"/>
      <meta name="keywords" content="mens clothes, womens clothes, designer, fashion, fashion style, men fashion, women fashion, new fashion, fashion trends"/>
      <link rel="shortcut icon" href="/mad_vibes_logo_favicon.png" />
    </Head>
    <Navbar products={props.products}/>
    <div className='bg-[url("../public/IMG_7920.jpg")] bg-fixed bg-center bg-repeat'>
      

      <section className="w-full h-[70vh] md:h-[80vh] flex flex-row mx-auto justify-center">
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
      <main
        id="main"
        className="w-full flex flex-col mx-auto  relative justify-between bg-neutral-900 "
      >
        <section className="bg-transparent w-11/12 md:w-full mx-auto">
          <div className="mx-auto py-8 px-4 sm:py-24 sm:px-6  lg:px-8">
            <div className="text-white flex flex-row justify-between items-baseline">
              <h1 className=" font-semibold mb-5 text-2xl sm:text-3xl lg:text-4xl">
                New In
              </h1>
              <h3 className="hover:-translate-x-3 cursor-pointer transition duration-300">
                Shop All New
                <FontAwesomeIcon icon={faArrowRightLong} className="ml-2 " />
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
              {products.slice(0, 4).map((data: any, i: number) => (
                <div key={i}>
                  <a href={`/collections/${data.handle}`} className="group">
                    <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
                      <img
                        src={data.images[0].src}
                        alt=""
                        className="w-full h-full object-center object-cover group-hover:opacity-75"
                      ></img>
                    </div>
                    
                    <h3 className="mt-4 text-sm text-gray-100">{data.title}</h3>
                    <p className="mt-1 text-lg font-medium text-gray-300">
                      ${data.variants[0].price}
                    </p>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="bg-transparent w-11/12 md:w-full mx-auto h-fit">
          <div className="mx-auto py-8 px-4 sm:py-24 sm:px-6  lg:px-8">
            <div className="flex flex-row justify-between items-baseline text-white">
              <h1 className="text-gray-50 font-semibold mb-5 text-2xl sm:text-3xl lg:text-4xl">
                Shirts
              </h1>
              <h3 className="hover:-translate-x-3 cursor-pointer transition duration-300">
                Shop All Shirts
                <FontAwesomeIcon icon={faArrowRightLong} className="ml-2 " />
              </h3>
            </div>
            <div className="grid grid-cols-2 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
              {products
                .filter((product: { productType: string | string[] }) =>
                  product.productType.includes("Shirt")
                )
                .slice(0, 4)
                .map((data: any, i: number) => (
                  <div key={i}>
                    <a href="#" className="group">
                      <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
                        <img
                          src={data.images[0].src}
                          alt=""
                          className="w-full h-full object-center object-cover group-hover:opacity-75"
                        ></img>
                      </div>
                      <h3 className="mt-4 text-sm text-gray-100">
                        {data.title}
                      </h3>
                      <p className="mt-1 text-lg font-medium text-gray-300">
                        ${data.variants[0].price}
                      </p>
                    </a>
                  </div>
                ))}
            </div>
          </div>
        </section>
        <section className="w-full flex flex-col items-center justify-center bg-neutral-800 h-fit py-8 pb-10 md:py-0 md:h-[35vh]">
          <h1 className="text-white text-3xl sm:text-4xl md:text-5xl mb-4 font-thin">Join our mail list</h1>
          <form className="w-full md:w-[auto]">
            <div className="flex flex-col md:flex-row items-center gap-4">
              <input type="text" placeholder="Email" className="p-3 w-10/12 sm:w-44 md:w-48 h-8 md:h-14 rounded-sm focus:outline-none caret-white" />
              <input type="text" placeholder="First Name" className="p-3 w-10/12 sm:w-44 md:w-48 h-8 md:h-14 rounded-sm focus:outline-none caret-white" />
              <input type="text" placeholder="Last Name" className="p-3 w-10/12 sm:w-44 md:w-48 h-8 md:h-14 rounded-sm focus:outline-none caret-white" />
              <button className="bg-[#e8eddf] w-10/12 sm:w-44 md:w-48 h-8 md:h-14 rounded-sm">Sign Up</button>
            </div>
          </form>
          <p className="mt-4 text-gray-300 underline underline-offset-4">Get all of the latest drops and promotions</p>
        </section>
        <section className="bg-transparent w-11/12 md:w-full mx-auto">
          <div className="mx-auto py-8 px-4 sm:py-24 sm:px-6  lg:px-8">
            <div className="flex flex-row justify-between items-baseline text-white">
              <h1 className="text-gray-50 font-semibold mb-5 text-2xl sm:text-3xl lg:text-4xl">
                Hoodies
              </h1>
              <h3 className="hover:-translate-x-3 cursor-pointer transition duration-300">
                Shop All Hoodies
                <FontAwesomeIcon icon={faArrowRightLong} className="ml-2 " />
              </h3>
            </div>
            <div className="grid grid-cols-2 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
              {products
                .filter((product: { productType: string | string[] }) =>
                  product.productType.includes("Hoodie")
                )
                .slice(0, 4)
                .map((data: any, i: number) => (
                  <div key={i}>
                    <a href="#" className="group">
                      <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
                        <img
                          src={data.images[0].src}
                          alt=""
                          className="w-full h-full object-center object-cover group-hover:opacity-75"
                        ></img>
                      </div>
                      <h3 className="mt-4 text-sm text-gray-100">
                        {data.title}
                      </h3>
                      <p className="mt-1 text-lg font-medium text-gray-300">
                        ${data.variants[0].price}
                      </p>
                    </a>
                  </div>
                ))}
            </div>
          </div>
        </section>
        {/* <section className="w-full h-[fit] py-5 bg-neutral-700">
          <div className="w-full flex flex-row justify-between items-center px-20">
            <h1 className="text-white text-5xl font-bold tracking-widest">
              FALL SALE!
            </h1>
            <div className="flex flex-col  items-center">
              <h1 className="text-white text-6xl font-bold">10% OFF</h1>
              <h3 className="text-gray-300 text-xl">On purchases of over $60</h3>
            </div>
            <h1 className="text-white text-5xl font-bold tracking-widest">
              FALL SALE!
            </h1>
          </div>
        </section> */}
        <section className="w-full h-[80vh]"></section>
      </main>
    </div>
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
