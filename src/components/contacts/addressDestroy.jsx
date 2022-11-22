import { redirect } from "react-router-dom";
import { deleteAddress } from "../../services/addressServices";

export async function action({params}) {
    await deleteAddress(params.addressId);
    return redirect(`/contacts/${params.contactId}/edit`)
}