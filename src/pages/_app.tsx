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
        <div id="footer" className="flex justify-center pb-2 flex-grow items-end text-sm">
          <a href="/q/dev/" className="text-gray-400 dark:text-gray-600 hover:text-gray-500">Visit Quarkus dev page</a>
        </div>
      ) : undefined}
    </Provider>
  );
}

export default MyApp;
