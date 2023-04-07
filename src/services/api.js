import axios from "axios";
import {console} from "next/dist/compiled/@edge-runtime/primitives/console";

export async function deleteEmailFromUser({userId, emailId}) {
  try {
    const response = await axios.delete(
        `http://localhost:8080/users/${userId}/emails/${emailId}`);
    console.info(response);
  } catch (error) {
    console.error(error);
  }
}

export async function addEmailForUser({userId, emails}) {
  try {
    const headers = {
      'Content-Type': 'application/json',
    };
    const res = await axios.post(`http://localhost:8080/users/${userId}/emails`,
        emails, {headers});
    console.info(res);
  } catch (error) {
    console.error(error)
  }
}

export async function fetchEmailsFromUser({userId}) {
  try {
    const res = await axios.get(`http://localhost:8080/users/${userId}/emails`);
    const data = res.data;
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
}