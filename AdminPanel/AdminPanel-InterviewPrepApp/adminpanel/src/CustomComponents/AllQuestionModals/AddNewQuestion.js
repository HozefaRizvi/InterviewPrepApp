import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { db } from '../../FireBase/FireBaseConfig';
import { doc, setDoc ,getDocs,getDoc} from 'firebase/firestore';

const AddQuestionModal = ({ category, title, handleClose, totalQuestions }) => {
  const [newQuestion, setNewQuestion] = useState('');
  const [newAnswer, setNewAnswer] = useState('');
  const handleAdd = async () => {
    try {
      const categoryDocRef = doc(db, 'QuestionBank', category);
      const categoryDoc = await getDoc(categoryDocRef);

      if (categoryDoc.exists()) {
        const updatedSystemBasedQuestions = {
          ...categoryDoc.data().systembasedquestions,
          [`${title}Questions`]: {
            ...categoryDoc.data().systembasedquestions[`${title}Questions`],
            [`question${totalQuestions + 1}`]: newQuestion,
            [`answer${totalQuestions + 1}`]: newAnswer,
          },
        };

        // Set the document in the QuestionBank collection
        await setDoc(categoryDocRef, {
          systembasedquestions: updatedSystemBasedQuestions,
        });
        
        handleClose(); // Close the modal after successful addition
      } else {
        console.error('Category document not found.');
      }
    } catch (error) {
      console.error('Error adding new question:', error);
    }
  };

  return (
    <Modal show={true} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Question</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formQuestion">
            <Form.Label>New Question:</Form.Label>
            <Form.Control
              type="text"
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formAnswer">
            <Form.Label>New Answer:</Form.Label>
            <Form.Control
              type="text"
              value={newAnswer}
              onChange={(e) => setNewAnswer(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleAdd}>
          Add
        </Button>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddQuestionModal;
