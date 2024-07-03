import React from "react";
import ChangePassword from "../components/ChangePassword/ChangePassword";
import "bootstrap/dist/css/bootstrap.min.css";
import MenuComponent from "../components/LeftMenu/Menu";

const ProfilePage = () => {
  return (
    <div>
      <img
        src="https://it.fpt.edu.vn/wp-content/uploads/2020/05/2017-FPTU-S-01.png"
        alt="FPT Logo"
        style={{ width: "9%", marginLeft: "90%", marginTop: "-6%" }}
      />
      <MenuComponent role="admin" />
      <div
        style={{
          backgroundColor: "#eee",
          transform: "scale(1.1)",
          marginLeft: "35%",
          border: "2px solid rgb(197 194 194 / 0%)",
          borderRadius: "8px",
          maxWidth: "650px",
          marginBottom: "3%",
        }}
        className="form-profile"
      >
        <div
          className="py-5"
          style={{
            justifyContent: "center",
            alignItems: "center",
            padding: "5px",
          }}
        >
          <div className="row">
            <div className="col-lg-4">
              <div className="card mb-4">
                <div className="card-body text-center">
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                    alt="avatar"
                    className="rounded-circle"
                    style={{ width: "150px" }}
                    fluid="true"
                  />
                  <p className="text-muted mb-1">USER</p>
                </div>
              </div>
            </div>
            <div className="col-lg-8">
              <div className="card mb-4">
                <div className="card-body">
                  <div className="row">
                    <div className="col-sm-3">
                      <p>Full Name</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted">Johnatan Smith</p>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p>Email</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted">example@example.com</p>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p>Phone</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted">(097) 234-5678</p>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p>Mobile</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted">(098) 765-4321</p>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p>Address</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted">Bay Area, San Francisco, CA</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ChangePassword />
      </div>
    </div>
  );
};

export default ProfilePage;
