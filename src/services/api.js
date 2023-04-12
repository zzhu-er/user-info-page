import axios from "axios";
import {console} from "next/dist/compiled/@edge-runtime/primitives/console";
import dayjs from "dayjs";

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

export async function dynamicFetchUsers({page, size, age, from, name, to}) {
  const specs = {page, size, age, from, name, to};
  const formattedSpecs = {
    ...specs,
    from: (specs.from ? dayjs(specs.from).format("YYYY-MM-DDTHH:mm:ss[Z]") : undefined),
    to: (specs.to ? dayjs(specs.to).format("YYYY-MM-DDTHH:mm:ss[Z]") : undefined)
  }
  console.log(formattedSpecs)
  const uri = Object.entries(formattedSpecs).filter(spec => spec[1] !== undefined).map(
      spec => spec.join("=")).join('&');
  try {
    const res = await axios.get(
        "http://localhost:8080/users?" + uri);
    const data = res.data;
    console.log(data);
    return data;
  } catch (e) {
    console.error(e);
  }
}