import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./error-page";
import "./index.css";
import Contact, {
  loader as contactLoader,
  action as contactAction,
} from "./components/contacts/contact";
import EditContact, { action as editAction } from "./components/contacts/edit";
import { action as destroyAction } from "./components/contacts/destroy";
import { action as addressDestroyAction } from "./components/contacts/addressDestroy";
import Contacts, {
  loader as rootLoader,
  action as rootAction,
} from "./components/contacts";
import Login from "./login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: "contacts/",
    element: <Contacts />,
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
            children: [
              {
                path: ":addressId/destroy",
                action: addressDestroyAction,
              },
            ],
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
  // <React.StrictMode>
  <RouterProvider router={router} />
  // </React.StrictMode>
);
