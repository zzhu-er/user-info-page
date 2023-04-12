import * as React from 'react';
import Link from "next/link";
import {useState} from "react";
import {Table} from "antd";
import {
  dynamicFetchUsers
} from "@component/services/api";
import dayjs from "dayjs";
import SearchForm from "@component/components/SearchForm";
import UserStatics from "@component/components/UserStatics";

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

export default function DataTable({userData, userCount}) {
  const [renderData, setRenderData] = useState(userData);
  const [searchMode, setSearchMode] = useState(false);
  const [searchSpecs, setSearchSpecs] = useState({});
  const [userStat, setUserStat] = useState(userCount);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5,
    pageSizeOptions: [5, 10, 15, 20],
    total: userCount,
    showSizeChanger: true,
  });

  const handleChange = async (pagination) => {
    const pageSpecs = {page: pagination.current - 1, size: pagination.pageSize}
    const specs = searchMode ? {...pageSpecs, ...searchSpecs} : pageSpecs;
    const data = await dynamicFetchUsers({...specs});
    const formatted = data["content"].map(user => (
        {
          ...user,
          createdAt: dayjs(user.createdAt).format("YYYY-MM-DD"),
          updatedAt: dayjs(user.updatedAt).format("YYYY-MM-DD"),
        }));
    setRenderData(formatted);
    setPagination({
      ...pagination,
      current: pagination.current,
      pageSize: pagination.pageSize,
    });
  };

  return (
      <div style={{height: "100vh", width: '100%'}}>
        <SearchForm originalData={userData}
                    userCount={userCount}
                    handleUserCount={setUserStat}
                    handleData={setRenderData}
                    pageModel={pagination}
                    handlePage={setPagination}
                    handleSpecs={setSearchSpecs}
                    handleSearchMode={setSearchMode}>
        </SearchForm>
        <Table rowKey={record => record.id}
               columns={columns}
               dataSource={renderData}
               pagination={pagination}
               onChange={handleChange}/>
        <UserStatics value={userStat}></UserStatics>
      </div>
  );
}

export async function getStaticProps() {
  const res = await fetch('http://localhost:8080/users?page=0&size=5');
  const rawData = await res.json();
  const userData = rawData.content.map(user => (
      {
        ...user,
        createdAt: dayjs(user.createdAt).format("YYYY-MM-DD"),
        updatedAt: dayjs(user.updatedAt).format("YYYY-MM-DD"),
      }));
  const userCount = rawData["totalElements"];
  const pageCount = rawData["totalPages"];

  return {
    props: {userData, userCount},
  }
}
