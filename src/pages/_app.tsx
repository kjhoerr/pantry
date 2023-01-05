import type { AppProps } from "next/app";
import React from "react";
import { Provider } from "react-redux";

import { GlobalToast } from "../components";
import { wrapper } from "../store";
import "../styles/globals.css";

function MyApp({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);
  return (
    <Provider store={store}>
      <Component {...props.pageProps} />
      <GlobalToast />
      {process.env.APP_ENV === "development" ? (
        <div className="text-center mt-5">
          <a href="/q/dev/">Visit Quarkus dev page</a>
        </div>
      ) : undefined}
    </Provider>
  );
}

export default MyApp;
