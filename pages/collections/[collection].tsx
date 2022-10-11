/* eslint-disable */
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  AddToCart,
  parseShopifyResponse,
  shopifyClient,
} from "../../functions/functions";
import { GetServerSideProps } from "next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowLeftLong,
} from "@fortawesome/free-solid-svg-icons";
import Navbar from "../../components/navbar";
import Client from "shopify-buy";

interface product {
  id: string;
  availableForSale: boolean;
  createdAt: string;
  updatedAt: string;
  descriptionHtml: string;
  description: string;
  handle: string;
  productType: string;
  title: string;
  vendor: string;
  publishedAt: string;
  onlineStoreUrl: string | null;
  options: Array<any>;
  images: Array<any>;
  variants: Array<any>;
  type: {
    name: string;
    kind: string;
    fieldBaseTypes: Array<any>;
    implementsNode: boolean;
  };
  hasNextPage: { value: boolean };
  hasPreviousPage: { value: boolean };
  variableValues: { first: number };
}

const Collection = (props: any) => {
  const router = useRouter();
  const [product, setProduct] = useState<product>();
  const { products, handle } = props;
  const [selectedVariant, setSelectedVariant] = useState<any>();

  useEffect(() => {
    let localProduct: any = {};
    for (let x = 0; x < products.length; x++) {
      if (products[x].handle === handle) {
        localProduct = products[x];
        break;
      }
    }
    setProduct(localProduct);

    if (localProduct.variants.length - 1 > 0) {
      for (let x = localProduct.variants.length - 1; x > -1; x--) {
        if (!selectedVariant && localProduct.variants[x].available)
          setSelectedVariant(localProduct!.variants[x]);
      }
    } else {
      setSelectedVariant(localProduct!.variants[0]);
    }
  }, [products, handle]);

  // console.log(selectedVariant)

  const InstantCheckout = async (id: string) => {
    const localClient = Client.buildClient({
      storefrontAccessToken:
        process.env.NEXT_PUBLIC_SHOPIFY_STORE_FRONT_ACCESS_TOKEN!,
      domain: process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN!,
    });

    let checkout = parseShopifyResponse(await localClient.checkout.create());
    checkout = parseShopifyResponse(
      await localClient.checkout.addLineItems(checkout.id, [
        { variantId: id, quantity: 1 },
      ])
    );
    router.push(checkout.webUrl);
  };

  if (product) {
    return (
      <>
        <Navbar products={products} />
        <section className="w-full min-h-screen flex flex-col md:flex-row p-4 md:p-10">
          <div className="w-full md:w-11/12 mx-auto ">
            <div className="text-white md:mb-4 w-fit cursor-pointer hover:translate-x-1 transition duration-400">
              <FontAwesomeIcon
                icon={faArrowLeftLong}
                className="mr-2 text-lg"
              />
              <p
                className=" font-semibold text-lg w-fit inline "
                onClick={() => router.push("/collections")}
              >
                Back
              </p>
            </div>
            <div className="flex flex-col justify-start md:flex-row h-full md:justify-around gap-10">
              <div className="md:w-3/5">
                <div className="h-[30vh] md:h-[60vh] min-w-[95%] rounded-md overflow-hidden relative mt-5 md:mt-0">
                  <img
                    src={product.images[0].src}
                    className="h-auto min-w-full absolute top-[-9999px] bottom-[-9999px] left-[-9999px] right-[-9999px] m-auto rounded-lg"
                  ></img>
                </div>
                {products.images?.length > 2 ? (
                  <div className="w-1/3 flex flex-col">
                    <div className="w-full h-1/2">
                      <img
                        src={product.images[1].src}
                        className="h-auto min-w-full absolute top-[-9999px] bottom-[-9999px] left-[-9999px] right-[-9999px] m-auto rounded-lg"
                      ></img>
                    </div>
                    <div className="w-full h-1/2">
                      <img
                        src={product.images[2].src}
                        className="h-auto min-w-full absolute top-[-9999px] bottom-[-9999px] left-[-9999px] right-[-9999px] m-auto rounded-lg"
                      ></img>
                    </div>
                  </div>
                ) : null}
              </div>
              <div className="text-white">
                <h1 className="text-2xl md:text-3xl">{product.title}</h1>
                {/* <p className="text-gray-400 text-lg">{product.productType}</p> */}
                <h2 className="text-xl md:text-2xl text-gray-50 mt-1">
                  ${selectedVariant.price}
                </h2>
                <h1 className="text-2xl mt-10">Sizes</h1>
                <div className="md:w-2/5 mb-5">
                  <div className="flex flex-row flex-nowrap gap-5 mt-2">
                    {product.variants.map((data: any, i: number) => (
                      <>
                        {data.available ? (
                          <>
                            {data.title === selectedVariant?.title! ? (
                              <button
                                key={i}
                                className={`bg-green-100 p-1 text-black text-sm rounded-md w-full md:text-lg md:min-w-[120px] md:min-h-[35px]`}
                              >
                                {data.title}
                              </button>
                            ) : (
                              <button
                                key={i}
                                className="bg-neutral-500 p-1 text-black text-sm rounded-md hover:bg-gray-50 w-full min-h-[30px] md:text-lg md:min-w-[120px] md:min-h-[35px] transition"
                                onClick={() => setSelectedVariant(data)}
                              >
                                {data.title}
                              </button>
                            )}
                          </>
                        ) : (
                          <button
                            key={i}
                            disabled
                            className="border-2 border-gray-500 p-1 text-white text-md rounded-md md:text-lg w-full min-h-[30px] md:min-w-[120px] md:min-h-[35px]"
                          >
                            {data.title}
                          </button>
                        )}
                      </>
                    ))}
                  </div>
                </div>
                {selectedVariant.available ? (
                  <button
                    key={1}
                    className="bg-[#e8eddf] w-full h-12 p-2 text-black rounded-md mb-2 mt-2 md:mt-0"
                    onClick={() => {
                      console.log(selectedVariant.title);
                      AddToCart(product.id, selectedVariant.title);
                      window.location.reload();
                    }}
                  >
                    Add to Cart
                  </button>
                ) : (
                  <button
                    key={1}
                    className="bg-[#e8eddf]/75 w-full h-12 p-2 text-black rounded-md mb-2 mt-2"
                    disabled
                  >
                    Add to Cart
                  </button>
                )}
                {selectedVariant.available ? (
                  <button
                    key={2}
                    className="bg-[#e8eddf] w-full h-12 p-2 text-black rounded-md"
                    onClick={() => InstantCheckout(product.variants[0].id)}
                  >
                    Buy
                  </button>
                ) : (
                  <button
                    key={2}
                    className="bg-[#e8eddf]/75 w-full h-12 p-2 text-black rounded-md"
                    disabled
                  >
                    Buy
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>
      </>
    );
  } else {
    return (
      <>
        <Navbar products={products} />
        <div className="min-h-screen flex flex-col">
          <section className="w-full h-full flex flex-col mt-48 items-center justiy-center text-white">
            <div className="flex flex-col items-center">
              <h1 className="text-4xl font-bold">Uh Oh!</h1>
              <h2 className="text-2xl">
                We were not able to find what you were looking for!
              </h2>
              <p
                className="text-red-400 hover:text-red-200 cursor-pointer w-fit mt-4 underline underline-offset-2"
                onClick={() => router.push("/collections")}
              >
                Back to collections
              </p>
            </div>
          </section>
        </div>
      </>
    );
  }
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const products: any = parseShopifyResponse(
    await shopifyClient.product.fetchAll()
  );
  const handle: any = context.params!.collection;

  return {
    props: {
      handle: handle,
      products: products,
    },
  };
};

export default Collection;
