import * as React from 'react';
import {useRouter} from "next/router";
import EmailList from "@component/components/EmailList";
import {Typography} from "@mui/material";

export default function UserDetail({data, emailData}) {
  const router = useRouter()
  const {id} = router.query

  return (
      <div className="user-info"
           style={{
             display: "flex",
             flexDirection: "column",
             justifyContent: "center",
             alignItems: "center",
             height: "100%",
           }}>
        <Typography variant="h4">User ID: {id}</Typography>
        <div className="basic-info">
          <Typography className="name" variant="h4">
            Full Name: {data.name}</Typography>
          <Typography className="age" variant="h4">Age: {data.age}</Typography>
        </div>
        <div className="time-info">
          <Typography className="create" variant="h4">
            Create Time: {data.createdAt}
          </Typography>
          <Typography className="update" variant="h4">
            Update Time: {data.updatedAt}
          </Typography>
        </div>
        <Typography variant="h4">Email List:</Typography>
        <EmailList userId={id} emailData={emailData}></EmailList>
      </div>
  );
}

export async function getStaticPaths() {
  const res = await fetch('http://localhost:8080/users')
  const users = await res.json()

  const paths = users.map((user) => ({
    params: {id: user.id.toString()},
  }))

  return {paths, fallback: false}
}

export async function getStaticProps({params}) {
  const res = await fetch(`http://localhost:8080/users/${params.id}`)
  const data = await res.json()
  const emailRes = await fetch(
      `http://localhost:8080/users/${params.id}/emails`)
  const emailData = await emailRes.json()

  return {props: {data, emailData}}
}
