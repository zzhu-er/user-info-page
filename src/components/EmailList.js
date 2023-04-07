import DeleteButton from "@component/components/DeleteButton";
import * as React from "react";
import {useState} from "react";
import AddButton from "@component/components/AddButton";
import {TextField} from "@mui/material";
import {fetchEmailsFromUser} from "@component/services/api";

export default function EmailList({userId, emailData}) {
  const [emails, setEmails] = useState(emailData);
  const [textFieldValue, setTextFieldValue] = useState("");

  const handleDelete = (deletedEmailId) => {
    setEmails(emails.filter(email => email.id !== deletedEmailId));
  };

  const handleAdd = async () => {
    const newEmails = await fetchEmailsFromUser({userId});
    setEmails(newEmails);
  };

  const emailList = emails.map((email) => (
      <li key={email.id}
          style={{marginBottom: 10}}>
        {email.email}
        <DeleteButton userId={userId}
                      emailId={email.id}
                      onDelete={handleDelete}>
        </DeleteButton>
      </li>));

  return (
      <div>
        <ul style={{fontSize: 25}}>{emailList}</ul>
        <div style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignContent: "center"
        }}>
          <TextField
              style={{marginRight: 10}}
              id="outlined-multiline-flexible"
              label="Multiline"
              multiline
              value={textFieldValue}
              onChange={(e) => {
                setTextFieldValue(e.target.value);}}
          />
          <AddButton
              userId={userId}
              emails={textFieldValue}
              onAdd={handleAdd}>
          </AddButton>
        </div>
      </div>
  );
};