import React from "react";
import LeftMenu from "../../components/LeftMenu/AdminMenu";
import ManagerAccountTable from "../../components/Table/ManageAccountTable";
import { Box } from "@mui/material";
import "./ManagerManagement.css";

const ManagerManagementPage = () => {
  return (
    <div>
      <img
        src="https://it.fpt.edu.vn/wp-content/uploads/2020/05/2017-FPTU-S-01.png"
        alt="FPT Logo"
        style={{ width: '9%', marginLeft: '90%', marginTop: '-46%' }}
      />
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
    </div>
    
  );
};

export default ManagerManagementPage;
