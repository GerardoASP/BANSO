import React from 'react';
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBTypography, MDBIcon } from 'mdb-react-ui-kit';
import './Profile.scss';

export default function PersonalProfile() {
  return (
    <section className="vh-100" style={{ backgroundColor: '#f4f5f7' }}>
      <MDBContainer className="py-4 h-100">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol lg="6">
            <MDBCard className="mb-3 shadow" style={{ borderRadius: '.5rem' }}>
              <MDBRow className="g-0">
                <MDBCol md="4" className="gradient-custom text-center text-white d-flex flex-column justify-content-center"
                  style={{ borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem' }}>
                  <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                    alt="Avatar" className="my-3" style={{ width: '80px' }} fluid />
                  <MDBTypography tag="h5" className="mb-0">Marie Horwitz</MDBTypography>
                  <MDBCardText className="mb-2">Web Designer</MDBCardText>
                  <MDBIcon far icon="edit" />
                </MDBCol>
                <MDBCol md="8">
                  <MDBCardBody className="p-3">
                    <MDBTypography tag="h6">Information</MDBTypography>
                    <hr className="my-2" />
                    <MDBRow className="pt-1">
                      <MDBCol size="6" className="mb-2">
                        <MDBTypography tag="h6">Email</MDBTypography>
                        <MDBCardText className="text-muted">info@example.com</MDBCardText>
                      </MDBCol>
                      <MDBCol size="6" className="mb-2">
                        <MDBTypography tag="h6">Phone</MDBTypography>
                        <MDBCardText className="text-muted">123 456 789</MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    <div className="d-flex justify-content-start">
                      <a href="#!"><MDBIcon fab icon="facebook" size="lg" className="me-3" /></a>
                      <a href="#!"><MDBIcon fab icon="twitter" size="lg" className="me-3" /></a>
                      <a href="#!"><MDBIcon fab icon="instagram" size="lg" className="me-3" /></a>
                    </div>
                  </MDBCardBody>
                </MDBCol>
              </MDBRow>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
}
