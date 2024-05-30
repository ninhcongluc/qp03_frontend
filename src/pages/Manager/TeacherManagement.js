import React from "react";
import { Box } from "@mui/material";
import ManageTeacherTable from "../../components/Table/ManageTeacherTable";
import ManagerMenu from "../../components/LeftMenu/ManagerMenu";

const TeacherManagementPage = () => {
  return (
    <div>
      <ManagerMenu />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "2rem",
        }}
      >
        <h1 style={{ marginBottom: "1.5rem" }}>Teacher Account Management</h1>
        <ManageTeacherTable />
      </Box>
    </div>
  );
};

export default TeacherManagementPage;
