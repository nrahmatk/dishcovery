import React, { useState } from "react";
import axios from "axios";
import "./ChatBox.css";
import Swal from "sweetalert2";
import InstanceServer from "../axiosInstance";

const Chatbox = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages([...messages, userMessage]);

    try {
      const response = await InstanceServer.post(
        "/chat",
        {
          message: input,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.access_token}`,
          },
        }
      );
      const reply = response.data.reply;
      const botMessage = { sender: "bot", text: reply };

      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Only for supporter user",
        icon: "error",
      });
      console.error("Error while sending message:", error);
      setError("Failed to send message. Please try again.");
    }

    setInput("");
  };

  return (
    <div className="chatbox-container">
      <div className="chatbox-messages">
        {messages.map((msg, index) => (
          <div key={index} className={`chatbox-message ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
        {error && <div className="chatbox-error">{error}</div>}
      </div>
      <form onSubmit={handleSubmit} className="chatbox-form">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message here..."
          className="chatbox-input"
        />
        <button type="submit" className="chatbox-button">
          Send
        </button>
      </form>
    </div>
  );
};

export default Chatbox;
