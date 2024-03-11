import React from 'react';
import { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IonIcon } from '@ionic/react'; // Import IonIcon from ionicons
import { person, construct ,mail} from 'ionicons/icons';
import { useUser } from '../../ReactContextApi/UserContext';
import { db } from '../../FireBase/FireBaseConfig';
import { Bar } from 'react-chartjs-2';
import { collection, getDocs, query, where,getDoc,doc } from 'firebase/firestore';
import EditProfileModal from '../../CustomComponents/EditProfileModal';
const HomePage = () => {
  const { user } = useUser();
  const [showModal, setShowModal] = useState(false);
  const [userStats, setUserStats] = useState({
    totalUsers: 0,
    totalCandidates: 0,
    totalExperts: 0,
    totalPosts: 0,
  });
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  useEffect(() => {
    const fetchUserStats = async () => {
      try {
        // Fetch total number of users from Candidates collection
        const candidatesQuery = query(collection(db, 'Candidates'));
        const candidatesSnapshot = await getDocs(candidatesQuery);
        const totalUsers = candidatesSnapshot.size;
        // Fetch total number of candidates from Candidates collection
        const candidatesAsCandidatesQuery = query(collection(db, 'Candidates'), where('Profile.Expert', '==', 'Candidate'));
        const candidatesAsCandidatesSnapshot = await getDocs(candidatesAsCandidatesQuery);
        const totalCandidates = candidatesAsCandidatesSnapshot.size;
        // Fetch total number of experts from Experts collection
        const expertsQuery = query(collection(db, 'Candidates'), where('Profile.Expert', '==', 'Expert'));
        const expertsSnapshot = await getDocs(expertsQuery);
        const totalExperts = expertsSnapshot.size;

        // Fetch total number of posts from Posts subcollection under ExpertPosts document in Experts collection
        const expertPostsDoc = await getDoc(doc(db, 'Experts', 'ExpertPosts'));
        if (expertPostsDoc.exists()) {
          const postsQuery = query(collection(expertPostsDoc.ref, 'Posts'));
          const postsSnapshot = await getDocs(postsQuery);
          const totalPosts = postsSnapshot.size;

          setUserStats({
            totalUsers,
            totalCandidates,
            totalExperts,
            totalPosts,
          });
        }
      } catch (error) {
        console.error('Error fetching user statistics:', error);
      }
    };

    fetchUserStats();
  }, []);
  return (
    <div className="bg-white d-flex min-vh-100">
      <div className="flex-grow-1 d-flex flex-column align-items-start p-3"> 
        <h1 className="mb-4 text-center">Interview Preparation Application</h1>

        {/* Admin Profile Table */}
        <div className="mb-4 table-responsive">
          <h2 className="mb-3">Admin Profile</h2>
          <table className="table table-bordered">
            <tbody>
              <tr>
                <td class="table-success"> 
                <IonIcon icon={person} style={{ fontSize: '1.2rem' }} />
                </td>
                <td>{user.username}</td>
              </tr>
              <tr>
                <td class="table-success">
                <IonIcon icon={mail} style={{ fontSize: '1.2rem' }} />
                </td>
                <td>{user.email}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Users and Experts Statistics Table */}
        <div className="mb-4 table-responsive">
          <h2 className="mb-3">Statistics</h2>
          <table class="table table-xl table-dark">
            <thead>
              <tr>
                
                <th scope="col">Users</th>
                <th scope="col">Number of Users</th>
              </tr>
            </thead>
            <tbody>
              <tr class="table-light">
               
                <td>Total Number Of Users</td>
                <td>{userStats.totalUsers}</td>
              </tr>
              <tr class="table-light">
                <td>Total Number of Candidates</td>
                <td>{userStats.totalCandidates}</td>
              </tr>
              <tr class="table-light">
                <td>Total Number of Experts</td>
                <td>{userStats.totalExperts}</td>
              </tr>
              <tr class="table-light">
                <td>Total Number of Posts</td>
                <td>{userStats.totalPosts}</td>
              </tr>
            </tbody>
          </table>
        </div>

       {/* Edit Admin Personal Information Button */}
       <Link  className="btn btn-success text-center" onClick={handleShowModal}>
          <IonIcon icon={construct} style={{ fontSize: '1.2rem' }} /> Edit Admin Personal Information
        </Link>
        {/* Modal for Editing Profile */}
        <EditProfileModal show={showModal} onHide={handleCloseModal} />
      </div>
    </div>
  );
};

export default HomePage;
