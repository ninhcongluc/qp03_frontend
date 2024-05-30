import React from "react";
import LeftMenu from "../../components/LeftMenu/AdminMenu";
import ManagerAccountTable from "../../components/Table/ManageAccountTable";
import { Box } from "@mui/material";
import "./ManagerManagement.css";
const ManagerManagementPage = () => {
  return (
    <div class="form_table">
      <LeftMenu />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "2rem",
        }}
      >
        <h1 style={{ marginBottom: "1.5rem" }}>Manager Account Management</h1>
        <ManagerAccountTable />
      </Box>
    </div>
  );
};

export default ManagerManagementPage;
