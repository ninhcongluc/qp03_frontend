import React from "react";
import LeftMenu from "../components/LeftMenu/AdminMenu";
import "bootstrap/dist/css/bootstrap.min.css";

const ProfilePage = () => {
  return (
    <div className="container-fluid d-flex">
      <div className="col-3">
        <LeftMenu />
      </div>
      <div className="col-9 d-flex justify-content-center align-items-center">
        <div className="card mb-4 w-100" style={{ maxWidth: "1000px", minWidth: "800px" }}>
          <div className="card-body d-flex flex-column justify-content-center align-items-center">
            <h2 className="card-title mb-4">Johnatan Smith</h2>
            <div className="d-flex flex-column w-100">
              <div className="d-flex justify-content-between mb-3">
                <span>Email:</span>
                <span>example@example.com</span>
              </div>
              <div className="d-flex justify-content-between mb-3">
                <span>Phone:</span>
                <span>(097) 234-5678</span>
              </div>
              <div className="d-flex justify-content-between mb-3">
                <span>Mobile:</span>
                <span>(098) 765-4321</span>
              </div>
              <div className="d-flex justify-content-between mb-3">
                <span>Address:</span>
                <span>Bay Area, San Francisco, CA</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;