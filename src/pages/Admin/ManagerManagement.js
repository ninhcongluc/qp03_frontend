import React from "react";
import ManagerAccountTable from "../../components/Table/ManageAccountTable";
import { Box, Menu } from "@mui/material";
import "./ManagerManagement.css";
import MenuComponent from "../../components/LeftMenu/Menu";

const ManagerManagementPage = () => {
  return (
    <div>
      <MenuComponent role="admin" />
      <div class="form_table">
        <Menu role="admin" />
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
    </div>
  );
};

export default ManagerManagementPage;
