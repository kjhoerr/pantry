import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import React from "react";
import { Provider } from "react-redux";

import { Footer } from "../components/footer";
import { Header } from "../components/header";
import { wrapper } from "../store";
import "../styles/globals.css";

const GlobalToast = dynamic(() =>
  import("../components/global-toast").then((i) => i.GlobalToast),
);

function MyApp({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);
  const devMode = process.env.NEXT_PUBLIC_APP_ENV === "development";

  return (
    <Provider store={store}>
      <Header />
      <Component {...props.pageProps} />
      <GlobalToast />
      <Footer devMode={devMode} />
    </Provider>
  );
}

export default MyApp;
