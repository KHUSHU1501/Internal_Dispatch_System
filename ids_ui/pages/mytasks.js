import { useRouter } from "next/router";
import useSWR from "swr";
import Button from "react-bootstrap/Button";
import { getToken } from "../lib/authenticate";
import { Table, Container, Row, Col, Image } from "react-bootstrap";
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

  return (
    <>
      {loggedUserRole === "transporter" ? (
        <Container>
          <br />

          <Row>
            {/* Task table with column width of 12 */}

            <Col md={12}>
              <h2 className="text-center">My Tasks</h2>

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

                    <th className="text-center">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {userTasks.map((task) => (
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
