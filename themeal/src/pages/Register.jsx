import axios from "axios";
import "./Login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import InstanceServer from "../axiosInstance";
import Navbar from "../components/Navbar";
import Swal from "sweetalert2";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await InstanceServer.post("/register", formData);
      console.log(response.data);
      Swal.fire({
        title: "Succes!",
        text: "Succes register",
        icon: "success",
        confirmButtonColor: "#E38B29",
      });
      navigate("/login");
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: error.response.data.message,
        icon: "error",
        confirmButtonColor: "#E38B29",
      });
      console.error("Registration Error: ", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="main-login">
        <div className="right-login">
          <div className="container">
            <div className="login-box">
              <h2>Register</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <input
                    placeholder="Username"
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    placeholder="Email"
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    placeholder="Password"
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <button type="submit" className="full">
                  Register
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
