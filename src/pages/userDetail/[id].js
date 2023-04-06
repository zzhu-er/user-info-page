import * as React from 'react';
import {useRouter} from "next/router";

export default function UserDetail({ data, emailData }) {
  const router = useRouter()
  const { id } = router.query
  let counter = 1;
  const emailList = emailData.map(email => <li key={counter++}>{email.email}</li>);
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
        <ul>{emailList}</ul>
      </div>
  );
}

export async function getStaticPaths() {
  const res = await fetch('http://localhost:8080/users')
  const users = await res.json()

  const paths = users.map((user) => ({
    params: { id: user.id.toString() },
  }))

  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  // Fetch data from external API
  const res = await fetch(`http://localhost:8080/users/${params.id}`)
  const data = await res.json()
  const emailRes = await fetch(`http://localhost:8080/users/${params.id}/emails`)
  const emailData = await emailRes.json()

  // Pass data to the page via props
  return { props: { data, emailData } }
}
