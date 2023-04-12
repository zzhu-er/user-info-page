import * as React from 'react';
import {useRouter} from "next/router";
import EmailList from "@component/components/EmailList";
import {StyledEngineProvider, Typography} from "@mui/material";
import dayjs from "dayjs";

export default function UserDetail({data, emailData}) {
  const router = useRouter()
  const {id} = router.query
  const formattedData = {
    ...data,
    createdAt: dayjs(data.createdAt).toDate().toString(),
    updatedAt: dayjs(data.updatedAt).toDate().toString(),
  };

  return (
      <StyledEngineProvider injectFirst>
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
              Full Name: {formattedData.name}</Typography>
            <Typography className="age"
                        variant="h4">Age: {formattedData.age}</Typography>
          </div>
          <div className="time-info">
            <Typography className="create" variant="h6">
              Create Time: {formattedData.createdAt}
            </Typography>
            <Typography className="update" variant="h6">
              Update Time: {formattedData.updatedAt}
            </Typography>
          </div>
          <Typography variant="h4">Email List:</Typography>
          <EmailList userId={id} emailData={emailData}></EmailList>
        </div>
      </StyledEngineProvider>
  );
}

export async function getStaticPaths() {
  const res = await fetch('http://localhost:8080/users')
  const users = await res.json()

  const paths = users.content.content.map((user) => ({
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
