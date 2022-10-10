/* eslint-disable */

import React, { useEffect, useState } from "react";
import { useRouter, withRouter } from "next/router";
import {
  AddToCart,
  ClearCart,
  parseShopifyResponse,
  shopifyClient,
  SubtractFromCart,
} from "../../../functions/functions";
import { GetServerSideProps } from "next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowLeftLong,
  faCaretDown,
  faCaretUp,
} from "@fortawesome/free-solid-svg-icons";
import Navbar from "../../../components/navbar";
import Head from "next/head";
import Client from "shopify-buy";

const Checkout = (props: any) => {
  const router = useRouter();
  const { products } = props;

  const [items, setItems] = useState<any>([]);
  const [renderedItems, setRenderedItems] = useState<any>();
  const [updateItems, SetUpdateItems] = useState<number>(0);

  useEffect(() => {
    const localItems = JSON.parse(localStorage.getItem("items")!);
    if (localItems) {
      setItems(localItems);
    }
  }, [updateItems]);

  useEffect(() => {
    let cartItems: any = [];
    for (let x = 0; x < items.length; x++) {
      const index = products.findIndex((item: any) => item.id === items[x].id);
      cartItems.push({ item: products[index], quantity: items[x].quantity, variant: items[x].variant });
    }
    setRenderedItems(cartItems);
  }, [items, products, updateItems]);

  const AddQuantity = (id: string) => {
    let localItems: any = JSON.parse(localStorage.getItem("items")!);
    const index: number = localItems.findIndex((cart: any) => cart.id === id);
    localItems[index].quantity += 1;
    localStorage.setItem("items", JSON.stringify(localItems));
    SetUpdateItems(updateItems + 1);
  };

  const LowerQuantity = (id: string) => {
    let localItems: any = JSON.parse(localStorage.getItem("items")!);
    const index: number = localItems.findIndex((cart: any) => cart.id === id);
    if (localItems[index].quantity < 2) localItems.splice(index, 1);
    else localItems[index].quantity -= 1;
    localStorage.setItem("items", JSON.stringify(localItems));
    SetUpdateItems(updateItems + 1);
  };

  const RemoveFromCart = (id: string) => {
    let items: any = JSON.parse(localStorage.getItem("items")!);
    items.splice(
      items.findIndex((storedItem: any) => storedItem.id === id),
      1
    );
    localStorage.setItem("items", JSON.stringify(items));
    SetUpdateItems(updateItems + 1);
  };

  const Checkout = async () => {

    const localClient = Client.buildClient({
      storefrontAccessToken: process.env.NEXT_PUBLIC_SHOPIFY_STORE_FRONT_ACCESS_TOKEN!,
      domain: process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN!,
    });

    let lineItems = []
    for (let i = 0; i < renderedItems.length; i++){
      if(renderedItems[i].item.variants.some((item: any) => item.title === renderedItems[i].variant))
        lineItems.push({variantId: renderedItems[i].item.variants[renderedItems[i].item.variants.findIndex((item: any) => item.title === renderedItems[i].variant)].id, quantity: renderedItems[i].quantity})
    }

    let checkout = parseShopifyResponse(await localClient.checkout.create())
    checkout = parseShopifyResponse(await localClient.checkout.addLineItems(checkout.id, lineItems))
    router.push(checkout.webUrl)
  }

  if (props) {
    return (
      <>
        <Head>
          <title>Checkout</title>
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="shortcut icon" href="/mad_vibes_logo_favicon.png" />
        </Head>
        <Navbar products={props.products} />
        <section className="w-full min-h-screen flex flex-col justify-center md:flex-row p-4 md:p-10 md:px-20 md:gap-10 mb-8">
          <section className="w-full md:w-1/2 h-[70vh] md:h-[80vh] bg-[#e8eddf] rounded-md p-5 mx-auto flex flex-col justify-between items-center">
            <div className="w-full h-auto overflow-scroll">
              <h1 className="mb-4 text-2xl">Shopping Cart</h1>
              {renderedItems?.map((data: any, i: number) => (
                <div key={i} className="my-4">
                  <div className="flex flex-col w-full">
                    <div className="flex flex-row w-f ull gap-4">
                      <div className="w-24 h-24 overflow-hidden rounded-lg relative">
                        <img
                          src={data.item.images[0].src}
                          className="absolute top-[-9999px] bottom-[-9999px] left-[-9999px] right-[-9999px] m-auto h-auto min-w-full"
                        ></img>
                      </div>
                      <div>
                        <h1 className="text-base md:text-lg">{data.item.title}</h1>
                        <div>
                          <div className="flex flex-row gap-3">
                            <p className="text-base">
                              Quantity: {data.quantity}
                            </p>
                            <div className="flex flex-col">
                              <FontAwesomeIcon
                                icon={faCaretUp}
                                className="h-fit w-fit cursor-pointer hover:text-neutral-500"
                                onClick={() => AddQuantity(data.item.id)}
                                size="xs"
                              />
                              <FontAwesomeIcon
                                icon={faCaretDown}
                                className="h-fit w-fit cursor-pointer hover:text-neutral-500"
                                onClick={() => LowerQuantity(data.item.id)}
                                size="xs"
                              />
                            </div>
                          </div>

                          <p
                            className="text-red-500 text-sm cursor-pointer hover:text-red-300 transition mt-4"
                            onClick={() => RemoveFromCart(data.item.id)}
                          >
                            Remove from Cart
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
            </div>
            {renderedItems < 1 ? (
                <div className=" flex-col items-center justify-center text-center">
                  <h1 className="text-2xl">
                    Uh oh!<br></br>Looks like your cart is empty!
                  </h1>
                  <p className="text-red-500 cursor-pointer hover:text-red-300 underline underline-offset-2" onClick={() => router.push("/collections")}>
                    Back to collections
                  </p>
                </div>
              ) : null}
            <div className="w-full flex md:flex-row flex-col gap-2">
              <button
                className="bg-red-400 text-white w-full p-2 rounded-lg"
                onClick={() => {ClearCart(); window.location.reload()}}
              >
                Clear Cart
              </button>
              <button className="bg-green-400 w-full text-white p-2 rounded-lg" onClick={() => Checkout()}>
                Checkout
              </button>
            </div>
          </section>
        </section>
      </>
    );
  } else {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex flex-col">
          <section className="w-full h-full flex flex-col mt-48 items-center justiy-center text-white">
            <div className="flex flex-col items-center">
              <h1 className="text-4xl font-bold">Uh Oh!</h1>
              <h2 className="text-2xl">
                We were not able to find what you were looking for!
              </h2>
              <p
                className="text-red-400 hover:text-red-200 cursor-pointer w-fit mt-4"
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
  const products = parseShopifyResponse(await shopifyClient.product.fetchAll());
  return {
    props: {
      products: products,
    },
  };
};

export default Checkout;
