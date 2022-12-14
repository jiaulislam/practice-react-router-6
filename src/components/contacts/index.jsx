import React from "react";
import { Outlet, Form, useLoaderData, NavLink, useNavigation, redirect } from "react-router-dom";
import { getContacts, createContact } from "../../services/contactServices";

export async function action() {
  const contact = await createContact();
  return redirect(`/contacts/${contact.id}/edit`)
}

export async function loader() {
  const contacts = await getContacts();
  return { contacts };
}

const Contacts = () => {
  const { contacts } = useLoaderData();
  const navigation = useNavigation();

  return (
    <>
      <div id="sidebar">
        <h1>React Router Contacts</h1>
        <div>
          <form role="search" id="search-form">
            <input
              type="search"
              id="q"
              aria-label="Search contacts"
              placeholder="Search"
              name="q"
            />

            <div id="search-spinner" aria-hidden hidden={true} />

            <div className="sr-only" aria-live="polite"></div>
          </form>

          <Form method="post">
            <button type="Submit">New</button>
          </Form>
        </div>
        <nav>
          {contacts.length ? (
            <ul>
              {contacts.map((contact) => (
                <li key={contact.id}>
                  <NavLink
                    to={`${contact.id}`}
                    className={({ isActive, isPending }) =>
                      isActive ? "active" : isPending ? "pending" : ""
                    }
                  >
                    {contact.first || contact.last ? (
                      <>
                        {contact.first} {contact.last}
                      </>
                    ) : (
                      <i>No Name</i>
                    )}{" "}
                    {contact.favorite && <span>★</span>}
                  </NavLink>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>No contacts</i>
            </p>
          )}
        </nav>
      </div>
      <div id="detail" className={
        navigation.state === "loading" ? "loading" : ""
      }>
        <Outlet />
      </div>
    </>
  );
};

export default Contacts;
