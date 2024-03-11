import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../../FireBase/FireBaseConfig';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { IonIcon } from '@ionic/react';
import { person, construct, mail, trash, eye, chatbubble } from 'ionicons/icons';

//Modals
import ViewPostComponent from '../../CustomComponents/PostComponent/PostComponent';

const AddQuestion = () => {
  const [posts, setPosts] = useState([]);

  //States for View Modal
  const [showPostModal, setShowPostModal] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'Experts', 'ExpertPosts', 'Posts'));
        const postsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setPosts(postsData);
        console.log(postsData);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  //Delete Post Functions
  const handleDelete = async (postId) => {
    try {
      await deleteDoc(doc(db, 'Experts', 'ExpertPosts', 'Posts', postId));
      setPosts(prevPosts => prevPosts.filter(post => post.id !== postId));
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  //ViewPost Modal Functions
  const handleOpenPostModal = (postId) => {
    setSelectedPostId(postId);
    setShowPostModal(true);
  };
  const handleClosePostModal = () => {
    setSelectedPostId(null);
    setShowPostModal(false);
  };
  
  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Expert Posts</h1>
      <div className="row">
        {posts.map((post, index) => (
          <div className="col-md-4 mb-4" key={index}>
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">Publisher: {post.publisher_name}</h5>
                <p className='card-content'>
                  {post.post_content.length > 30
                    ? `${post.post_content.substring(0, 15)}...`
                    : post.post_content}
                </p>
              </div>
              <div className="card-footer" >
                <small className="text-muted">Date: {post.post_date}</small>
                <br />
                <small className="text-muted">Likes: {post.post_likes}</small>
                <small className="ml-2 text-muted "> <span className="text-danger">Reports:{post.post_reports}</span></small>
                <div className="mt-2" >
                  <button className="btn btn-danger" onClick={() => handleDelete(post.id)} style={{margin:4}}> 
                    <IonIcon icon={trash} /> 
                  </button>
                  <button className="btn btn-primary"  style={{margin:4}} onClick={() => handleOpenPostModal(post.id)}> 
                    <IonIcon icon={eye} /> 
                  </button>              
                </div>
              </div>
            </div>
            {showPostModal && (
                <ViewPostComponent postId={selectedPostId} handleClose={handleClosePostModal} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddQuestion;
