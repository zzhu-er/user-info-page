import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Link from "next/link";

const columns = [
  {
    field: 'id',
    headerName: 'ID',
    sortable: false,
    width: 70,
    renderCell: (params) => (
        <Link href={`userDetail/${params.value}`}>{params.value}</Link>
    ),
  },
  {
    field: 'age',
    headerName: 'Age',
    sortable: false,
    type: 'number',
    width: 90,
  },
  {
    field: 'name',
    headerName: 'Full name',
    sortable: false,
    width: 160,
  },
  {
    field: 'createdAt',
    headerName: 'Create Time',
    sortable: false,
    width: 300,
  },
  {
    field: 'updatedAt',
    headerName: 'Update Time',
    sortable: false,
    width: 300,
  },
];

export default function DataTable({userData}) {
  return (
      <div style={{ height: 900, width: '100%' }}>
        <DataGrid
            rows={userData}
            columns={columns}
            checkboxSelection
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
