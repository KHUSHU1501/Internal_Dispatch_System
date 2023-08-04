import { useState } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import { useRef } from "react";
import {
  Table,
  Container,
  Row,
  Col,
  Image,
  Dropdown,
  DropdownButton,
  Form,
} from "react-bootstrap";
import { getToken } from "../lib/authenticate";
import jwtDecode from "jwt-decode";

const fetcher = async (url) => {
  const response = await fetch(url, {
    headers: { Authorization: `JWT ${getToken()}` },
  });

  return response.json();
};

const TaskPage = () => {
  const [searchText, setSearchText] = useState("");

  const router = useRouter();
  const {
    data: tasks,
    error,
    mutate,
  } = useSWR("https://kind-teal-rhinoceros-belt.cyclic.app/api/tasks", fetcher);

  const inputRef = useRef();
  const token = getToken();

  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

  const handleTaskClick = (taskId) => {
    router.push(`/task/${taskId}`);
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const sortedTasks = tasks
    ? tasks.sort((a, b) => {
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
      })
    : [];

  if (error) {
    return <div>Error loading tasks</div>;
  }

  if (!tasks) {
    return <div>Loading tasks...</div>;
  }

  const sortOptions = [
    { label: "Sort by Type", field: "type" },
    { label: "Sort by Requestor", field: "requestor" },
    { label: "Sort by Patient", field: "patient" },
    { label: "Sort by Transporter", field: "transporter" },
    { label: "Sort by Date Created", field: "createdAt" },
    { label: "Sort by Date Updated", field: "updatedAt" },
    { label: "Sort by Status", field: "status" },
  ];

  // Step 2: Event handler to update the search text state
  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  // Step 3: Filter tasks based on search text
  const filteredTasks = sortedTasks.filter((task) => {
    const taskFields = [
      task.patient,
      task.location,
      task.destination,
      task.type,
      task.transporter,
      task.status,
    ];
    return taskFields.some((field) =>
      field.toLowerCase().includes(searchText.toLowerCase())
    );
  });

  return (
    <>
      {jwtDecode(token).role === "nurse" ? (
        <Container>
          <br />
          <Row>
            <Col md={12}>
              <Row className>
                <Col md={3}>
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
                  <h2>All Tasks</h2>
                </Col>
                <Col md={3}>
                  <Form.Group>
                    <Form.Control
                      type="text"
                      placeholder="Search"
                      value={searchText}
                      onChange={handleSearchChange}
                    />
                  </Form.Group>
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
                    <th>Transporter</th>
                    <th>Status</th>
                    <th>Date Created</th>
                    <th>Date Updated</th>
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
                      <td onClick={() => handleTaskClick(task._id)}>
                        {new Date(task.createdAt).toLocaleString()}
                      </td>
                      <td onClick={() => handleTaskClick(task._id)}>
                        {new Date(task.updatedAt).toLocaleString()}
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
