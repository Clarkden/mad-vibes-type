/* eslint-disable */
import { faCaretRight, faSliders } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Navbar from "../../components/navbar";
// import Checkbox from "../../components/checkbox";
import { parseShopifyResponse, shopifyClient } from "../../functions/functions";

interface productProps {
  products: Array<any>;
}

const Collection = (props: productProps) => {
  const [products, setProducts] = useState<any>(props.products);
  const [preservedProductsList, setPreservedProductsList] =
    useState<any>(products);

  const router = useRouter();
  const { shop } = router.query;

  ///////

  const [men, setMen] = useState<boolean>(false);

  const [sortByPriceLow, setSortByPriceLow] = useState<boolean>(false);
  const [sortByPriceHigh, setSortByPriceHigh] = useState<boolean>(false);
  const [sortByNewest, setSortByNewest] = useState<boolean>(true);

  useEffect(() => {
    if (men) {
    } else {
    }
  }, [men]);

  useEffect(() => {
    if (sortByPriceLow) {
      setSortByPriceHigh(false);
      setSortByNewest(false);
      setProducts(
        [...products].sort((a, b) => a.variants[0].price - b.variants[0].price)
      );
    }
  }, [sortByPriceLow]);

  useEffect(() => {
    if (sortByPriceHigh) {
      setSortByPriceLow(false);
      setSortByNewest(false);
      setProducts(
        [...products].sort((a, b) => b.variants[0].price - a.variants[0].price)
      );
    }
  }, [sortByPriceHigh]);

  useEffect(() => {
    if (sortByNewest) {
      setSortByPriceLow(false);
      setSortByPriceHigh(false);
      setProducts(
        [...products].sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
      );
    }
  }, [sortByNewest]);

  //////

  const [all, setAll] = useState<boolean>(true);
  const [hats, setHats] = useState<boolean>(false);
  const [hoodies, setHoodies] = useState<boolean>(false);
  const [shirts, setShirts] = useState<boolean>(false);

  useEffect(() => {
    if (all) {
      setHats(false);
      setHoodies(false);
      setShirts(false);
      setProducts(preservedProductsList);
    }
  }, [all]);

  useEffect(() => {
    if (hats) {
      setAll(false);
      setHoodies(false);
      setShirts(false);

      let copy: any = preservedProductsList;
      setProducts(
        preservedProductsList.filter((product: any) =>
          product.productType.includes("Hat")
        )
      );
      setPreservedProductsList(copy);
    }
  }, [hats]);

  useEffect(() => {
    if (hoodies) {
      setAll(false);
      setHats(false);
      setShirts(false);

      let copy: any = preservedProductsList;
      setProducts(
        preservedProductsList.filter((product: any) =>
          product.productType.includes("Hoodie")
        )
      );
      setPreservedProductsList(copy);
    }
  }, [hoodies]);

  useEffect(() => {
    if (shirts) {
      setAll(false);
      setHats(false);
      setHoodies(false);

      let copy: any = preservedProductsList;
      setProducts(
        preservedProductsList.filter((product: any) =>
          product.productType.includes("Shirt")
        )
      );
      setPreservedProductsList(copy);
    }
  }, [shirts]);

  useEffect(() => {
    switch (shop) {
      case "new":
        setSortByNewest(true);
        break;
      case "priceLow":
        setSortByPriceLow(true);
        break;
      case "priceHigh":
        setSortByPriceHigh(true);
        break;
      case "hats":
        setHats(true);
        break;
      case "hoodies":
        setHoodies(true);
        break;
      case "shirts":
        setShirts(true);
        break;

      default:
        break;
    }
  }, [shop]);

  const [mobileSortingMenu, setMobileSortingMenu] = useState<string>("h-0");
  const [mobileCaret, setMobileCaret] = useState<string>("rotate-0");

  return (
    <>
    <Head>
      <title>Collections</title>
      <meta charSet="UTF-8"/>
      <meta name="description" content="Shop our collection and find your new favorite item. Keep it fresh with our latest drops."/>
      <meta name="viewport" content="width=device-width, initial-scale=1"/>
      <meta name="keywords" content="mens clothes, womens clothes, designer, fashion, fashion style, men fashion, women fashion, new fashion, fashion trends"/>
      <link rel="shortcut icon" href="/mad_vibes_logo_favicon.png" />
    </Head>
    <Navbar products={props.products}/>
      <div className="min-h-max">
        <section className="md:p-14 flex flex-col md:flex-row relative w-full md:w-[95%] mx-auto md:gap-10 p-5 pb-20">
          <aside className="md:w-[20vw] h-[80vh] sticky top-14 hidden md:flex flex-col rounded-lg text-white">
            <div className="flex flex-col gap-3 border-b-2 pb-4 border-b-neutral-700 ">
              <div className="flex flex-row gap-2">
                {men ? (
                  <div
                    className="w-6 h-6 bg-[#e8eddf] hover:bg-[#e8eddf]/75  hover:cursor-pointer rounded-md"
                    onClick={() => setMen(false)}
                  ></div>
                ) : (
                  <div
                    className="w-6 h-6 bg-neutral-700 hover:bg-neutral-600 hover:cursor-pointer rounded-md"
                    onClick={() => setMen(true)}
                  ></div>
                )}
                <p className="">Men</p>
              </div>
              <div className="flex flex-row gap-2">
                <div
                  className="w-6 h-6 bg-neutral-700 rounded-md"
                  onClick={() => {}}
                ></div>
                <p className="">Women</p>
              </div>
              <div className="flex flex-row gap-2">
                <div
                  className="w-6 h-6 bg-neutral-700 rounded-md"
                  onClick={() => {}}
                ></div>
                <p className="">Unisex</p>
              </div>
            </div>
            <div className="flex flex-col gap-3 border-b-2 border-b-neutral-700 py-4">
              <div className="flex flex-row gap-2">
                {sortByPriceLow ? (
                  <div
                    className="w-6 h-6 bg-[#e8eddf] hover:bg-[#e8eddf]/75  hover:cursor-pointer rounded-md"
                    // onClick={}
                  ></div>
                ) : (
                  <div
                    className="w-6 h-6 bg-neutral-700 hover:bg-neutral-600 hover:cursor-pointer rounded-md"
                    onClick={() => setSortByPriceLow(true)}
                  ></div>
                )}
                <p className="">Sort by Price (Low-High)</p>
              </div>
              <div className="flex flex-row gap-2">
                {sortByPriceHigh ? (
                  <div
                    className="w-6 h-6 bg-[#e8eddf] hover:bg-[#e8eddf]/75  hover:cursor-pointer rounded-md"
                    // onClick={}
                  ></div>
                ) : (
                  <div
                    className="w-6 h-6 bg-neutral-700 hover:bg-neutral-600 hover:cursor-pointer rounded-md"
                    onClick={() => setSortByPriceHigh(true)}
                  ></div>
                )}
                <p className="">Sort by Price (High-Low)</p>
              </div>
              <div className="flex flex-row gap-2">
                {sortByNewest ? (
                  <div
                    className="w-6 h-6 bg-[#e8eddf] hover:bg-[#e8eddf]/75  hover:cursor-pointer rounded-md"
                    // onClick={}
                  ></div>
                ) : (
                  <div
                    className="w-6 h-6 bg-neutral-700 hover:bg-neutral-600 hover:cursor-pointer rounded-md"
                    onClick={() => setSortByNewest(true)}
                  ></div>
                )}
                <p className="">Sort by New</p>
              </div>
            </div>
            <div>
              <div className="flex flex-col gap-3 py-4">
                <div className="flex flex-row gap-2">
                  {all ? (
                    <div
                      className="w-6 h-6 bg-[#e8eddf] hover:bg-[#e8eddf]/75  hover:cursor-pointer rounded-md"
                      // onClick={}
                    ></div>
                  ) : (
                    <div
                      className="w-6 h-6 bg-neutral-700 hover:bg-neutral-600 hover:cursor-pointer rounded-md"
                      onClick={() => setAll(true)}
                    ></div>
                  )}
                  <p className="">All</p>
                </div>
                <div className="flex flex-row gap-2">
                  {hats ? (
                    <div
                      className="w-6 h-6 bg-[#e8eddf] hover:bg-[#e8eddf]/75  hover:cursor-pointer rounded-md"
                      // onClick={}
                    ></div>
                  ) : (
                    <div
                      className="w-6 h-6 bg-neutral-700 hover:bg-neutral-600 hover:cursor-pointer rounded-md"
                      onClick={() => setHats(true)}
                    ></div>
                  )}
                  <p className="">Hats</p>
                </div>
                <div className="flex flex-row gap-2">
                  {hoodies ? (
                    <div
                      className="w-6 h-6 bg-[#e8eddf] hover:bg-[#e8eddf]/75  hover:cursor-pointer rounded-md"
                      // onClick={}
                    ></div>
                  ) : (
                    <div
                      className="w-6 h-6 bg-neutral-700 hover:bg-neutral-600 hover:cursor-pointer rounded-md"
                      onClick={() => setHoodies(true)}
                    ></div>
                  )}
                  <p className="">Hoodies</p>
                </div>
                <div className="flex flex-row gap-2">
                  {shirts ? (
                    <div
                      className="w-6 h-6 bg-[#e8eddf] hover:bg-[#e8eddf]/75  hover:cursor-pointer rounded-md"
                      // onClick={}
                    ></div>
                  ) : (
                    <div
                      className="w-6 h-6 bg-neutral-700 hover:bg-neutral-600 hover:cursor-pointer rounded-md"
                      onClick={() => setShirts(true)}
                    ></div>
                  )}
                  <p className="">Shirts</p>
                </div>
              </div>
            </div>
          </aside>
          <div className="text-white flex flex-col md:hidden gap-2 justify-between items-center mt-2">
            <div className="flex flex-row w-full justify-between">
              <div
                className="flex flex-row gap-2 items-center w-fit"
                onClick={
                  mobileCaret === "rotate-0"
                    ? () => {
                        setMobileCaret("rotate-90");
                        setMobileSortingMenu("h-[240px]");
                      }
                    : () => {
                        setMobileCaret("rotate-0");
                        setMobileSortingMenu("h-0 ");
                      }
                }
              >
                <FontAwesomeIcon icon={faSliders} className="text-xl" />
                <p className="text-lg">Sorting Settings</p>
              </div>
              <FontAwesomeIcon
                icon={faCaretRight}
                className={`text-2xl ${mobileCaret} transition duration-500`}
                onClick={
                  mobileCaret === "rotate-0"
                    ? () => {
                        setMobileCaret("rotate-90");
                        setMobileSortingMenu("h-[240px] ");
                      }
                    : () => {
                        setMobileCaret("rotate-0");
                        setMobileSortingMenu("h-0 ");
                      }
                }
              />
            </div>
            <div
              className={`${mobileSortingMenu} w-full mt-5 overflow-scroll tranisition-height duration-500`}
            >
              <div className="flex flex-row gap-3 border-b-2 pb-4 border-b-neutral-700 ">
                <div className="flex flex-row gap-2">
                  {men ? (
                    <div
                      className="w-6 h-6 bg-[#e8eddf] hover:bg-[#e8eddf]/75  hover:cursor-pointer rounded-md"
                      onClick={() => setMen(false)}
                    ></div>
                  ) : (
                    <div
                      className="w-6 h-6 bg-neutral-700 hover:bg-neutral-600 hover:cursor-pointer rounded-md"
                      onClick={() => setMen(true)}
                    ></div>
                  )}
                  <p className="">Men</p>
                </div>
                <div className="flex flex-row gap-2">
                  <div
                    className="w-6 h-6 bg-neutral-700 rounded-md"
                    onClick={() => {}}
                  ></div>
                  <p className="">Women</p>
                </div>
                <div className="flex flex-row gap-2">
                  <div
                    className="w-6 h-6 bg-neutral-700 rounded-md"
                    onClick={() => {}}
                  ></div>
                  <p className="">Unisex</p>
                </div>
              </div>
              <div className="flex flex-col gap-3 border-b-2 border-b-neutral-700 py-4">
                <div className="flex flex-row gap-2">
                  {sortByPriceLow ? (
                    <div
                      className="w-6 h-6 bg-[#e8eddf] hover:bg-[#e8eddf]/75  hover:cursor-pointer rounded-md"
                      // onClick={}
                    ></div>
                  ) : (
                    <div
                      className="w-6 h-6 bg-neutral-700 hover:bg-neutral-600 hover:cursor-pointer rounded-md"
                      onClick={() => setSortByPriceLow(true)}
                    ></div>
                  )}
                  <p className="">Sort by Price (Low-High)</p>
                </div>
                <div className="flex flex-row gap-2">
                  {sortByPriceHigh ? (
                    <div
                      className="w-6 h-6 bg-[#e8eddf] hover:bg-[#e8eddf]/75  hover:cursor-pointer rounded-md"
                      // onClick={}
                    ></div>
                  ) : (
                    <div
                      className="w-6 h-6 bg-neutral-700 hover:bg-neutral-600 hover:cursor-pointer rounded-md"
                      onClick={() => setSortByPriceHigh(true)}
                    ></div>
                  )}
                  <p className="">Sort by Price (High-Low)</p>
                </div>
                <div className="flex flex-row gap-2">
                  {sortByNewest ? (
                    <div
                      className="w-6 h-6 bg-[#e8eddf] hover:bg-[#e8eddf]/75  hover:cursor-pointer rounded-md"
                      // onClick={}
                    ></div>
                  ) : (
                    <div
                      className="w-6 h-6 bg-neutral-700 hover:bg-neutral-600 hover:cursor-pointer rounded-md"
                      onClick={() => setSortByNewest(true)}
                    ></div>
                  )}
                  <p className="">Sort by New</p>
                </div>
              </div>
              <div>
                <div className="flex flex-row gap-3 pt-4">
                  <div className="flex flex-row gap-2">
                    {all ? (
                      <div
                        className="w-6 h-6 bg-[#e8eddf] hover:bg-[#e8eddf]/75  hover:cursor-pointer rounded-md"
                        // onClick={}
                      ></div>
                    ) : (
                      <div
                        className="w-6 h-6 bg-neutral-700 hover:bg-neutral-600 hover:cursor-pointer rounded-md"
                        onClick={() => setAll(true)}
                      ></div>
                    )}
                    <p className="">All</p>
                  </div>
                  <div className="flex flex-row gap-2">
                    {hats ? (
                      <div
                        className="w-6 h-6 bg-[#e8eddf] hover:bg-[#e8eddf]/75  hover:cursor-pointer rounded-md"
                        // onClick={}
                      ></div>
                    ) : (
                      <div
                        className="w-6 h-6 bg-neutral-700 hover:bg-neutral-600 hover:cursor-pointer rounded-md"
                        onClick={() => setHats(true)}
                      ></div>
                    )}
                    <p className="">Hats</p>
                  </div>
                  <div className="flex flex-row gap-2">
                    {hoodies ? (
                      <div
                        className="w-6 h-6 bg-[#e8eddf] hover:bg-[#e8eddf]/75  hover:cursor-pointer rounded-md"
                        // onClick={}
                      ></div>
                    ) : (
                      <div
                        className="w-6 h-6 bg-neutral-700 hover:bg-neutral-600 hover:cursor-pointer rounded-md"
                        onClick={() => setHoodies(true)}
                      ></div>
                    )}
                    <p className="">Hoodies</p>
                  </div>
                  <div className="flex flex-row gap-2">
                    {shirts ? (
                      <div
                        className="w-6 h-6 bg-[#e8eddf] hover:bg-[#e8eddf]/75  hover:cursor-pointer rounded-md"
                        // onClick={}
                      ></div>
                    ) : (
                      <div
                        className="w-6 h-6 bg-neutral-700 hover:bg-neutral-600 hover:cursor-pointer rounded-md"
                        onClick={() => setShirts(true)}
                      ></div>
                    )}
                    <p className="">Shirts</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 w-full md:w-[80vw]">
            {products.map((data: any, i: number) => (
              <div key={i}>
                <div
                  className="group cursor-pointer"
                  onClick={() => router.push(`/collections/${data.handle}`)}
                >
                  <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
                    <img
                      src={data.images[0].src}
                      alt={data.images[0].altText}
                      className="w-full h-full object-center object-cover group-hover:opacity-75"
                    ></img>
                  </div>
                  <h3 className="mt-4 text-sm text-gray-100">{data.title}</h3>
                  <p className="mt-1 text-lg font-medium text-gray-300">
                    ${data.variants[0].price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
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

export default Collection;
