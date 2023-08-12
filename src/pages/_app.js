import { Navbar, Navigation } from "@/components";
import { ContextProvider } from "@/context";
import { ChakraProvider } from "@chakra-ui/react";

import NextProgress from "next-progress";

import "../style.css";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="icon" href="project-management.png" sizes="any" />
      </Head>
      <ContextProvider>
        <NextProgress options={{ showSpinner: false, color: "#ffffff" }} />
        <ChakraProvider>
          <Navbar />
          <Component {...pageProps} />
        </ChakraProvider>
      </ContextProvider>
    </>
  );
}
