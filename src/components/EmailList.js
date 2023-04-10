import DeleteButton from "@component/components/DeleteButton";
import * as React from "react";
import {useState} from "react";
import AddButton from "@component/components/AddButton";
import {TextField, Typography} from "@mui/material";
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
    setTextFieldValue("");
  };

  const emailList = emails.map((email) => (
      <li key={email.id}
          style={{marginBottom: 10, display: "flex", flexDirection: "row"}}>
        <Typography className="email-content" variant="h6">
          {email.email}
        </Typography>
        <DeleteButton userId={userId}
                      emailId={email.id}
                      onDelete={handleDelete}>
        </DeleteButton>
      </li>));

  return (
      <div style={{width: 500, position: "relative"}}>
        <ul style={{fontSize: 25, paddingLeft: 0}}>{emailList}</ul>
        <div style={{
          display: "flex",
          flexDirection: "row",
        }}>
          <TextField
              id="outlined-multiline-flexible"
              label="Emails to be added"
              multiline
              size="small"
              value={textFieldValue}
              onChange={(e) => {
                setTextFieldValue(e.target.value);
              }}
              style={{width: 400}}
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