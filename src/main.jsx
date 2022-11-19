import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./error-page";
import "./index.css";
import Contact, {
  loader as contactLoader,
  action as contactAction,
} from "./routes/contact";
import EditContact, { action as editAction } from "./routes/edit";
import { action as destroyAction } from "./routes/destroy";
import Root, {
  loader as rootLoader,
  action as rootAction,
} from "./routes/root";
import Home from "./home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "contacts/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          {
            path: ":contactId",
            element: <Contact />,
            loader: contactLoader,
            action: contactAction,
          },
          {
            path: ":contactId/edit",
            element: <EditContact />,
            loader: contactLoader,
            action: editAction,
          },
          {
            path: ":contactId/destroy",
            action: destroyAction,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
