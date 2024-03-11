import React, { useState, useEffect } from 'react';
import { Modal, Button, Image } from 'react-bootstrap';
import { db } from '../../FireBase/FireBaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import * as XLSX from 'xlsx';

const ViewQuestionModal = ({ question, answer, handleClose }) => {
  const handleExportToExcel = () => {
    const data = [['Question', 'Answer'], [question, answer]];
    const ws = XLSX.utils.aoa_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'ViewQuestion');
    XLSX.writeFile(wb, 'ViewQuestion.xlsx');
  };

  return (
    <Modal show={true} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>View Question</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <h5>Question:</h5>
          <p>{question}</p>
        </div>
        <div>
          <h5>Answer:</h5>
          <p>{answer}</p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleExportToExcel}>
          Export to Excel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ViewQuestionModal;
