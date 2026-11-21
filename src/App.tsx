
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";

import { CartProvider } from "./context/CartContext";
import StoreLayout from "./layouts/StoreLayout";

import HomePage from "./pages/HomePage";
import CollectionsPage from "./pages/CollectionsPage";
import NewArrivalsPage from "./pages/NewArrivalsPage";
import CustomizePage from "./pages/CustomizePage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import ProductPage from "./pages/ProductPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import CheckoutPage from "./pages/CheckoutPage";
import AccountPage from "./pages/AccountPage";
import OrderConfirmationPage from "./pages/OrderConfirmationPage";
import NotFoundPage from "./pages/NotFoundPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <StoreLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "collections", element: <CollectionsPage /> },
      { path: "new-arrivals", element: <NewArrivalsPage /> },
      { path: "products/:productId", element: <ProductPage /> },
      { path: "customize", element: <CustomizePage /> },
      { path: "about", element: <AboutPage /> },
      { path: "contact", element: <ContactPage /> },
      { path: "login", element: <LoginPage /> },
      { path: "signup", element: <SignupPage /> },
      { path: "checkout", element: <CheckoutPage /> },
      { path: "account", element: <AccountPage /> },
      {
        path: "order-confirmation",
        element: <OrderConfirmationPage />,
      },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);

export default function App() {
  return (
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  );
}
