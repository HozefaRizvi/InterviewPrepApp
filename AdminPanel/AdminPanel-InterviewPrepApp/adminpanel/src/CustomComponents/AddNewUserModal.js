import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { db } from '../FireBase/FireBaseConfig';
import { collection, getDocs,addDoc } from 'firebase/firestore';
const AddUserModal = ({ isOpen, isClose }) => {
  const [Email, setEmail] = useState('');
  const [UserName, setUsername] = useState('');
  const [Password, setPassword] = useState('');

  const handleClose = () => {
    isClose();
  };

  const handleAddUser = async () => {
    // Assuming 'db' is your Firestore instance
    const candidatesRef =collection(db, 'Candidates');

    // Add a new document with auto-generated ID
   await addDoc( candidatesRef,{
  
      Email,
      UserName,
      Password,
      isSetupProfile:false
    })
    .then((docRef) => {
      console.log('Document added with ID:', docRef.id);
    })
    .catch((error) => {
      console.error('Error adding document:', error);
    });
    setEmail('');
    setUsername('');
    setPassword('');
    handleClose();
  };

  return (
    <Modal show={isOpen} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              value={UserName}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleAddUser}>
          Add User
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
export default AddUserModal;
