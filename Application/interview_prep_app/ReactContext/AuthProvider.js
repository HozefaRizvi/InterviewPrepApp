import React, { useState, useContext, useMemo } from 'react';
import AuthContext from './AuthContext';

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [questionBankData, setQuestionBankData] = useState(null);

  const login = (userData) => {
    // Assume userData contains user information from the backend
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
    // Clear question bank data on logout
    setQuestionBankData(null);
  };

  const storeQuestionBankData = (data) => {
    setQuestionBankData(data);
  };

  const authContextValue = useMemo(() => ({
    user,
    login,
    logout,
    storeQuestionBankData,
    questionBankData,
  }), [user, questionBankData]);

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
