import React, { useEffect, useState, useRef } from "react";
import * as signalR from "@microsoft/signalr";
import "./Chat.css";
const Chat = () => {
  const [connection, setConnection] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const messagesEndRef = useRef(null);

  // Auto scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
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
        console.log("✅ Connected to SignalR");

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

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Live Chat</h2>

      <div style={styles.chatBox}>
        {messages.map((msg, index) => (
          <div key={index} style={styles.message}>
            <strong>{msg.user}</strong>
            <span style={styles.time}>{msg.time}</span>
            <div>{msg.message}</div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div style={styles.inputContainer}>
        <input
          type="text"
          value={messageInput}
          placeholder="Type a message..."
          onChange={(e) => setMessageInput(e.target.value)}
          style={styles.input}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage} style={styles.button}>
          Send
        </button>
      </div>
    </div>
  );
};



export default Chat;