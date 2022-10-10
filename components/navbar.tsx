/* eslint-disable */
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { shopifyClient } from "../functions/functions";
import ShoppingBag from "./shoppingbag";

const Navbar = (props: any) => {
  const router = useRouter();

  const [scrollPosition, setScrollPosition] = useState(0);
  const [navBarSticky, setNavBarSticky] = useState("");
  const [mobileOpacity, setMobileOpacity] = useState(
    "opacity-0 pointer-events-none"
  );

  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    if (scrollPosition < 100) setNavBarSticky("opacity-100 block");
    else if (scrollPosition > 99 && scrollPosition < 399)
      setNavBarSticky("opacity-0");
    else if (scrollPosition > 399 && scrollPosition < 600)
      setNavBarSticky("opacity-0 sticky top-0 transition duration-500");
    else setNavBarSticky("opacity-100 sticky top-0 transition duration-500");

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollPosition]);

  return (
    <>
      <nav
        className={`px-4 md:px-10 h-14 bg-[#e8eddf] ${navBarSticky} flex flex-row z-50 transition-all duration-500 relative justify-between`}
      >
        <div
          className="w-fit hidden md:flex flex-row justify-center items-center cursor-pointer"
          onClick={() => router.push("/")}
        >
          <img src="/mad_vibes_logo.png" className="h-12 w-[auto]"></img>
        </div>
        <div className="w-fit hidden md:flex flex-row justify-center items-center">
          <ul className="flex flex-row gap-4 items-center ">
            <li
              onClick={() => router.push("/")}
              className="hover:cursor-pointer hover:scale-105 transition"
            >
              Home
            </li>
            <li
              onClick={() => router.push("/collections")}
              className="hover:cursor-pointer hover:scale-105 transition"
            >
              Collections
            </li>
            <li className="hover:cursor-pointer hover:scale-105 transition">
              Contact
            </li>
            <div className="h-8 border-r-2 border-neutral-700"></div>
            <ShoppingBag products={props.products} />
          </ul>
        </div>
        {/* <div className="hidden md:flex flex-row gap-2 w-1/3 justify-center items-center">
          
          <img
            src="/search.svg"
            className="h-8 hover:cursor-pointer hover:scale-105 transition"
          ></img>
        </div> */}
        <div className="w-full mx-auto flex flex-row items-center justify-between md:hidden">
          <div className="flex flex-row justify-center items-center">
            <img src="mad_vibes_logo.png" className="h-12 w-[auto]"></img>
          </div>
          <div className="flex flex-row items-center">
            <ShoppingBag products={props.products} />
            <FontAwesomeIcon
              icon={faBars}
              className="cursor-pointer active:text-white transition duration-400"
              onClick={() =>
                mobileOpacity === "opacity-0 pointer-events-none"
                  ? setMobileOpacity("opacity-100 pointer-events-auto")
                  : setMobileOpacity("opacity-0 pointer-events-none")
              }
            />
          </div>
        </div>
        <div
          className={`absolute w-full top-[98%] left-0 md:hidden flex flex-col gap-2 items-end py-3 px-4 bg-[#e8eddf] ${mobileOpacity} transition duration-500 `}
        >
          <p
            onClick={() => {
              setMobileOpacity("opacity-0 pointer-events-none");
              router.push("/");
            }}
            className="hover:cursor-pointer hover:scale-105 transition"
          >
            Home
          </p>
          <p
            onClick={() => {
              setMobileOpacity("opacity-0 pointer-events-none");
              router.push("/collections");
            }}
            className="hover:cursor-pointer hover:scale-105 transition"
          >
            Collections
          </p>
          <p className="hover:cursor-pointer hover:scale-105 transition">
            Contact
          </p>
        </div>
      </nav>
      <div className="fixed bottom-8 right-5 z-10 md:hidden">
        <div className="w-16 h-16 bg-[#e8eddf] rounded-full flex flex-row items-center justify-center">
          <ShoppingBag />
        </div>
      </div>
    </>
  );
};

export default Navbar;
