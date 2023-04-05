import { Provider } from "react-redux";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { Footer } from "./components/footer";
import { GlobalToast } from "./components/global-toast";
import { Header } from "./components/header";
import { Health } from "./components/health";
import Home from "./pages";
import { store } from "./store";
import "./styles/globals.css";

const devMode = process.env.REACT_APP_ENV === "development";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
]);

function MyApp() {
  return (
    <Provider store={store}>
      <Header />
      <Health />
      <RouterProvider router={router} />
      <GlobalToast />
      <Footer devMode={devMode} />
    </Provider>
  );
}

export default MyApp;
