import React, { useState, useEffect } from 'react';
//Firebse
import { db } from '../../FireBase/FireBaseConfig';
import { collection, getDocs,doc,deleteDoc } from 'firebase/firestore';
//Icons
import { IonIcon } from '@ionic/react'; 
import { add, create,trashBin,eye,print} from 'ionicons/icons';
//Modals
import AddUserModal from '../../CustomComponents/AddNewUserModal';
import ViewUserDetailModal from '../../CustomComponents/ViewUserDetailModal';
import EditModal from '../../CustomComponents/EditModal';


//Export Table to excel 
import * as XLSX from 'xlsx';
const UserDetails = () => {
  //States
  const [userData, setUserData] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewUserDetailModal, setShowViewUserDetailModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [user,setuser]= useState()

  //Fetching User Details
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'Candidates'));
      const data = querySnapshot.docs.map(doc => {
        const {isSetupProfile ,UserName,Password,Email, Profile } = doc.data();
        return { id: doc.id, Email,isSetupProfile ,UserName,Password, ...Profile };
      });
      setUserData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  //Functios For edit Specific User
  const handleEdit = (userId) => {
    setuser(userId);
    setShowEditModal(true);
  };
  const handleEditModalClose = () => {
    setShowEditModal(false);
    fetchData();
  };

  //Function For Delete Sepcific User
  const handleDelete = async (userId) => {
    try {
      
      const userRef = doc(db, 'Candidates', userId);
      await deleteDoc(userRef);
      fetchData();
      console.log('Successfully deleted user with ID:', userId);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  //Function FOr View User Details
  const handleViewUserDetails = (userId) => {
    setuser(userId);
    setShowViewUserDetailModal(true);
    
  };
  const handleViewUserDetailModalClose = () => {
    setShowViewUserDetailModal(false);
  };

  //Function for Addinng New User
  const handleAddUserModalOpen = () => {
    setShowAddModal(true);
  };
  const handleAddUserModalClose = () => {
    setShowAddModal(false);
    fetchData();
  };

  //Export to Excel 
  const exportToExcel = () => {
    const data = [['#', 'Email', 'CGPA', 'City', 'Country']];
    userData.forEach((user, index) => {
      data.push([index + 1, user.Email, user.CGPA, user.City, user.Country]);
    });
  
    const ws = XLSX.utils.aoa_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'UserDetails');
    XLSX.writeFile(wb, 'UserDetails.xlsx');
  };
  return (
    <div className="bg-white min-vh-100 d-flex flex-column align-items-center justify-content-center">
      <h1 className="mb-4 d-flex justify-content-between align-items-center">
        User Details
      </h1>
      <div  className="table-container" style={{ height: '400px', width: '80%', overflow: 'auto', borderRadius: '10px', }}>
        <table className="table table-sm table-dark">
          <thead>
            <tr className="table-dark">
              <th scope="col"># </th>
              <th scope="col">Email</th>
              <th scope="col">CGPA</th>
              <th scope="col">City</th>
              <th scope="col">Country</th>
              <th scope="col" >
                 Actions    
                 <button className="btn btn-success"style={{ marginLeft: 50}} onClick={exportToExcel}>
                    <IonIcon icon={print} style={{ fontSize: '1.2rem' }} /> 
                  </button>  
              </th>
              
            </tr>
          </thead>
          <tbody>
            {userData.map((user, index) => (
              <tr key={user.id} className="table-light">
                <th scope="row">{index + 1}</th>
                <td>{user.Email}</td>
                <td>{user.CGPA}</td>
                <td>{user.City}</td>
                <td>{user.Country}</td>
                <td>
                  <button className="btn btn-warning me-2" onClick={() => handleEdit(user.id)}>
                     <IonIcon icon={create} style={{ fontSize: '1.2rem' }} /> 
                  </button>
                  <button className="btn btn-danger" onClick={() => handleDelete(user.id)}>
                    <IonIcon icon={trashBin} style={{ fontSize: '1.2rem' }} /> 
                  </button>
                  <button className="btn btn-success" onClick={() => handleViewUserDetails(user.id)} style={{ marginLeft: 10 }}>
                    <IonIcon icon={eye} style={{ fontSize: '1.2rem' }} /> 
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button className="btn btn-primary me-2" onClick={handleAddUserModalOpen} style={{marginTop:50}}>
        <IonIcon icon={add} style={{ fontSize: '1.2rem' }} /> Add new user
      </button>
      <AddUserModal
        isOpen={showAddModal}
        isClose={handleAddUserModalClose}
      />
      <ViewUserDetailModal
        isOpen={showViewUserDetailModal}
        isClose={handleViewUserDetailModalClose}
        user={user}
      />
      <EditModal
        isOpen={showEditModal}
        handleClose={handleEditModalClose}
        user={user}
      />
    </div>
  );
};
export default UserDetails;
