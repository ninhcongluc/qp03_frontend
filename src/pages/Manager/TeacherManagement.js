import React from "react";
import { Box } from "@mui/material";
import ManageTeacherTable from "../../components/Table/ManageTeacherTable";
import ManagerMenu from "../../components/LeftMenu/ManagerMenu";
import "./TeacherManagement.css";

const TeacherManagementPage = () => {
  return (
    <div class="table_manageTeacher">
      <ManagerMenu />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "2rem",
          width: "700px",
        }}
      >
        <h1 style={{ marginBottom: "1.5rem" }}>
          Teacher Information Management
        </h1>
        <ManageTeacherTable />
      </Box>
    </div>
  );
};

export default TeacherManagementPage;
