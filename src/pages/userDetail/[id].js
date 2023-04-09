import * as React from 'react';
import {useRouter} from "next/router";
import EmailList from "@component/components/EmailList";
import {Typography} from "@mui/material";

export default function UserDetail({data, emailData}) {
  const router = useRouter()
  const {id} = router.query

  return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <Typography variant="h4" gutterBottom>
          User ID: {id}
        </Typography>
        <Typography variant="h4" gutterBottom>Full Name: {data.name}</Typography>
        <Typography variant="h4" gutterBottom>Age: {data.age}</Typography>
        <Typography variant="h4" gutterBottom>Create Time: {data.createdAt}</Typography>
        <Typography variant="h4" gutterBottom>Update Time: {data.updatedAt}</Typography>
        <Typography variant="h4" gutterBottom>Email List:</Typography>
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
