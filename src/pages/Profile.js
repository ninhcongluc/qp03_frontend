import React, { useState } from "react";
import LeftMenu from "../components/LeftMenu/AdminMenu";
import Modal from "../components/ChangePassword/Modal";
import ChangePassword from "../components/ChangePassword/ChangePassword";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn
} from 'mdb-react-ui-kit';

const ProfilePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <img
        src="https://it.fpt.edu.vn/wp-content/uploads/2020/05/2017-FPTU-S-01.png"
        alt="FPT Logo"
        style={{ width: '9%', marginLeft: '90%', marginTop: '-10%' }}
      />  
         <LeftMenu /> 
      <div
        style={{
          backgroundColor:'#eee',
          transform: 'scale(1.1)',         
          marginLeft: '35%',
          border: '2px solid rgb(197 194 194 / 0%)',                 
          borderRadius: '8px',       
          maxWidth: '650px',                  
          marginBottom: '3%'           
        }}
        className="form-profile"
      >
        
        <MDBContainer className="py-5" style={{ justifyContent: 'center', alignItems: 'center'}}>
          <MDBRow>
            <MDBCol lg="4">
              <MDBCard className="mb-4">
                <MDBCardBody className="text-center">
                  <MDBCardImage
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                    alt="avatar"
                    className="rounded-circle"
                    style={{ width: '150px' }}
                    fluid
                  />
                  <p className="text-muted mb-1">USER</p>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
            <MDBCol lg="8">
              <MDBCard className="mb-4">
                <MDBCardBody>
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Full Name</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">Johnatan Smith</MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Email</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">example@example.com</MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Phone</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">(097) 234-5678</MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Mobile</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">(098) 765-4321</MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Address</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">Bay Area, San Francisco, CA</MDBCardText>
                    </MDBCol>
                  </MDBRow>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
         
        </MDBContainer>
         <MDBBtn
          onClick={handleOpenModal}
          color="primary"
          style={{ width: '27%', marginLeft: '65%', marginTop: '10px', marginBottom: '15px' }}
        >
          Change Password
        </MDBBtn>
        
      </div>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          <ChangePassword onClose={handleCloseModal} />
        </Modal>
    </div>
  );
};

export default ProfilePage;
