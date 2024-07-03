import React from "react";
import { Box } from "@mui/material";
import ManageSemesterTable from "../../components/Table/ManageSemester";
import MenuComponent from "../../components/LeftMenu/Menu";

const SemesterManagement = () => {
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
        <h1 style={{ marginBottom: "1.5rem" }}>Semester Management</h1>
        <ManageSemesterTable />
      </Box>
    </div>
  );
};

export default SemesterManagement;
