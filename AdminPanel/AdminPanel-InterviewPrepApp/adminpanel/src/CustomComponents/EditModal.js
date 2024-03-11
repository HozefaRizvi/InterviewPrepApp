import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { db } from '../FireBase/FireBaseConfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

export default function EditModal({ isOpen, handleClose, user }) {
  const [userData, setUserData] = useState({
    email: '',
    userName: '',
    password: '',
  });

  useEffect(() => {
    const fetchUserData = async () => {
       
      try {
        const userDocRef = doc(db, 'Candidates', user);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const userDataFromFirestore = userDocSnap.data();
          setUserData({
            email: userDataFromFirestore.email,
            userName: userDataFromFirestore.userName,
            password: userDataFromFirestore.password,
          });
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (isOpen) {
      fetchUserData();
    }
  }, [isOpen, user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleEdit = async () => { 
    const userDocRef = doc(db, 'Candidates', user); 
    await updateDoc(userDocRef, {
      Email: userData.email,
      UserName: userData.userName,
      Password: userData.password,
     
    });
    handleClose();
};

  return (
    <Modal show={isOpen} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit User Profile</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              value={userData.email}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              name="userName"
              value={userData.userName}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              value={userData.password}
              onChange={handleInputChange}
            />
          </Form.Group>

          {/* Add other form fields as needed */}

          <Button variant="primary" onClick={handleEdit}>
            Save Changes
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
