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
      <header className="bg-white dark:bg-gray-700 shadow">
        <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Pantry
          </h1>
        </div>
      </header>
      <Component {...props.pageProps} />
      <GlobalToast />
      {process.env.APP_ENV === "development" ? (
        <div
          id="footer"
          className="flex justify-center pb-2 flex-grow items-end text-sm"
        >
          <a
            href="/q/dev/"
            className="text-gray-400 dark:text-gray-600 hover:text-gray-500"
            target="_blank"
          >
            Visit Quarkus dev page
          </a>
        </div>
      ) : undefined}
    </Provider>
  );
}

export default MyApp;
