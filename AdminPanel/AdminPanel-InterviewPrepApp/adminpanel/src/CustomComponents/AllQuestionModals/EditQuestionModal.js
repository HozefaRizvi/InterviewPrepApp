import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { db } from '../../FireBase/FireBaseConfig';
import { doc, updateDoc, getDoc } from 'firebase/firestore';

const EditQuestionModal = ({ question, answer, index, totalQuestions, category, title, handleClose }) => {
  const [editedQuestion, setEditedQuestion] = useState(question);
  const [editedAnswer, setEditedAnswer] = useState(answer);

  const handleUpdate = async () => {
    try {
      const categoryDocRef = doc(db, 'QuestionBank', category);
      const categoryDoc = await getDoc(categoryDocRef);

      if (categoryDoc.exists()) {
        const updatedSystemBasedQuestions = {
          ...categoryDoc.data().systembasedquestions,
          [`${title}Questions`]: {
            ...categoryDoc.data().systembasedquestions[`${title}Questions`],
            [`question${index}`]: editedQuestion,
            [`answer${index}`]: editedAnswer,
          },
        };

        // Update the document in the QuestionBank collection
        await updateDoc(categoryDocRef, {
          systembasedquestions: updatedSystemBasedQuestions,
        });

        handleClose(); // Close the modal after successful update
      } else {
        console.error('Category document not found.');
      }
    } catch (error) {
      console.error('Error updating document:', error);
    }
  };

  return (
    <Modal show={true} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Question</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formQuestion">
            <Form.Label>Edited Question:</Form.Label>
            <Form.Control
              type="text"
              value={editedQuestion}
              onChange={(e) => setEditedQuestion(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formAnswer">
            <Form.Label>Edited Answer:</Form.Label>
            <Form.Control
              type="text"
              value={editedAnswer}
              onChange={(e) => setEditedAnswer(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleUpdate}>
          Update
        </Button>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditQuestionModal;
