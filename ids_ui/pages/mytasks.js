import React, { useState } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import Button from "react-bootstrap/Button";
import { getToken } from "../lib/authenticate";
import {
  Table,
  Container,
  Row,
  Col,
  Image,
  Form,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";
import jwtDecode from "jwt-decode";

var taskStatus = "notAssigned";

const fetcher = async (url) => {
  const response = await fetch(url, {
    headers: { Authorization: `JWT ${getToken()}` },
  });
  return response.json();
};

const MyTasksPage = () => {
  const router = useRouter();
  const loggedUser = jwtDecode(getToken()).userName;
  const loggedUserRole = jwtDecode(getToken()).role;

  const [searchText, setSearchText] = useState("");
  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

  const {
    data: tasks,
    error,
    mutate,
  } = useSWR("https://kind-teal-rhinoceros-belt.cyclic.app/api/tasks", fetcher);

  const handleTaskClick = (taskId) => {
    router.push(`/task/${taskId}`);
  };

  const handleTask = async (task) => {
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
          Authorization: `JWT ${token}`,
        },
      }
    );

    if (response.ok) {
      router.push(`/mytasks`);

      const updatedTasks = await fetch(
        "https://kind-teal-rhinoceros-belt.cyclic.app/api/mytasks",
        fetcher
      );

      mutate((await updatedTasks).json());
    } else {
      console.log("Error updating task");
    }
  };

  const handleTaskStart = async (task) => {
    console.log("Starting task", task._id);

    taskStatus = "In Progress";
    handleTask(task);
  };

  const handleDelayTask = (task) => {
    if (task.status === "Delayed") {
      taskStatus = "In Progress";
    } else {
      taskStatus = "Delayed";
    }
    handleTask(task);
  };

  const handleCompleteTask = (task) => {
    taskStatus = "Completed";
    handleTask(task);
  };

  if (error) {
    return <div>Error loading tasks</div>;
  }

  if (!tasks) {
    return <div>Loading tasks...</div>;
  }

  const userTasks = tasks.filter((task) => task.transporter === loggedUser);

  const sortOptions = [
    { label: "Sort by Patient", field: "patient" },
    { label: "Sort by Current Location", field: "location" },
    { label: "Sort by Destination", field: "destination" },
    { label: "Sort by Type", field: "type" },
    { label: "Sort by Status", field: "status" },
    { label: "Sort by Date Created", field: "createdAt" },
    { label: "Sort by Date Updated", field: "updatedAt" },
    { label: "Sort by Requestor", field: "requestor" },
  ];

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const sortedTasks = userTasks.sort((a, b) => {
    if (sortField) {
      const aValue = a[sortField];
      const bValue = b[sortField];

      if (sortOrder === "asc") {
        return aValue.localeCompare(bValue);
      } else {
        return bValue.localeCompare(aValue);
      }
    }
    return 0;
  });

  // Filter tasks based on search text
  const filteredTasks = sortedTasks.filter((task) => {
    const taskFields = [
      task.patient,
      task.location,
      task.destination,
      task.type,
      task.transporter,
      task.status,
      task.requestor,
    ];
    return taskFields.some((field) =>
      field.toLowerCase().includes(searchText.toLowerCase())
    );
  });

  // Event handler to update the search text state
  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  return (
    <>
      {loggedUserRole === "transporter" ? (
        <Container>
          <br />
          <Row>
            <Col md={12}>
              <Row className="align-items-center">
                <Col md={3} className="text-right">
                  <DropdownButton variant="secondary" title="Sort Tasks">
                    {sortOptions.map((option) => (
                      <Dropdown.Item
                        key={option.field}
                        onClick={() => handleSort(option.field)}
                      >
                        {option.label}
                      </Dropdown.Item>
                    ))}
                  </DropdownButton>
                </Col>
                <Col md={6} className="text-center">
                  <h2>My Tasks</h2>
                </Col>
                <Col md={3} className="text-right">
                  <Form.Control
                    type="text"
                    value={searchText}
                    onChange={handleSearchChange}
                    placeholder="Search tasks..."
                  />
                </Col>
              </Row>
              <br />
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>Patient</th>
                    <th>Current Location</th>
                    <th>Destination</th>
                    <th>Type</th>
                    <th>Requestor</th>
                    <th>Transporter</th>
                    <th>Status</th>
                    <th className="text-center">Actions</th>
                  </tr>
                </thead>
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
                        {task.requestor}
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
                        {task.status === "notAssigned" && (
                          <Button
                            variant="success"
                            size="sm"
                            className="mr-2 mb-2"
                            onClick={() => handleTaskStart(task)}
                          >
                            Start
                          </Button>
                        )}
                        {task.status === "Delayed" && (
                          <Button
                            variant="secondary"
                            size="sm"
                            className="mr-2 mb-2"
                            onClick={() => handleDelayTask(task)}
                          >
                            Remove Delay
                          </Button>
                        )}
                        {task.status === "In Progress" && (
                          <>
                            <Button
                              variant="warning"
                              size="sm"
                              className="mr-2 mb-2"
                              onClick={() => handleDelayTask(task)}
                            >
                              Delay
                            </Button>
                            &nbsp; &nbsp;
                            <Button
                              variant="success"
                              size="sm"
                              className="mr-2 mb-2"
                              onClick={() => handleCompleteTask(task)}
                            >
                              Complete
                            </Button>
                          </>
                        )}
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

export default MyTasksPage;
