import React, { useState, useEffect } from 'react';
import { Modal, Button, Image } from 'react-bootstrap';
import { db } from '../../FireBase/FireBaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { jsPDF } from 'jspdf';

const ViewPostComponent = ({ postId, handleClose }) => {
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        const postDoc = await getDoc(doc(db, 'Experts', 'ExpertPosts', 'Posts', postId));
        if (postDoc.exists()) {
          setPost(postDoc.data());
        } else {
          console.error('Post not found');
        }
      } catch (error) {
        console.error('Error fetching post details:', error);
      }
    };

    fetchPostDetails();
  }, [postId]);

  const exportToPdf = () => {
    if (!post) {
      return;
    }

    const pdf = new jsPDF();
    pdf.text('Post:', 20, 10);
    pdf.text(`Publisher: ${post.publisher_name}`, 20, 130);
    pdf.text(`Content: ${post.post_content}`, 20, 140);
    pdf.text(`Date: ${post.post_date}`, 20, 160);
    pdf.text(`Likes: ${post.post_likes}`, 20, 170);
    pdf.save(`Post_${postId}.pdf`);
  };

  return (
    <Modal show={true} onHide={handleClose} dialogClassName="custom-modal">
      <Modal.Header closeButton>
        <Modal.Title className="text-center">View Post</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {post && (
          <div>
            <Image src={post.image_url} alt="Post" fluid className="mb-3" style={{ maxWidth: '60%' }} />
            <h5>{post.publisher_name}</h5>
            <p>{post.post_content}</p>
            <div className="d-flex justify-content-between">
              <small>Date: {post.post_date}</small>
              <small>Likes: {post.post_likes}</small>
            </div>
          </div>
        )}
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

export default ViewPostComponent;
