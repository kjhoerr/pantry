import "../styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { Provider } from "react-redux";
import { wrapper } from "../store";
import { GlobalToast } from "../components";

const queryClient = new QueryClient();

function MyApp({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <Component {...props.pageProps} />
        <GlobalToast />
        {process.env.APP_ENV === "development" ? (
          <div style={{ textAlign: "center", marginTop: "14px" }}>
            <a href="/q/dev/">Visit Quarkus dev page</a>
          </div>
        ) : undefined}
      </Provider>
    </QueryClientProvider>
  );
}

export default MyApp;
