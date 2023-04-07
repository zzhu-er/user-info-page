import {addEmailForUser} from "@component/services/api";
import Button from "@mui/material/Button";

export default function AddButton({userId, emails, onAdd}) {
  async function handleClick() {
    emails = JSON.stringify(
        emails.split(",")
        .map(email => (
            {"email": email})));
    await addEmailForUser({userId, emails});
    onAdd(emails);
  }

  return (
      <Button variant="contained" onClick={handleClick}>
        ADD
      </Button>);
};