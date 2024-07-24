import axios from "axios";
import "./Login.css";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InstanceServer from "../axiosInstance";
import Swal from "sweetalert2";
import Navbar from "../components/Navbar";
import { useDispatch } from "react-redux";
import { login } from "../store/slicers/userSlice";

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await InstanceServer.post("/login", formData);
      localStorage.setItem("access_token", response.data.access_token);
      localStorage.setItem("id", response.data.user.id);
      dispatch(login(response.data.user));
      Swal.fire({
        title: "Success!",
        text: "Login successful",
        icon: "success",
        confirmButtonColor: "#E38B29",
      });
      navigate("/");
    } catch (error) {
      console.error("Login Error: ", error);
      Swal.fire({
        title: "Error!",
        text: error.response.data.message || "Something went wrong!",
        icon: "error",
        confirmButtonColor: "#E38B29",
      });
    }
  };

  async function handleCredentialResponse(response) {
    try {
      const { data } = await InstanceServer.post(
        "/google-signin",
        {},
        {
          headers: {
            google_token: response.credential,
          },
        }
      );

      localStorage.setItem("access_token", data.access_token);
      localStorage.userid = data.user.id;
      dispatch(login(data.user));

      Swal.fire({
        title: "Success!",
        text: "Login successful",
        icon: "success",
        confirmButtonColor: "#E38B29",
      });
      navigate("/");
    } catch (error) {
      console.log("Google Sign-In Error: ", error);
      Swal.fire({
        title: "Error!",
        text: "Google Sign-In Error",
        icon: "error",
      });
    }
  }

  useEffect(() => {
    google.accounts.id.initialize({
      client_id:
        "259563219174-dv28kp2ruvakqbng9telu7mdiorv6dcp.apps.googleusercontent.com",
      callback: handleCredentialResponse,
    });

    google.accounts.id.renderButton(document.getElementById("buttonDiv"), {
      theme: "outline",
      size: "large",
    });
  }, []);

  return (
    <>
      <Navbar />
      <div className="main-login">
        <div className="right-login">
          <div className="container">
            <div className="login-box">
              <h2>Login</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="button-group">
                  <button className="full" type="submit">
                    Login
                  </button>
                  <div id="buttonDiv"></div>
                </div>
              </form>
              <hr />
              <p>
                Didn't you have an account?{" "}
                <Link to={"/register"}>Register Here</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
