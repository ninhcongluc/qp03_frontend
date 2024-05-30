import React from "react";
import LeftMenu from "../../components/LeftMenu/AdminMenu";
import ManagerAccountTable from "../../components/Table/ManageAccountTable";
import { Box } from "@mui/material";

const ManagerManagementPage = () => {
  return (
    <div>
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
