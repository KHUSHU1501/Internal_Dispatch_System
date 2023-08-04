import { useRouter } from "next/router";

import useSWR from "swr";

import { useRef } from "react";

import { Table, Container, Row, Col, Image } from "react-bootstrap";

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
  const token = getToken();

  const handleTaskClick = (taskId) => {
    router.push(`/task/${taskId}`);
  };

  if (error) {
    return <div>Error loading tasks</div>;
  }

  if (!tasks) {
    return <div>Loading tasks...</div>;
  }

  return (
    <>
      {jwtDecode(token).role === "nurse" ? (
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
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Col>
          </Row>
        </Container>
      ) : (
        <div className="text-center">
          <h1>Access Denied</h1>
          <p>You are not authorized to view this page</p>
          <br />
          <Image
            src="https://cdn-icons-png.flaticon.com/512/2996/2996824.png"
            alt="Access Denied"
            width={500}
            height={300}
            className="img-fluid"
          />
        </div>
      )}
    </>
  );
};

export default TaskPage;
