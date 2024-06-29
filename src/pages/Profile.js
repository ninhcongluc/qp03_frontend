import React, { useState, useEffect } from "react";
import ChangePassword from "../components/ChangePassword/ChangePassword";
import "bootstrap/dist/css/bootstrap.min.css";
import MenuComponent from "../components/LeftMenu/Menu";
import ApiInstance from "../axios";

const ProfilePage = ({ role }) => {
  const [userData, setUserData] = useState({ firstName: "", lastName: "" });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await ApiInstance.get("/user/profile");
        setUserData({
          firstName: response.data.data.firstName,
          lastName: response.data.data.lastName,
          email: response.data.data.email,
          phoneNumber: response.data.data.phoneNumber,
          dateOfBirth: response.data.data.dateOfBirth,
          code: response.data.data.code,
          gender:response.data.data.gender,
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, []);
  const getGenderText = (gender) => {
    return gender === 1 ? "Man" : "Woman";
  };

  return (
    <div>
      <img
        src="https://it.fpt.edu.vn/wp-content/uploads/2020/05/2017-FPTU-S-01.png"
        alt="FPT Logo"
        style={{ width: "9%", marginLeft: "90%", marginTop: "-2%" }}
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
                    style={{ width: "150px", marginLeft: '-8px'}}
                    fluid="true"
                  />
                  <p className="text-muted mb-1" style={{width:'200px', marginLeft:'-36px', marginTop:'7px'}}>{userData.firstName} {userData.lastName}</p>
                </div>
              </div>
            </div>
            <div className="col-lg-8">
              <div className="card mb-4">
                <div className="card-body">
                  <div className="row">
                    <div className="col-sm-3">
                      <p>Full Name :</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted">{userData.firstName} {userData.lastName}</p>
                    </div>
                  </div>
                  <hr />

                  <div className="row">
                    <div className="col-sm-3">
                      <p>Code :</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted">{userData.code}</p>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p>Gender :</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted">{getGenderText(userData.gender)}</p>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p>Email :</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted">{userData.email}</p>
                    </div>
                  </div>
                   <hr/>
                   <div className="row">
                    <div className="col-sm-3">
                      <p>Phone :</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted">{userData.phoneNumber}</p>
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
