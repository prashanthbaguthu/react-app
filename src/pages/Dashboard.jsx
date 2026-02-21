import React, { useEffect, useState, useRef } from "react";
import { Card } from "react-bootstrap";
import {
  FaUsers,
  FaUserTie,
  FaClock,
  FaSignOutAlt,
  FaComments,
} from "react-icons/fa";
import { toast } from "react-toastify";
import * as signalR from "@microsoft/signalr";

function Dashboard() {
  const [employeeCount, setEmployeeCount] = useState(0);
  const [customerCount, setCustomerCount] = useState(0);
  const [loginTime, setLoginTime] = useState("");
  const [logoutTime, setLogoutTime] = useState("");

  const [connection, setConnection] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");

  const messagesEndRef = useRef(null);

  // Scroll to bottom when new message arrives
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    setEmployeeCount("20");
    setCustomerCount("89");
    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl("http://localhost:5292/chatHub", {
        accessTokenFactory: () => localStorage.getItem("token"),
      })
      .withAutomaticReconnect()
      .build();

    setConnection(newConnection);
  }, []);

  useEffect(() => {
    if (!connection) return;

    connection
      .start()
      .then(() => {
        console.log("✅ SignalR Connected");

        connection.on("ReceiveMessage", (user, message) => {
          setMessages((prev) => [
            ...prev,
            {
              user,
              message,
              time: new Date().toLocaleTimeString(),
            },
          ]);
        });
      })
      .catch((err) => console.error("Connection error:", err));

    return () => {
      connection.stop();
    };
  }, [connection]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!messageInput.trim() || !connection) return;

    try {
      await connection.invoke("SendMessage", messageInput);
      setMessageInput("");
    } catch (err) {
      console.error("Send failed:", err);
    }
  };
const sampletest=()=>{
  alert("this is the test purpose");
}
  const handleLogout = () => {
    const now = new Date().toLocaleString();
    setLogoutTime(now);
    localStorage.setItem("logoutTime", now);
    localStorage.setItem("isAuthenticated", "false");

    toast.success("Logged out successfully!");
    window.location.reload();
  };

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">📊 Admin Dashboard</h2>

        <button className="btn btn-danger" onClick={handleLogout}>
          <FaSignOutAlt className="me-2" />
          Logout
        </button>
          <button className="btn btn-danger" onClick={sampletest}>
          <FaSignOutAlt className="me-2" />
          Logout
        </button>
      </div>

      {/* Dashboard Cards */}
      <div className="row g-4 mb-4">
        <div className="col-md-3">
          <Card className="shadow-lg border-0 p-3">
            <h5 className="text-muted">
              <FaUserTie className="me-2 text-primary" />
              Employees
            </h5>
            <h2 className="fw-bold">{employeeCount}</h2>
          </Card>
        </div>

        <div className="col-md-3">
          <Card className="shadow-lg border-0 p-3">
            <h5 className="text-muted">
              <FaUsers className="me-2 text-warning" />
              Customers
            </h5>
            <h2 className="fw-bold">{customerCount}</h2>
          </Card>
        </div>

        <div className="col-md-3">
          <Card className="shadow-lg border-0 p-3">
            <h5 className="text-muted">
              <FaClock className="me-2 text-info" />
              Login Time
            </h5>
            <p className="fw-bold">{loginTime}</p>
          </Card>
        </div>

        <div className="col-md-3">
          <Card className="shadow-lg border-0 p-3">
            <h5 className="text-muted">
              <FaSignOutAlt className="me-2 text-danger" />
              Last Logout
            </h5>
            <p className="fw-bold">
              {logoutTime || localStorage.getItem("logoutTime") || "N/A"}
            </p>
          </Card>
        </div>
      </div>

      {/* Chat Section */}
      <div className="row">
        <div className="col-md-6">
          <Card className="shadow-lg border-0">
            <Card.Header className="bg-dark text-white">
              <FaComments className="me-2" />
              Live Chat
            </Card.Header>

            <Card.Body
              style={{
                height: "300px",
                overflowY: "auto",
                background: "#f8f9fa",
              }}
            >
              {messages.map((msg, index) => (
                <div key={index} className="mb-2 p-2 bg-white rounded shadow-sm">
                  <strong>{msg.user}</strong>
                  <small className="text-muted ms-2">{msg.time}</small>
                  <div>{msg.message}</div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </Card.Body>

            <Card.Footer className="d-flex">
              <input
                type="text"
                className="form-control me-2"
                placeholder="Type a message..."
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              />
              <button className="btn btn-primary" onClick={sendMessage}>
                Send
              </button>
            </Card.Footer>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;