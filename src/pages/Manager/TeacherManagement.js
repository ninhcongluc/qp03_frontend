import React from "react";
import { Box } from "@mui/material";
import ManageTeacherTable from "../../components/Table/ManageTeacherTable";
import "./TeacherManagement.css";
import MenuComponent from "../../components/LeftMenu/Menu";

const TeacherManagementPage = () => {
  return (
    <div class="table_manageTeacher">
      <MenuComponent role="manager" />
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
