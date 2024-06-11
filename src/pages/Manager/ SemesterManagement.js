import React from "react";
import { Box } from "@mui/material";
import ManagerMenu from "../../components/LeftMenu/ManagerMenu";
import ManageSemesterTable from "../../components/Table/ManageSemester";

const SemesterManagement = () => {
  return (
    <div class="table_manageTeacher">
      <ManagerMenu />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "2rem",
        }}
      >
        <h1 style={{ marginBottom: "1.5rem" }}>Semester Management</h1>
        <ManageSemesterTable />
      </Box>
    </div>
  );
};

export default SemesterManagement;
