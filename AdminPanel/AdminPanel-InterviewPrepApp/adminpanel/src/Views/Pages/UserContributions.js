import React, { useState, useEffect } from 'react';

import { db } from '../../FireBase/FireBaseConfig';
import { IonIcon } from '@ionic/react'; 
import { trashBin,eye} from 'ionicons/icons';
import { collection, getDocs, deleteDoc, doc,where,query ,limit} from 'firebase/firestore';
const UserContributions = () => {
  const [contributions, setContributions] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedComments, setSelectedComments] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchData = async () => {
    if (!selectedCategory) return;

    try {
      const querySnapshot = await getDocs(collection(db, 'QuestionBank', selectedCategory, 'userbasedquestions'));
      const data = querySnapshot.docs.map(doc => doc.data());
      setContributions(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedCategory]);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleCommentButtonClick = (comments) => {
    setSelectedComments(comments);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  //Delete Function
  const handleDelete = async (Question) => {
    try {
      const q = query(collection(db, 'QuestionBank', selectedCategory, 'userbasedquestions'), where('Question', '==', Question), limit(1));
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach(async (doc) => {
        await deleteDoc(doc.ref);
      });

      fetchData();
    } catch (error) {
      console.error('Error deleting Question:', error);
    }
  };
  return (
    <div className="bg-white min-vh-100 d-flex flex-column  p-4">
      <h2>User Contributions</h2>
      <div className="mb-3">
        <label htmlFor="categoryDropdown" className="form-label">Choose Category:</label>
        <select
          id="categoryDropdown"
          className="form-select"
          style={{height:"50%",width:'50%'}}
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          <option value="">Select Category</option>
          <option value="CRM Project Manager">CRM Project Manager</option>
          <option value="Devops Engineer">DevOps Engineer</option>
          <option value="Quality Assurance Engineer">Quality Assurance Engineer</option>
          <option value="Security Engineer">Security Engineer</option>
          <option value="Software Integration Engineer">Software Integration Engineer</option>
        </select>
      </div>

      <div className="table-container" style={{ height: '400px', width: '80%', overflow: 'auto', borderRadius: '10px' }}>
        <table className="table table-sm table-dark">
          <thead>
            <tr className="table-dark">
              <th scope="col">Question</th>
              <th scope="col">Answer</th>
              <th scope="col">ChoosenType</th>
              <th scope="col">Comments</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {contributions.map((contribution, index) => (
              <tr key={index} className="table-light">
                <td>
                  {contribution.Question && contribution.Question.length > 15 ? (
                    <span title={contribution.Question}>{contribution.Question.substring(0, 15)}...</span>
                  ) : (
                    contribution.Question
                  )}
                </td>
                <td>
                  {contribution.Answer && contribution.Answer.length > 15 ? (
                    <span title={contribution.Answer}>{contribution.Answer.substring(0, 15)}...</span>
                  ) : (
                    contribution.Answer
                  )}
                </td>
                <td>{contribution.ChoosenType}</td>
                <td>
                  {contribution.Comments && contribution.Comments.length > 0 ? (
                    <button
                      type="button"
                      className="btn btn-success"
                      data-bs-toggle="modal"
                      data-bs-target="#commentsModal"
                      onClick={() => handleCommentButtonClick(contribution.Comments)}
                    >
                      View Comments
                    </button>
                  ) : (
                    'No Comments'
                  )}
                </td>
                <td>
                <button className="btn btn-danger me-2" onClick={()=>handleDelete(contribution.Question)} >
                    <IonIcon icon={trashBin} style={{ fontSize: '1.2rem' }} /> 
                </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Bootstrap Modal */}
      <div className="modal fade" id="commentsModal" tabIndex="-1" aria-labelledby="commentsModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="commentsModalLabel">Comments</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <ul className="list-unstyled">
                {selectedComments.map((comment, commentIndex) => (
                  <li key={commentIndex}>
                    <div className="d-flex">
                      <div className="fw-bold">{comment.commentby}</div>
                      <div className="mx-2">:</div>
                      <div>{comment.comment}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserContributions;
