import { Table } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Layout from "../../components/Layout";
import { hideLoading, showLoading } from "../../redux/alertsSlice";

function UsersList() {
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();

  const getUserData = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.get("/api/admin/get-all-users", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      dispatch(hideLoading());
      if (response.data.success) {
        setUsers(response.data.data);
      }
    } catch (error) {
      dispatch(hideLoading());
    }
  };

  useEffect(() => {
    getUserData()
  }, [])

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dateIndex: "email",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          <h1 className="anchor">Block</h1>
        </div>
      ),
    },
  ];

  return (
    <Layout>
      <h1 className="page-title">Users List</h1>
      <hr />
      <Table columns={columns} dataSource={users}/>
    </Layout>
  );
}

export default UsersList;
