import React, { useState, useEffect } from 'react';
import { Modal, Button, Image } from 'react-bootstrap';
import { db } from '../FireBase/FireBaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { jsPDF } from 'jspdf';

const ViewUserDetailModal = ({ isOpen, isClose, user }) => {
  const [userProfile, setUserProfile] = useState({
    Email: '',
    UserName: '',
    Password: '',
    isSetupProfile: false,
    CGPA: '',
    City: '',
    Country: '',
    Expert: '',
    GivenInterview: '',
    ProfilePic: '',
    University: '',
  });

  const handleClose = () => {
    isClose();
  };

  const exportToPdf = () => {
    const pdf = new jsPDF();
    pdf.text('User Profile', 20, 10);
    pdf.text(`Email: ${userProfile.Email}`, 20, 20);
    pdf.text(`Username: ${userProfile.UserName}`, 20, 30);
    pdf.text(`Password: ${userProfile.Password}`, 20, 40);
    pdf.text(`CGPA: ${userProfile.CGPA}`, 20, 50);
    pdf.text(`City: ${userProfile.City}`, 20, 60);
    pdf.text(`Country: ${userProfile.Country}`, 20, 70);
    pdf.text(`Expert: ${userProfile.Expert}`, 20, 80);
    pdf.text(`Given Interview: ${userProfile.GivenInterview}`, 20, 90);
    pdf.text(`University: ${userProfile.University}`, 20, 100);
    pdf.save('UserProfile.pdf');
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userDocRef = doc(db, 'Candidates', user);
        const userDocSnapshot = await getDoc(userDocRef);

        if (userDocSnapshot.exists()) {
          const userData = userDocSnapshot.data();
          setUserProfile({
            Email: userData.Email || '',
            UserName: userData.UserName || '',
            Password: userData.Password || '',
            isSetupProfile: userData.isSetupProfile || false,
            CGPA: userData.Profile?.CGPA || '',
            City: userData.Profile?.City || '',
            Country: userData.Profile?.Country || '',
            Expert: userData.Profile?.Expert || '',
            GivenInterview: userData.Profile?.GivenInterview || '',
            ProfilePic: userData.Profile?.ProfilePic || '',
            University: userData.Profile?.University || '',
          });
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    if (isOpen) {
      fetchUserProfile();
    }
  }, [isOpen, user]);

  return (
    <Modal show={isOpen} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>User Profile</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <Image src={userProfile.ProfilePic} alt="Profile" roundedCircle style={{ width: '100px', height: '100px', marginBottom: '10px' }} />
          <h4>Email: {userProfile.Email}</h4>
          <h5>Username: {userProfile.UserName}</h5>
          <p>Password: {userProfile.Password}</p>
          <p>CGPA: {userProfile.CGPA}</p>
          <p>City: {userProfile.City}</p>
          <p>Country: {userProfile.Country}</p>
          <p>Expert: {userProfile.Expert}</p>
          <p>Given Interview: {userProfile.GivenInterview}</p>
          <p>University: {userProfile.University}</p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="success" onClick={exportToPdf}>
          Export to PDF
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ViewUserDetailModal;
