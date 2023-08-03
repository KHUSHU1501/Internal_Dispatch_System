import { useRouter } from "next/router";

import useSWR from "swr";

import { useState, useRef } from "react";

import { Table, Container, Row, Col } from "react-bootstrap";

import { getToken } from "../lib/authenticate";

import jwtDecode from "jwt-decode";

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

  const inputRef = useRef();

  const handleTaskClick = (taskId) => {
    router.push(`/task/${taskId}`);
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
          status: "In Progress",

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

      router.push(`/alltasks`);

      inputRef.current.focus();

      const updatedTasks = await fetch(
        "https://kind-teal-rhinoceros-belt.cyclic.app/api/alltasks",

        fetcher
      );

      // Update the tasks data using the mutate function

      mutate(updatedTasks.json());
    } else {
      // Task update failed, handle the error

      console.log("Error updating task");
    }
  };

  if (error) {
    return <div>Error loading tasks</div>;
  }

  if (!tasks) {
    return <div>Loading tasks...</div>;
  }

  return (
    <Container>
      <br />

      <Row>
        {/* Task table with column width of 8 and a right border */}

        <Col md={12}>
          <h2 className="text-center">All Tasks</h2>

          <br />

          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Patient</th>

                <th>Current Location</th>

                <th>Destination</th>

                <th>Type</th>

                <th>Transporter</th>

                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {tasks.map((task) => (
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

                  <td onClick={() => handleTaskClick(task._id)}>{task.type}</td>

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
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default TaskPage;
