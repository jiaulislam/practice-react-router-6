import {
  Form,
  useLoaderData,
  redirect,
  useNavigate,
  useFetcher,
} from "react-router-dom";
import { updateContact } from "../../services/contactServices";
import { createAddress } from "../../services/addressServices";

import Address from "../contacts/address";

export async function action({ request, params }) {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  if (updates._intent === "contact") {
    await updateContact(params.contactId, updates);
    return redirect(`/contacts/${params.contactId}`);
  } else if (updates._intent === "address") {
    const address = await createAddress(params.contactId);
  }
}

export default function EditContact() {
  const [contact, addresses] = useLoaderData();
  const fetcher = useFetcher();
  const navigate = useNavigate();

  return (
    <>
      <Form method="post" id="contact-form">
        <p>
          <span>Name</span>
          <input
            placeholder="First"
            aria-label="First name"
            type="text"
            name="first"
            defaultValue={contact.first}
          />
          <input
            placeholder="Last"
            aria-label="Last name"
            type="text"
            name="last"
            defaultValue={contact.last}
          />
        </p>
        <label>
          <span>Twitter</span>
          <input
            type="text"
            name="twitter"
            placeholder="@jack"
            defaultValue={contact.twitter}
          />
        </label>
        <label>
          <span>Avatar URL</span>
          <input
            placeholder="https://example.com/avatar.jpg"
            aria-label="Avatar URL"
            type="text"
            name="avatar"
            defaultValue={contact.avatar}
          />
        </label>
        <label>
          <span>Notes</span>
          <textarea name="notes" defaultValue={contact.notes} rows={6} />
        </label>
        <p>
          <span></span>
          <input
            style={{ all: "unset" }}
            type="hidden"
            name="_intent"
            value="contact"
          />
        </p>
        <p>
          <button type="submit">Save</button>
          <button
            type="button"
            onClick={() => {
              navigate(-1);
            }}
          >
            Cancel
          </button>
        </p>
      </Form>

      {addresses.length < 2 && (
        <fetcher.Form method="post">
          <p
            style={{
              display: "flex",
              justifyContent: "end",
              alignItems: "center",
            }}
          >
            <span>
              <button type="submit">CREATE</button>
            </span>
            <input type="hidden" value="address" name="_intent" />
          </p>
        </fetcher.Form>
      )}
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {addresses.length ? (
            <Address rows={addresses} />
          ) : (
            <p>No Address Found !</p>
          )}
        </div>
      </div>
    </>
  );
}
