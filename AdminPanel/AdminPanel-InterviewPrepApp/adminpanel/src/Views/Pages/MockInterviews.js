import React, { useState } from 'react';
import { IonIcon } from '@ionic/react';
import { trashBin, eye ,download} from 'ionicons/icons';
import { collection, getDocs, deleteDoc, doc, where, query, limit } from 'firebase/firestore';
import { jsPDF } from 'jspdf';

const MockInterviews = () => {


  return (
    <div className="container bg-white min-vh-100 d-flex flex-column p-4">
       
  </div>
  );
};

export default MockInterviews;
