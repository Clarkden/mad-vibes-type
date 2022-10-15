/* eslint-disable */
import { faBars, faClose } from "@fortawesome/free-solid-svg-icons";
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
        className={`px-4 md:px-10 h-16 bg-[#e8eddf] ${navBarSticky} flex flex-row z-50 transition-all duration-500 relative justify-between`}
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
              className="hover:cursor-pointer hover:text-rose-500 transition"
              key={'Home'}
            >
              Home
            </li>
            <li
              onClick={() => router.push("/collections")}
              className="hover:cursor-pointer hover:text-rose-500 transition"
              key={'Collections'}
            >
              Collections
            </li>
            <li
              onClick={() => router.push("contact")}
              className="hover:cursor-pointer hover:text-rose-500 transition"
              key={'Contact'}
            >
              Contact
            </li>
            <div className="h-8 border-r-2 border-neutral-700"></div>
            <ShoppingBag products={props.products} />
          </ul>
        </div>
        <div className="w-full mx-auto flex flex-row items-center justify-between md:hidden">
          <div
            className="flex flex-row justify-center items-center"
            onClick={() => router.push("/")}
          >
            <img src="/mad_vibes_logo.png" className="h-12 w-[auto]"></img>
          </div>
          <div className="flex flex-row items-center">
            <ShoppingBag products={props.products} />
            <div className="w-5">
              {mobileOpacity === "opacity-0 pointer-events-none" ? (
                <FontAwesomeIcon
                  icon={faBars}
                  className="cursor-pointer active:text-white transition duration-400"
                  onClick={() =>
                    mobileOpacity === "opacity-0 pointer-events-none"
                      ? setMobileOpacity("opacity-100 pointer-events-auto")
                      : setMobileOpacity("opacity-0 pointer-events-none")
                  }
                  size="lg"
                />
              ) : (
                <FontAwesomeIcon
                  icon={faClose}
                  className="cursor-pointer active:text-white transition duration-400"
                  onClick={() =>
                    mobileOpacity === "opacity-0 pointer-events-none"
                      ? setMobileOpacity("opacity-100 pointer-events-auto")
                      : setMobileOpacity("opacity-0 pointer-events-none")
                  }
                  size="lg"
                />
              )}
            </div>
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
            className="hover:cursor-pointer hover:scale-105 transition hover:text-rose-500 text-lg"
            key={'Home1'}
          >
            Home
          </p>
          <p
            onClick={() => {
              setMobileOpacity("opacity-0 pointer-events-none");
              router.push("/collections");
            }}
            className="hover:cursor-pointer hover:scale-105 transition hover:text-rose-500 text-lg"
            key={'Collections1'}
          >
            Collections
          </p>
          <p
            onClick={() => router.push("/contact")}
            className="hover:cursor-pointer hover:scale-105 transition hover:text-rose-500 text-lg"
            key={'Contact1'}
          >
            Contact
          </p>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
