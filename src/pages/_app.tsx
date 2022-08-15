import "semantic-ui-css/semantic.min.css";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
      {process.env.APP_ENV === "development" ? (<div style={{textAlign: "center", marginTop: "14px"}}><a href="/q/dev/">Visit Quarkus dev page</a></div>) : undefined}
    </QueryClientProvider>
  );
}

export default MyApp;
