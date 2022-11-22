import React from "react";
import { Form } from "react-router-dom";

const Address = ({ rows }) => {
  return (
    <table style={{width: "100%"}}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Contact ID</th>
          <th>Created At</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => {
          return (
            <tr key={row.id}>
              <td style={{textAlign: "center"}}>{row.id}</td>
              <td style={{textAlign: "center"}}>{row.contactId}</td>
              <td style={{textAlign: "center"}}>{new Date(row.createdAt).toISOString()}</td>
              <td style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
                <Form
                  method="post"
                  action={row.id + "/" + "destroy"}
                  onSubmit={(event) => {
                    if (
                      !confirm("Please confirm you want to delete this record.")
                    ) {
                      event.preventDefault();
                    }
                  }}
                >
                  <button type="submit">Delete</button>
                </Form>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Address;
