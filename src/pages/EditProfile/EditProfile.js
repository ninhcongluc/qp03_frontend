import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import MenuComponent from "../../components/LeftMenu/Menu";
import ApiInstance from "../../axios";
import Button from '@material-ui/core/Button';

const EditProfile = () => {
  const [userData, setUserData] = useState({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    dateOfBirth: "",
    code: "",
    gender: "",
  });

  const fetchUserData = async () => {
    try {
      const response = await ApiInstance.get("/user/profile");
      setUserData({
        id: response.data.data.id,
        firstName: response.data.data.firstName,
        lastName: response.data.data.lastName,
        email: response.data.data.email,
        phoneNumber: response.data.data.phoneNumber,
        dateOfBirth: response.data.data.dateOfBirth,
        code: response.data.data.code,
        gender: response.data.data.gender,
      });
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };


  useEffect(() => {
    fetchUserData();
  }, []);

  const getGenderText = (gender) => {
    return gender === 1 ? "Man" : "Woman";
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleUpdateProfile = async (userData) => {
    try {
      await ApiInstance.put(`/profile/updateProfile/${userData.id}`, userData);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Error updating profile");
    }
  };


  return (
    <div>
      <img
        src="https://it.fpt.edu.vn/wp-content/uploads/2020/05/2017-FPTU-S-01.png"
        alt="FPT Logo"
        style={{ width: "9%", marginLeft: "90%", marginTop: "2%" }}
      />
      <MenuComponent role="admin" />
      <div
        style={{
          backgroundColor: "#eee",
          marginLeft: "28%",
          border: "2px solid rgb(197 194 194 / 0%)",
          borderRadius: "8px",
          maxWidth: "800px",
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
                    style={{ width: "150px", marginLeft: "-8px" }}
                    fluid="true"
                  />
                  <p
                    className="text-muted mb-1"
                    style={{ width: "200px", textAlign: "center" }}
                  >
                    {userData.firstName} {userData.lastName}
                  </p>
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
                      <input
                        type="text"
                        name="firstName"
                        value={userData.firstName}
                        onChange={handleInputChange}
                        className="form-control"
                      />
                      <input
                        type="text"
                        name="lastName"
                        value={userData.lastName}
                        onChange={handleInputChange}
                        className="form-control mt-2"
                      />
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
                      <p>Birth: </p>
                    </div>
                    <div className="col-sm-9">
                      <input
                        type="date"
                        name="dateOfBirth"
                        value={userData.dateOfBirth}
                        onChange={handleInputChange}
                        className="form-control"
                      />
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
                      <p>{userData.email}</p>

                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p>Phone :</p>
                    </div>
                    <div className="col-sm-9">
                      <input
                        type="text"
                        name="phoneNumber"
                        value={userData.phoneNumber}
                        onChange={handleInputChange}
                        className="form-control"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Button
            variant="contained"
            color="primary"
            style={{ width: '26%', marginLeft: '70%', marginBottom: '-59px' }}
            onClick={handleUpdateProfile(userData.id)}
          >
            Save
          </Button>
        </div>

      </div>

    </div>
  );
};

export default EditProfile;
