import React, { useState } from 'react';
import useSWR from 'swr';

const TaskPage = () => {
  const [selectedTask, setSelectedTask] = useState(null);
  const [query, setQuery] = useState('');
  const [newTask, setNewTask] = useState({
    patient: '',
    location: '',
    destination: '',
    isolation: '',
    transporter: '',
  });

  const fetcher = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  };

  const { data: tasks, error: fetchTasksError, mutate: mutateTasks } = useSWR(
    'https://kind-teal-rhinoceros-belt.cyclic.app/api/tasks',
    fetcher
  );

  const handleRowClick = (task) => {
    setSelectedTask(task);
  };

  const handleDelete = async () => {
    if (!selectedTask) return;

    try {
      await fetch(
        `https://kind-teal-rhinoceros-belt.cyclic.app/api/tasks/${selectedTask.id}`,
        {
          method: 'DELETE',
        }
      );
      setSelectedTask(null);
      mutateTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleUpdate = async () => {
    if (!selectedTask) return;

    try {
      await fetch(
        `https://kind-teal-rhinoceros-belt.cyclic.app/api/tasks/${selectedTask.id}`,
        {
          method: 'PUT',
          body: JSON.stringify(selectedTask),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      setSelectedTask(null);
      mutateTasks();
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleQueryChange = (event) => {
    setQuery(event.target.value);
  };

  const handleQuerySubmit = async (event) => {
    event.preventDefault();
    if (query === '') return;

    try {
      const response = await fetch(
        `https://kind-teal-rhinoceros-belt.cyclic.app/api/tasks/${selectedTask.id}`
      );
      const data = await response.json();
      setSelectedTask(data);
    } catch (error) {
      console.error('Error fetching task by ID:', error);
      setSelectedTask(null);
    }
  };

  const handleNewTaskChange = (event) => {
    const { name, value } = event.target;
    setNewTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const handleAddTask = async (event) => {
    event.preventDefault();

    try {
      await fetch('https://kind-teal-rhinoceros-belt.cyclic.app/api/tasks', {
        method: 'POST',
        body: JSON.stringify(newTask),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setNewTask({
        patientName: '',
        currentLocation: '',
        destination: '',
        isolation: '',
        transporter: '',
      });
      mutateTasks();
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  return (
    <div>
      <h1>Task List</h1>

      <form onSubmit={handleQuerySubmit}>
        <input
          type="text"
          placeholder="Enter task ID"
          value={query}
          onChange={handleQueryChange}
        />
        <button type="submit">Search</button>
      </form>

      {selectedTask && (
        <div>
          <h2>Selected Task</h2>
          <p>Patient Name: {selectedTask.patient}</p>
          <p>Current Location: {selectedTask.location}</p>
          <p>Destination: {selectedTask.destination}</p>
          <p>Isolation: {selectedTask.isolation}</p>
          <p>transporter: {selectedTask.transporter}</p>
          <button onClick={handleDelete}>Delete</button>
          <button onClick={handleUpdate}>Update</button>
        </div>
      )}

      <h2>Task List</h2>
      {tasks && !fetchTasksError ? (
        <table>
          <thead>
            <tr>
              <th>Patient Name</th>
              <th>Current Location</th>
              <th>Destination</th>
              <th>Isolation</th>
              <th>Transporter</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr
                key={task.id}
                onClick={() => handleRowClick(task)}
                style={{
                  background: task === selectedTask ? 'lightblue' : 'white',
                  cursor: 'pointer',
                }}
              >
                <td>{task.patient}</td>
                <td>{task.location}</td>
                <td>{task.destination}</td>
                <td>{task.isolation}</td>
                <td>{task.transporter}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Error fetching tasks.</p>
      )}

      <h2>Add New Task</h2>
      <form onSubmit={handleAddTask}>
        <input
          type="text"
          name="patientName"
          placeholder="Patient Name"
          value={newTask.patient}
          onChange={handleNewTaskChange}
        />
        <input
          type="text"
          name="currentLocation"
          placeholder="Current Location"
          value={newTask.location}
          onChange={handleNewTaskChange}
        />
        <input
          type="text"
          name="destination"
          placeholder="Destination"
          value={newTask.destination}
          onChange={handleNewTaskChange}
        />
        <input
          type="text"
          name="isolation"
          placeholder="Isolation"
          value={newTask.isolation}
          onChange={handleNewTaskChange}
        />
        <input
          type="text"
          name="transporter"
          placeholder="transporter"
          value={newTask.transporter}
          onChange={handleNewTaskChange}
        />
        <button type="submit">Add Task</button>
      </form>
    </div>
  );
};

export default TaskPage;

