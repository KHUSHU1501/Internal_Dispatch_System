import { useRouter } from "next/router";
import useSWR from "swr";
import { useState, useRef } from "react";
import NewTaskForm from "../components/NewTaskForm";
import Button from "react-bootstrap/Button";
import { getToken } from "../lib/authenticate";
import { Table, Container, Row, Col } from "react-bootstrap";
import jwtDecode from "jwt-decode";

var taskStatus = "notAssigned";
const token = getToken();

const fetcher = async (url) => {
  const response = await fetch(url, {
    headers: { Authorization: `JWT ${getToken()}` },
  });
  return response.json();
};

const TaskPage = () => {
  const router = useRouter();
  const {
    data: tasks,
    error,
    mutate,
  } = useSWR("https://kind-teal-rhinoceros-belt.cyclic.app/api/tasks", fetcher);

  const [newTask, setNewTask] = useState({
    patient: "",
    destination: "",
    location: "",
    isolation: false,
    notes: "",
    requestor: "",
    type: "",
  });
  const inputRef = useRef();

  const handleTaskClick = (taskId) => {
    router.push(`/task/${taskId}`);
  };

  const handleAddTask = async (event) => {
    event.preventDefault();
    // Perform any validation checks if required

    const token = getToken();

    const response = await fetch(
      "https://kind-teal-rhinoceros-belt.cyclic.app/api/tasks",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${token}`,
        },
        body: JSON.stringify(newTask),
      }
    );

    if (response.ok) {
      setNewTask({
        patient: "",
        destination: "",
        location: "",
        isolation: false,
        notes: "",
        requestor: "",
        type: "",
      });
      inputRef.current.focus();

      const updatedTasks = fetch(
        "https://kind-teal-rhinoceros-belt.cyclic.app/api/tasks",
        fetcher
      );

      // Update the tasks data using the mutate function
      mutate((await updatedTasks).json());
    } else {
      // Task addition failed, handle the error
      console.log("Error adding task");
    }
  };

  const handleTask = async (task) => {
    // Implement the logic for completing a task here
    console.log("Starting task", task.type);
    const token = getToken();
    const response = await fetch(
      `https://kind-teal-rhinoceros-belt.cyclic.app/api/tasks/${task._id}`,
      {
        method: "PUT",
        body: JSON.stringify({
          status: taskStatus,
          transporter: jwtDecode(token).userName,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${token}`, // Set the request's Content-Type header to indicate JSON data
        },
      }
    );

    if (response.ok) {
      // Task updated successfully
      // Perform any additional actions if required
      router.push(`/tasks`);
      inputRef.current.focus();

      const updatedTasks = await fetch(
        "https://kind-teal-rhinoceros-belt.cyclic.app/api/tasks",
        fetcher
      );

      // Update the tasks data using the mutate function
      mutate(updatedTasks.json());
    } else {
      // Task update failed, handle the error
      console.log("Error updating task");
    }
  };

  const handleTaskStart = async (task) => {
    // Implement the logic for starting a task here
    console.log("Starting task", task._id);
    taskStatus = "In Progress";
    handleTask(task);
  };

  if (error) {
    return <div>Error loading tasks</div>;
  }

  if (!tasks) {
    return <div>Loading tasks...</div>;
  }

  const handleCancelTask = (task) => {
    taskStatus = "Cancelled";
    handleTask(task);
  };


  const filteredTasks = tasks.filter((task) => task.status == "notAssigned");

  return (
    <Container>
      <br />
      <Row>
        {/* Task table with column width of 8 and a right border */}
        <Col md={8} style={{ borderRight: "1px solid #ccc" }}>
          <h2 className="text-center">Available Tasks</h2>
          <br />
          <Table striped bordered hover responsive id="task-table">
            <thead>
              <tr>
                <th>Patient</th>
                <th>Current Location</th>
                <th>Destination</th>
                <th>Type</th>
                <th>Transporter</th>
                <th>Status</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            {filteredTasks.length === 0 ? (
              <tbody>
                <tr>
                  <td colSpan="7" className="text-center">
                    No tasks available
                  </td>
                </tr>
              </tbody>
            ) : (
              <tbody>
                {filteredTasks.map((task) => (
                  <tr key={task._id} style={{ cursor: "pointer" }}>
                    <td onClick={() => handleTaskClick(task._id)}>
                      {task.patient}
                    </td>
                    <td onClick={() => handleTaskClick(task._id)}>
                      {task.location}
                    </td>
                    <td onClick={() => handleTaskClick(task._id)}>
                      {task.destination}
                    </td>
                    <td onClick={() => handleTaskClick(task._id)}>
                      {task.type}
                    </td>
                    <td onClick={() => handleTaskClick(task._id)}>
                      {task.transporter}
                    </td>
                    <td
                      style={{
                        color:
                          task.status === "In Progress"
                            ? "green"
                            : task.status === "notAssigned"
                              ? "red"
                              : task.status === "Delayed"
                                ? "orange"
                                : "black",
                      }}
                    >
                      {task.status}
                    </td>
                    <td className="text-center">
                      {jwtDecode(token).role === "transporter" && (
                        <Button
                          id="start-task-button"
                          variant="success"
                          size="sm"
                          className="mr-2 mb-2"
                          onClick={() => handleTaskStart(task)}
                        >
                          Start
                        </Button>
                      )}
                      {jwtDecode(token).role === "nurse" && (
                        <Button
                          id="cancel-task-button"
                          variant="danger"
                          size="sm"
                          className="mr-2 mb-2"
                          onClick={() => handleCancelTask(task)}
                        >
                          Cancel
                        </Button>
                      )}

                    </td>
                  </tr>
                ))}
              </tbody>
            )}
          </Table>
        </Col>
        {/* Form with column width of 4 */}
        <Col md={4}>
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
