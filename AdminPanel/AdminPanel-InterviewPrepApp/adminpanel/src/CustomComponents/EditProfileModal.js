// EditProfileModal.js
import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { IonIcon } from '@ionic/react';
import { construct } from 'ionicons/icons';
import { useUser } from '../ReactContextApi/UserContext';
import { db } from '../FireBase/FireBaseConfig';
import { doc, updateDoc,query,where,collection,getDocs } from 'firebase/firestore';
const EditProfileModal = ({ show, onHide }) => {
  const { user } = useUser();
  const { signIn } = useUser();
  const [password, setPassword] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newUsername, setNewUsername] = useState('');

  const handleEdit = async () => {
    try {
      
        const adminQuery = query(collection(db, 'Admin'), where('email', '==', user.email));
        const adminSnapshot = await getDocs(adminQuery);
        
        if (!adminSnapshot.empty) {
          const adminDocRef = adminSnapshot.docs[0].ref;
          await updateDoc(adminDocRef, {
            password, // Implement your password update logic
            email: newEmail, // Implement your email update logic
            username: newUsername, // Implement your username update logic
          });
        }

     
      onHide();
    } catch (error) {
      console.error('Error updating user profile:', error);
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Admin Personal Information</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Enter new password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </Form.Group>
          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Enter new email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} />
          </Form.Group>
          <Form.Group controlId="formUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" placeholder="Enter new username" value={newUsername} onChange={(e) => setNewUsername(e.target.value)} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="success" onClick={handleEdit}>
          <IonIcon icon={construct} style={{ fontSize: '1.2rem' }} /> Edit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditProfileModal;
