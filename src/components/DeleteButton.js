import {deleteEmailFromUser} from "@component/services/api";
import Button from '@mui/material/Button';
import {Typography} from "@mui/material";

export default function DeleteButton({userId, emailId, onDelete}) {
  const handleDelete = async () => {
    const response = await deleteEmailFromUser({userId, emailId});
    onDelete(emailId);
  };

  return (
      <Button className="delete-button" variant="contained" onClick={handleDelete}>
        <Typography variant="button">
          Delete
        </Typography>
      </Button>);
}