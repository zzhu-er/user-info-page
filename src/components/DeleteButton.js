import {deleteEmailFromUser} from "@component/services/api";
import Button from '@mui/material/Button';

export default function DeleteButton({userId, emailId, onDelete}) {
  const handleDelete = async () => {
    const response = await deleteEmailFromUser({userId, emailId});
    onDelete(emailId);
  };

  // return (
  //     <button style={{marginLeft: 20, fontSize: 20}}
  //             onClick={handleDelete}>
  //       Delete
  //     </button>);
  return (
      <Button variant="contained" onClick={handleDelete}>
        Delete
      </Button>);
}