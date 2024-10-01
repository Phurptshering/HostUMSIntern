import { useRef, useState, useEffect } from "react";
import { Cookies } from "react-cookie";
import axios from "axios";

const Login = () => {
  const cookies = new Cookies();
  const userRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState("");
  const [password, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("Request Payload:", JSON.stringify({ email, password }));
      const response = await axios.post(
        "https://real-coal-production.up.railway.app/auth/login",
        JSON.stringify({ email, password }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );


      const token = response?.data?.token;

      if (token) {
        // Store the token in cookies
        console.log("Setting Cookies")
        cookies.set("authToken", token, { path: "/" });
        console.log("Token:", token);


        setSuccess(true);
        setEmail("");
        setPwd("");
      } else {
        setErrMsg("Login Failed");
        errRef.current.focus();
      }
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        console.log("Server Response:", err.response);
        setErrMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        console.log("Server Response:", err.response);
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <div className="parent-container">
      <div id="newContainer">
        <img src="UMS.jpg" alt="" style={{ width: "30rem", margin: "auto" }} />
        <h1>SDU User Management System</h1>
      </div>
      <div id="loginroot">
        {success ? (
          <section id="loginSec" class="bg-gray-100 flex flex-col items-center justify-center">
            <h1 class="text-4xl font-bold mb-4">You are logged in!</h1>
            <p class="mb-8">
              <a href='/dashboard' class="text-blue-500 hover:text-blue-600">Go to Home</a>
            </p>
          </section>


        ) : (
          <section id="loginSec">
            <p
              ref={errRef}
              className={errMsg ? "errmsg" : "offscreen"}
              aria-live="assertive"
            >
              {errMsg}
            </p>
            <h1>Sign In</h1>
            <form onSubmit={handleSubmit} id="loginForm">
              <label htmlFor="username">Email:</label>
              <input
                type="text"
                id="username"
                ref={userRef}
                autoComplete="off"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
              />

              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                onChange={(e) => setPwd(e.target.value)}
                value={password}
                required
              />
              <button id="logbutton">Sign In</button>
            </form>
            <p>
              Need an Account?
              <span className="line">
                <a href="/register">Sign Up</a>
              </span>
            </p>
          </section>
        )}
      </div>
    </div>
  );
};

export default Login;
