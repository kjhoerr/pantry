import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import React from "react";
import { Provider } from "react-redux";

import { Header } from "../components/header";
import { Footer } from "../components/footer";
import { wrapper } from "../store";
import "../styles/globals.css";

const GlobalToast = dynamic(() =>
  import("../components/global-toast").then((i) => i.GlobalToast),
);

const devMode = process.env.APP_ENV === "development";

function MyApp({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);
  return (
    <Provider store={store}>
      <Header />
      <Component {...props.pageProps} />
      <GlobalToast />
      <Footer devMode />
    </Provider>
  );
}

export default MyApp;
