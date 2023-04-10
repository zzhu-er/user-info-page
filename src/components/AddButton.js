import {addEmailForUser} from "@component/services/api";
import Button from "@mui/material/Button";
import {Typography} from "@mui/material";

export default function AddButton({userId, emails, onAdd}) {
  async function handleClick() {
    emails = JSON.stringify(
        emails.split(",")
        .map(email => (
            {"email": email.replace(/\s/g, '')})));
    await addEmailForUser({userId, emails});
    onAdd(emails);
  }

  return (
      <Button className="add-button" variant="contained" onClick={handleClick}>
        <Typography variant="button">
          ADD
        </Typography>
      </Button>);
};