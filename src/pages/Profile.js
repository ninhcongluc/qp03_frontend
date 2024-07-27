import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ChangePassword from "../components/ChangePassword/ChangePassword";
import "bootstrap/dist/css/bootstrap.min.css";
import MenuComponent from "../components/LeftMenu/Menu";
import ApiInstance from "../axios";
import "./Profile.css";

const ProfilePage = () => {
  const [userData, setUserData] = useState({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
    avatarUrl: "",
    phoneNumber: "",
    dateOfBirth: "",
    roleName: "",
  });

  const { userId } = useParams();
  console.log(userId);

  // Call API to get profile
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await ApiInstance.get(`/user/profile`);
        const data = response.data.data;
        console.log(data);
        setUserData({
          ...data,
          roleName: data.role.name,
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserData();
  }, [userId]);

  console.log(typeof userData.roleName.name);

  return (
    <div>
      <img
        src="https://it.fpt.edu.vn/wp-content/uploads/2020/05/2017-FPTU-S-01.png"
        alt="FPT Logo"
        style={{ width: "9%", marginLeft: "90%", marginTop: "-6%" }}
      />
      <MenuComponent role={userData.roleName} />
      <div className="form-profile">
        <div className="profile-card py-5">
          <div className="row">
            <div className="col-lg-4">
              <div className="card mb-4">
                <div className="card-body text-center">
                  <img
                    src={
                      userData.avatarUrl ||
                      "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                    }
                    alt="avatar"
                    className="rounded-circle profile-img"
                  />
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
                      <p className="text-muted">
                        {userData.firstName} {userData.lastName}
                      </p>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p>Email</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted">{userData.email}</p>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p>Gender</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted">
                        {userData.gender === 1
                          ? "Male"
                          : userData.gender === 2
                          ? "Female"
                          : "Unknown"}
                      </p>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p>Phone Number</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted">{userData.phoneNumber}</p>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p>Date of Birth</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted">{userData.dateOfBirth}</p>
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
