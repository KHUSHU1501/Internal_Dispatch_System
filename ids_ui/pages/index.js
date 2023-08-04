import Image from "next/image";
import Img1 from "./Img1.jpg";
import { Col, Row } from "react-bootstrap";

export default function Home() {
  return (
    <>
      <div>
        <header className="navbar-light bg-light text-center mt-5">
          <br />
          <h1>Welcome to the Internal Dispatch System for Hospitals</h1>
          <br />
        </header>
      </div>
      <br />
      <main>
        <Row>
          <Col>
            <div>
              <Image
                src={Img1}
                alt="Internal Dispatch System"
                width={600}
                className="img-fluid"
                padding={10}
              />
              <br />
              <br />
            </div>
          </Col>
          <Col>
            <div>
              <p>
                Streamlining hospital operations and optimizing communication
                between staff members is crucial for delivering top-notch
                patient care. Our cutting-edge internal dispatch system is
                designed exclusively for hospitals, providing a state-of-the-art
                solution that empowers healthcare facilities to efficiently
                manage their daily workflows and ensure seamless coordination
                across various departments.
              </p>
              <p>
                With our advanced dispatch system, hospital administrators can
                assign tasks, track their progress, and monitor real-time
                updates in a centralized dashboard. Nurses, doctors, and support
                staff can communicate instantly through secure channels,
                improving response times and promoting collaboration. Whether it
                is requesting medical supplies, alerting the rapid response
                team, or coordinating patient transfers, our system simplifies
                the process, reducing delays and enhancing overall efficiency.
                Additionally, its user-friendly interface requires minimal
                training, making it easy for all hospital staff to adopt and
                integrate into their daily routines. Elevate your hospital
                operations to a new level of productivity and patient care with
                our internal dispatch system today!
              </p>
            </div>
            <br />
            <ul className="list-unstyled">
              <h5 className="text-center">Quick Links</h5>
              <Row>
                <Col>
                  <li className="bg-light p-3 rounded">
                    <a href="./alltasks">All Tasks</a>
                  </li>
                </Col>
                <Col>
                  <li className="bg-light p-3 rounded">
                    <a href="./tasks">Available Tasks</a>
                  </li>
                </Col>
              </Row>
              <Row>
                <Col>
                  <li className="bg-light p-3 rounded">
                    <a href="./mytasks">My tasks</a>
                  </li>
                </Col>
                <Col>
                  <li className="bg-light p-3 rounded">
                    <a href="./tasks">Task Request Form</a>
                  </li>
                </Col>
              </Row>
            </ul>
          </Col>
        </Row>
      </main>
      <footer className="bg-light p-3">
        <div className="container text-center">
          <br />
          <br />

          <p>© 2023 SeneCoders. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}
