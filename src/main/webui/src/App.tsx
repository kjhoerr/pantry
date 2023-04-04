import React from "react";
import { Provider } from "react-redux";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { Footer } from "./components/footer";
import { GlobalToast } from "./components/global-toast";
import { Header } from "./components/header";
import Home from "./pages";
import { store } from "./store";
import "./styles/globals.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
]);

function MyApp() {
  const devMode = process.env.NEXT_PUBLIC_APP_ENV === "development";

  return (
    <Provider store={store}>
      <Header />
      <RouterProvider router={router} />
      <GlobalToast />
      <Footer devMode={devMode} />
    </Provider>
  );
}

export default MyApp;
