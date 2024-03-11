import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CRow,
} from '@coreui/react';
import { db } from '../../FireBase/FireBaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import { useUser } from '../../ReactContextApi/UserContext';
const SignIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { signIn } = useUser();
  const navigate = useNavigate();

  const handleSignIn = async () => {
    try {
      const adminRef = collection(db, 'Admin');
      const querySnapshot = await getDocs(adminRef);
      let isAdmin = false;

      querySnapshot.forEach((doc) => {
        const adminData = doc.data();
        if (adminData.email === username && adminData.password === password) {
          isAdmin = true;
          signIn({ email: adminData.email, username: adminData.username, password: adminData.password });
          navigate('/dashboard');
        }
      });

      if (!isAdmin) {
        setError('Invalid username or password');
      }
    } catch (error) {
      setError('Error signing in. Please try again.');
      console.error('Error signing in:', error);
    }
  };

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center align-items-center">
          <CCol md={6} lg={4}>
            <CCard>
              <CCardBody>
                <CForm>
                  <h1 className="text-center mb-4">Sign In</h1>
                  <CInputGroup className="mb-3">
                    <CFormInput
                      type="text"
                      placeholder="Email"
                      autoComplete="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                   
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CFormInput
                      type="password"
                      placeholder="Password"
                      autoComplete="current-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    
                  </CInputGroup>
                  {error && <p style={{ color: 'red' }}>{error}</p>}
                  <CButton color="primary" className="w-100" onClick={handleSignIn}>
                    Sign In  
                  </CButton>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
          <CCol md={6} lg={8} className="d-none d-md-block">
            {/* Add your landing image here */}
            <img
              src="https://cdni.iconscout.com/illustration/premium/thumb/admin-control-panel-4487949-3722637.png?f=webp"
              alt="Landing Image"
              className="img-fluid"
              style={{ maxHeight: '100%', maxWidth: '100%' }}
            />
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default SignIn;
