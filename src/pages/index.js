import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Link from "next/link";

const columns = [
  {
    field: 'id',
    headerName: 'ID',
    width: 300,
    renderCell: (params) => (
        <Link href={`userDetail/${params.value}`}>{params.value}</Link>
    ),
  },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 300,
  },
  {
    field: 'name',
    headerName: 'Full name',
    width: 300,
  },
  {
    field: 'createdAt',
    headerName: 'Create Time',
    width: 300,
  },
  {
    field: 'updatedAt',
    headerName: 'Update Time',
    width: 300,
  },
];

export default function DataTable({userData}) {
  return (
      <div style={{ height: "100vh", width: '100%' }}>
        <DataGrid
            rows={userData}
            columns={columns}
            checkboxSelection
            sort
        />
      </div>
  );
}

export async function getStaticProps() {
  const res = await fetch('http://localhost:8080/users')
  const userData = await res.json()

  return {
    props: {
      userData,
    },
  }
}
