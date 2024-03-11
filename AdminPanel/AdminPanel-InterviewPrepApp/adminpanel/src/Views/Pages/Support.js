import React, { useState, useEffect } from 'react';
import { ListGroup, Form, Button, Card } from 'react-bootstrap';
import { db } from '../../FireBase/FireBaseConfig';
import { doc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';

const Support = () => {
  const [queries, setQueries] = useState([]);
  const [reply, setReply] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      // Assuming 'Admin' is the collection name and 'CustomerSupport' is the document ID
      const docRef = doc(db, 'Admin', 'CustomerSupport');
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setQueries(data.userReplies || []);
      }
    };

    fetchData();
  }, []);

  const handleReply = async (index) => {
    const updatedQueries = [...queries];
    const docRef = doc(db, 'Admin', 'CustomerSupport');

    // Assuming each userReply object has an 'id'
    const userReply = { id: index + 1, userQuery: updatedQueries[index].userQuery, adminResponse: reply };

    await updateDoc(docRef, {
      userReplies: arrayUnion(userReply),
    });

    updatedQueries[index] = userReply;
    setQueries(updatedQueries);
    setReply('');
  };

  const handleDelete = async (index) => {
    const updatedQueries = [...queries];
    const docRef = doc(db, 'Admin', 'CustomerSupport');

    const deletedQuery = updatedQueries[index];

    // Remove the deleted query from the array
    updatedQueries.splice(index, 1);

    await updateDoc(docRef, {
      userReplies: updatedQueries,
    });

    setQueries(updatedQueries);
  };

  return (
    <div className="bg-white d-flex flex-column align-items-center p-4" style={{ height: '80vh' }}>
      <h2 className="mb-4">Support</h2>
      <Card className="w-100" style={{ overflowY: 'auto' }}>
        <ListGroup variant="flush">
          {queries.map((query, index) => (
            <ListGroup.Item key={index}>
              <div className="mb-3">
                <strong>User Query:</strong> {query.userQuery}
              </div>
              <Form.Group controlId={`reply-${index}`}>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Type your reply..."
                  value={reply} 
                  onChange={(e) => setReply(e.target.value)}
                />
                <Button variant="primary" className="mt-2" onClick={() => handleReply(index)}>
                  Reply
                </Button>
                <Button variant="danger" className="mt-2 ml-2" onClick={() => handleDelete(index)}>
                  Delete
                </Button>
              </Form.Group>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card>
    </div>
  );
};

export default Support;