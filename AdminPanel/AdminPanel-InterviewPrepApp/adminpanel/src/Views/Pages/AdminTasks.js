import React, { useEffect, useState } from 'react';
import { IonIcon } from '@ionic/react';
import { create, trash, arrowForward, add, checkmark, download } from 'ionicons/icons';
import { db } from '../../FireBase/FireBaseConfig';
import { collection, doc, getDocs, updateDoc, deleteDoc, addDoc } from 'firebase/firestore';
import * as XLSX from 'xlsx';

const AdminTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const snapshot = await getDocs(collection(db, 'Admin', 'AdminTasks', 'Tasks'));
      const taskData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setTasks(taskData);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const renderTasksByStatus = status => {
    return tasks
      .filter(task => task.Status === status)
      .map(task => (
        <li
          key={task.id}
          className="list-group-item d-flex justify-content-between align-items-center"
          style={{
            whiteSpace: 'nowrap',
            overflow: 'auto',
            textOverflow: 'ellipsis',
            maxHeight: '100px',
            maxWidth: '280px'
          }}
        >
          {task.Task}
          <div>
            <IonIcon icon={trash} className="text-danger mx-1" onClick={() => handleDeleteTask(task.id)} />
            {status === 'ToDo' && (
              <IonIcon
                icon={arrowForward}
                className="text-warning mx-1"
                onClick={() => handleMoveToInProgress(task.id)}
              />
            )}
            {status === 'InProgress' && (
              <IonIcon icon={checkmark} className="text-success mx-1" onClick={() => handleMoveToDone(task.id)} />
            )}
          </div>
        </li>
      ));
  };

  const handleDeleteTask = async taskId => {
    try {
      await deleteDoc(doc(db, 'Admin', 'AdminTasks', 'Tasks', taskId));
      fetchTasksAgain();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleMoveToInProgress = async taskId => {
    try {
      await updateTaskStatus(taskId, 'InProgress');
      fetchTasksAgain();
    } catch (error) {
      console.error('Error moving task to In Progress:', error);
    }
  };

  const handleMoveToDone = async taskId => {
    try {
      await updateTaskStatus(taskId, 'Done');
      fetchTasksAgain();
    } catch (error) {
      console.error('Error marking task as Done:', error);
    }
  };

  const updateTaskStatus = async (taskId, status) => {
    const taskDocRef = doc(db, 'Admin', 'AdminTasks', 'Tasks', taskId);
    await updateDoc(taskDocRef, { Status: status });
  };

  const handleAddTask = async () => {
    try {
      const taskData = {
        Task: newTask,
        Status: 'ToDo' // Assuming the new task is initially in the 'ToDo' status
      };

      await addDoc(collection(db, 'Admin', 'AdminTasks', 'Tasks'), taskData);
      setNewTask(''); // Clear the input field after adding the task
      fetchTasksAgain();
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const fetchTasksAgain = () => {
    fetchTasks();
  };

  const handleExportToExcel = () => {
    const data = [['Task', 'Status']];
    tasks.forEach(task => {
      data.push([task.Task, task.Status]);
    });

    const ws = XLSX.utils.aoa_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'AdminTasks');
    XLSX.writeFile(wb, 'AdminTasks.xlsx');
  };

  return (
    <div className="bg-white min-vh-100 d-flex flex-row ">
      <div className="container-fluid">
        <h1 className="text-center mb-4">Admin Tasks</h1>
        <div className="row mb-3">
          <div className="col-md-12 text-center">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="New Task"
                value={newTask}
                onChange={e => setNewTask(e.target.value)}
              />
              <button className="btn btn-primary" onClick={handleAddTask}>
                <IonIcon icon={add} className="mr-2" />
                Add New Task
              </button>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <div className="card">
              <div className="card-header bg-primary text-white">To Do</div>
              <div className="card-body overflow-auto" style={{ maxHeight: '300px' }}>
                <ul className="list-group">{renderTasksByStatus('ToDo')}</ul>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card">
              <div className="card-header bg-warning">In Progress</div>
              <div className="card-body overflow-auto" style={{ maxHeight: '300px' }}>
                <ul className="list-group">{renderTasksByStatus('InProgress')}</ul>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card">
              <div className="card-header bg-success text-white">Done</div>
              <div className="card-body overflow-auto" style={{ maxHeight: '300px'}}>
                <ul className="list-group">{renderTasksByStatus('Done')}</ul>
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-md-12 text-center">
            <button className="btn btn-success" onClick={handleExportToExcel}>
              <IonIcon icon={download} className="mr-2" />
              Export to Excel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminTasks;
