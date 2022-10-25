import "../styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import { SessionProvider } from "next-auth/react";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <ChakraProvider>
      <SessionProvider session={session}>
        <div className="min-h-screen bg-gray-100">
          <Component {...pageProps} />
        </div>
      </SessionProvider>
    </ChakraProvider>
  );
}
