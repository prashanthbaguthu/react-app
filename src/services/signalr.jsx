import * as signalR from "@microsoft/signalr";

const connection = new signalR.HubConnectionBuilder()
  .withUrl("http://localhost:5292/chatHub")
  .withAutomaticReconnect()
  .build();

export const startConnection = async () => {
  try {
    await connection.start();
    console.log("SignalR Connected");
  } catch (err) {
    console.error("Connection error:", err);
  }
};

export const receiveMessage = (callback) => {
  connection.on("ReceiveMessage", callback);
};