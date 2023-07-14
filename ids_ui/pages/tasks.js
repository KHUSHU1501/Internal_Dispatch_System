import { useRouter } from 'next/router';
import useSWR from 'swr';
import { useState, useRef } from 'react';
import NewTaskForm from '../components/NewTaskForm';
import Button from 'react-bootstrap/Button';
import { Table, Container, Row, Col } from 'react-bootstrap';

const fetcher = async (url) => {
  const response = await fetch(url);
  return response.json();
};

const TaskPage = () => {
  const router = useRouter();
  const { data: tasks, error, mutate } = useSWR(
    'https://kind-teal-rhinoceros-belt.cyclic.app/api/tasks',
    fetcher
  );
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

    const response = await fetch(
      'https://kind-teal-rhinoceros-belt.cyclic.app/api/tasks',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTask),
      }
    );

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

      const updatedTasks = await fetch(
        'https://kind-teal-rhinoceros-belt.cyclic.app/api/tasks',
        fetcher
      );
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

  const handleDeleteTask = async (taskId) => {
    const response = await fetch(
      `https://kind-teal-rhinoceros-belt.cyclic.app/api/tasks/${taskId}`,
      {
        method: 'DELETE',
      }
    );

    if (response.ok) {
      const updatedTasks = tasks.filter((task) => task._id !== taskId);
      mutate(updatedTasks);
      // Task deleted successfully
      // Perform any additional actions if required
    } else {
      // Task deletion failed, handle the error
      console.log('Error deleting task');
    }
  };

  const handleCompleteTask = (taskId) => {
    // Implement the logic for completing a task here
    console.log(`Complete task with ID: ${taskId}`);
  };

  if (error) {
    return <div>Error loading tasks</div>;
  }

  if (!tasks) {
    return <div>Loading tasks...</div>;
  }

  return (
    <Container>
      <h1 className="text-center">Task Page</h1>
      <br />
      <Row>
        <Col md={6}>
          <h2 className="text-center">Current Tasks</h2>
          <br />
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Patient</th>
                <th>ID</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr key={task._id} style={{ cursor: 'pointer' }}>
                  <td onClick={() => handleTaskClick(task._id)}>
                    {task.patient}
                  </td>
                  <td onClick={() => handleTaskClick(task._id)}>
                    {task._id}
                  </td>
                  <td className="text-center">
                    <Button
                      variant="danger"
                      size="sm"
                      className="mr-2 mb-2"
                      onClick={() => handleDeleteTask(task._id)}
                    >
                      Delete
                    </Button>
                    &nbsp;
                    <Button
                      variant="success"
                      size="sm"
                      className="mr-2 mb-2"
                      onClick={() => handleCompleteTask(task._id)}
                    >
                      Complete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
        <Col md={6}>
          <h2 className="text-center">Add a new Task</h2>
          <br />
          <NewTaskForm
            newTask={newTask}
            setNewTask={setNewTask}
            handleAddTask={handleAddTask}
            inputRef={inputRef}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default TaskPage;
