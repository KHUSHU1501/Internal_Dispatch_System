import { useRouter } from 'next/router';
import useSWR from 'swr';
import { useState, useRef } from 'react';
import TaskDetails from '../components/TaskDetails';
import NewTaskForm from '../components/NewTaskForm';

const fetcher = async (url) => {
  const response = await fetch(url);
  return response.json();
};

const TaskPage = () => {
  const router = useRouter();
  const { data: tasks, error, mutate } = useSWR('https://kind-teal-rhinoceros-belt.cyclic.app/api/tasks', fetcher);
  const [newTask, setNewTask] = useState({
    patient: '',
    destination: '',
    location: '',
    isolation: false,
    notes: '',
    requestor: '',
    type: '',
  });
  const inputRef = useRef();

  const handleTaskClick = (taskId) => {
    router.push(`/task/${taskId}`);
  };

  const handleAddTask = async (event) => {
    event.preventDefault();
    // Perform any validation checks if required

    const response = await fetch('https://kind-teal-rhinoceros-belt.cyclic.app/api/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTask),
    });

    if (response.ok) {
      setNewTask({
        patient: '',
        destination: '',
        location: '',
        isolation: false,
        notes: '',
        requestor: '',
        type: '',
      });
      inputRef.current.focus();

      const updatedTasks = await fetch('https://kind-teal-rhinoceros-belt.cyclic.app/api/tasks', fetcher);
      const updatedTasksData = await updatedTasks.json();

      if (updatedTasksData) {
        // Update the tasks data using the mutate function
        mutate(updatedTasksData);
      }
    } else {
      // Task addition failed, handle the error
      console.log('Error adding task');
    }
  };

  if (error) {
    return <div>Error loading tasks</div>;
  }

  if (!tasks) {
    return <div>Loading tasks...</div>;
  }

  return (
    <div>
      <h1>Task List</h1>
      <ul>
        {tasks.map((task) => (
          <li key={task._id} onClick={() => handleTaskClick(task._id)}>
            {task.patient}
          </li>
        ))}
      </ul>
      <h2>Add a new Task</h2>
      <NewTaskForm
        newTask={newTask}
        setNewTask={setNewTask}
        handleAddTask={handleAddTask}
        inputRef={inputRef}
      />
    </div>
  );
};

export default TaskPage;









