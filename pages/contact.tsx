/* eslint-disable */

import { faCheck, faCheckCircle, faPaperPlane, faShare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { useRef, useState } from "react";
import Navbar from "../components/navbar";
import { parseShopifyResponse, shopifyClient } from "../functions/functions";
import nodemailer from "nodemailer";

const Contact = (props: any) => {
  const [firstName, setFirstName] = useState<string>();
  const [lastName, setLastName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [message, setMessage] = useState<string>();

  const [submissionError, setSubmissionError] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const contact = (event: any) => {
    event.preventDefault();
    if (!firstName || !lastName || !email || !message) setSubmissionError(true);
    else {
      fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: firstName,
          lastName: lastName,
          email: email,
          message: message,
        }),
      }).then((response) => {
        if(response.ok){
          setSubmitted(true); 
          setSubmissionError(false);
        }
      });
    }
  };

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
      <Navbar products={props.products} />
      <main className="min-h-[90vh] flex flex-row justify-center items-center">
        <div className="w-10/12 mx-autop md:w-1/3 bg-neutral-800 rounded-lg h-fit flex flex-col items-start p-5">
          <h1 className="text-lg md:text-2xl text-white">Contact</h1>
          {!submitted ? (
            <>
              <p className="text-green-300 text-sm md:text-lg">
                Need some help? Drop us a message!
              </p>
              {submissionError ? (
                <h1 className="text-rose-500">
                  Could not submit! Make sure all fields are completed.
                </h1>
              ) : null}
              <form
                className="flex flex-col w-full mt-4"
                onSubmit={(event) => contact(event)}
              >
                <div className="w-full flex flex-col md:flex-row gap-3">
                  <div className="flex flex-col w-full md:w-1/2">
                    <label className="text-white mb-1 text-base md:text-lg">
                      First Name
                    </label>
                    <input
                      type="text"
                      className="w-full rounded-md p-1 outline-none caret-white text-white"
                      id="firstName"
                      name="firstName"
                      onChange={(event) => setFirstName(event.target.value)}
                    />
                  </div>
                  <div className="flex flex-col w-full md:w-1/2">
                    <label className="text-white mb-1 text-base md:text-lg">
                      Last Name
                    </label>
                    <input
                      type="text"
                      className="w-full rounded-md p-1 outline-none caret-white text-white"
                      id="lastName"
                      name="lastName"
                      onChange={(event) => setLastName(event.target.value)}
                    />
                  </div>
                </div>
                <div className="flex flex-col w-full mt-3">
                  <label className="text-white mb-1 text-base md:text-lg">
                    Email
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-md p-1 outline-none caret-white text-white"
                    id="email"
                    name="email"
                    onChange={(event) => setEmail(event.target.value)}
                  />
                </div>
                <div className="flex flex-col w-full mt-3">
                  <label className="text-white mb-1 text-base md:text-lg">
                    Message
                  </label>
                  <textarea
                    className="w-full rounded-md p-1 outline-none caret-white resize-none h-20 md:h-32 text-white"
                    id="message"
                    name="message"
                    onChange={(event) => setMessage(event.target.value)}
                  />
                </div>
                <button className="w-full mt-6 p-2 text-black rounded-lg bg-[#e8eddf] hover:text-white hover:bg-rose-500 transition">
                  Contact <FontAwesomeIcon icon={faPaperPlane} />{" "}
                </button>
              </form>
            </>
          ) : (
            <div className="w-full flex flex-col items-center justify-center mt-8 mb-8">
            <h1 className="text-white text-xl">Your message was successfuly sent!</h1>
              <FontAwesomeIcon icon={faCheckCircle} className="text-green-500 text-4xl md:text-5xl mt-3" />
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const products: any = parseShopifyResponse(
    await shopifyClient.product.fetchAll()
  );

  return {
    props: {
      products: products,
    },
  };
};

export default Contact;
