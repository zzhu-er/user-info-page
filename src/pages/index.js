import * as React from 'react';
import Link from "next/link";
import {useState} from "react";
import {Table} from "antd";
import {fetchUsersWithPagination} from "@component/services/api";
import dayjs from "dayjs";

const columns = [
  {
    dataIndex: 'id',
    title: 'ID',
    sorter: (a, b) => a.id - b.id,
    defaultSortOrder: 'ascend',
    render: (text) => <Link href={`userDetail/${text}`}>{text}</Link>
  },
  {
    dataIndex: 'age',
    title: 'Age',
    sorter: (a, b) => a.age - b.age,
  },
  {
    dataIndex: 'name',
    title: 'Full name',
  },
  {
    dataIndex: 'createdAt',
    title: 'Create Time',
  },
  {
    dataIndex: 'updatedAt',
    title: 'Update Time',
  },
];

export default function DataTable({userData}) {
  const [renderData, setRenderData] = useState(userData);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5,
    pageSizeOptions: [5, 10, 15, 20],
    total: 500,
  });

  const handleChange = async (pagination) => {
    const data = await fetchUsersWithPagination(
        {page: pagination.current, size: pagination.pageSize});
    const formatted = data.map(user => (
        {
          ...user,
          createdAt: dayjs(user.createdAt).format("YYYY-MM-DD"),
          updatedAt: dayjs(user.updatedAt).format("YYYY-MM-DD"),
        }));
    setRenderData(formatted);
    setPagination({
      ...pagination,
      current: pagination.current,
      pageSize: pagination.pageSize
    });
  };

  return (
      <div style={{height: "100vh", width: '100%'}}>
        <Table rowKey={record => record.id}
               columns={columns}
               dataSource={renderData}
               pagination={pagination}
               onChange={handleChange}/>
      </div>
  );
}

export async function getStaticProps() {
  const res = await fetch('http://localhost:8080/users?page=0&size=5');
  const rawData = await res.json();
  const userData = rawData.map(user => (
      {
        ...user,
        createdAt: dayjs(user.createdAt).format("YYYY-MM-DD"),
        updatedAt: dayjs(user.updatedAt).format("YYYY-MM-DD"),
      }));

  return {
    props: {userData},
  }
}
