import * as React from 'react';
import {useRouter} from "next/router";
import EmailList from "@component/components/EmailList";
import {TextField} from "@mui/material";
import AddButton from "@component/components/AddButton";

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
        <h2>User ID: {id}</h2>
        <h2>Full Name: {data.name}</h2>
        <h2>Age: {data.age}</h2>
        <h2>Create Time: {data.createdAt}</h2>
        <h2>Update Time: {data.updatedAt}</h2>
        <h2>Email List:</h2>
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
