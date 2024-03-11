import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../FireBase/FireBaseConfig';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import 'bootstrap/dist/css/bootstrap.min.css';

const ChartActivities = () => {
  const [taskData, setTaskData] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'Admin', 'AdminTasks', 'Tasks'));
        const tasks = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setTaskData(tasks);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleBarClick = (data, index) => {
    const clickedTask = taskData.find(task => task.Status === data.name);
    setSelectedTask(clickedTask);
  };

  const closeTaskDetails = () => {
    setSelectedTask(null);
  };

  const data = [
    { name: 'ToDo', value: taskData.filter(task => task.Status === 'ToDo').length },
    { name: 'InProgress', value: taskData.filter(task => task.Status === 'InProgress').length },
    { name: 'Done', value: taskData.filter(task => task.Status === 'Done').length },
  ];

  return (
    <div className="bg-white d-flex flex-column align-items-center p-4" style={{ height: '80vh' }}>
      <h2 style={{ marginBottom: '20px' }}>Admin Tasks Chart</h2>

      <ResponsiveContainer width="80%" height={300}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" barSize={30} fill="#8884d8" onClick={handleBarClick} />
        </BarChart>
      </ResponsiveContainer>

      <Modal show={selectedTask !== null} onHide={closeTaskDetails}>
        <Modal.Header closeButton>
          <Modal.Title>Task Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Status: {selectedTask?.Status}</p>
          <p>Task: {selectedTask?.Task}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeTaskDetails}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ChartActivities;
