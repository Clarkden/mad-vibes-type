/* eslint-disable */
import {
  faCaretUp,
  faCircle,
  faClose,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { parseShopifyResponse, shopifyClient } from "../functions/functions";

const ShoppingBag = (props: any) => {
  const router = useRouter();

  const { products } = props;
  const [menu, setMenu] = useState<string>(
    "opacity-0 translate-x-4 pointer-events-none"
  );
  const [items, setItems] = useState<any>([]);
  const [renderedItems, setRenderedItems] = useState<any>();
  const [updateItems, setUpdateItems] = useState<number>(0);

  useEffect(() => {
    const localItems = JSON.parse(localStorage.getItem("items")!);
    if (localItems) {
      setItems(localItems);
    }
  }, []);

  useEffect(() => {
    let cartItems: any = [];
    if (products) {
      for (let x = 0; x < items.length; x++) {
        const index = products.findIndex(
          (item: any) => item.id === items[x].id
        );
        cartItems.push({ item: products[index], quantity: items[x].quantity });
      }
      setRenderedItems(cartItems);
    }
  }, [items, products]);

  return (
    <>
      <div className="w-10 h-10 md:w-8 md:h-8 relative group">
        <div
          className="w-fit cursor-pointer"
          onClick={() => {
            menu === "opacity-100"
              ? setMenu("opacity-0 translate-x-4 pointer-events-none")
              : setMenu("opacity-100");
          }}
        >
          <img
            src="/shopping_bag.svg"
            className="h-8 md:h-8 hover:cursor-pointer group-hover:scale-105 transition"
          ></img>
        </div>

        {items.length > 0 ? (
          <p
            onClick={() => {
              menu === "opacity-100"
                ? setMenu("opacity-0 translate-x-4 pointer-events-none")
                : setMenu("opacity-100");
            }}
            className="absolute top-1/2 left-1/2 -translate-x-[85%] -translate-y-2/4  md:-translate-x-[18%] md:-translate-y-[17%] m-auto md:-bottom-2 md:-right-2 rounded-full group-hover:scale-105 transition text-sm md:text-xs cursor-pointer"
          >
            <FontAwesomeIcon
              icon={faCircle}
              className="text-neutral-700/75"
              size="xs"
            />
          </p>
        ) : null}
        <div
          className={`absolute left-1/2 -translate-x-56 md:-translate-x-60 top-16 w-[260px] bg-[#e8eddf] max-h-[40vh] h-fit px-4 py-2 rounded-lg ${menu} transition duration-500 drop-shadow-lg`}
        >
          <div className="flex flex-row w-full justify-between items-center">
            <h1 className="font-semibold">Shopping Cart</h1>
            <FontAwesomeIcon
              icon={faClose}
              className="cursor-pointer text-red-400 text-lg"
              onClick={() =>
                setMenu("opacity-0 translate-x-4 pointer-events-none")
              }
            />
          </div>
          {renderedItems?.map((data: any, i: number) => (
            <div key={i} className="my-4">
              <div className="flex flex-col w-full">
                <div className="flex flex-row w-full gap-3 ">
                  <div className="w-[4rem] h-[4rem] max-h-[4rem] max-w-[4rem] relative rounded-lg overflow-hidden">
                    <img
                      src={data.item.images[0].src}
                      className="absolute top-[-9999px] bottom-[-9999px] left-[-9999px] right-[-9999px] m-auto min-h-full min-w-full rounded-lg"
                    ></img>
                  </div>
                  <div className="flex flex-col">
                    <h1 className="text-sm">{data.item.title}</h1>
                    <p className="text-sm text-gray-600">
                      Quantity: {data.quantity}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {items?.length > 0 ? (
            <button
              className="w-full border-rose-500 border-2  bg-rose-500 text-white rounded-lg p-1 transition"
              onClick={() => router.push("/collections/checkout")}
            >
              Visit Checkout
            </button>
          ) : (
            <div className=" flex-col items-center justify-center mt-3">
              <h1 className="text-base">
                Your cart is empty
              </h1>
              <p
                className="text-red-500 text-sm cursor-pointer hover:text-red-300 underline underline-offset-2"
                onClick={() => router.push("/collections")}
              >
                Visit collections
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ShoppingBag;
