import { useRef, useState, useEffect } from "react";

import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import "./register.css";

const USER_REGEX = /^[A-Za-z0-9]{8}$/;
const USER_Name_REGEX = /^[a-zA-Z\s]+$/;
const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
//end point for the registration
// const REGISTER_URL = "/register";

const Register = () => {
  const userRef = useRef();
  // const nameRef = useRef();
  // const emailRef = useRef();
  const errRef = useRef();
  //state for user field
  const [user, setUser] = useState("");
  const [validId, setValidId] = useState(false);
  const [userFocus, setUserFocus] = useState(false);
  //NAME
  // const [user_name, setUser_name] = useState("");
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  // const [validName, setValidName] = useState(false);
  const [validFirstName, setValidFirstName] = useState(false);
  const [FirstnameFocus, setFirstnameFocus] = useState(false);
  const [validMiddleName, setValidMiddleName] = useState(false);
  const [MiddlenameFocus, setMiddlenameFocus] = useState(false);

  const [validLastName, setValidLastName] = useState(false);
  const [LastnameFocus, setLastnameFocus] = useState(false);
  //email
  const [email, setEmail] = useState("");
  const [validemail, setValidemail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  //state for pwd
  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);
  //state for confirm pwd
  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setValidId(USER_REGEX.test(user));
  }, [user]);
  // name
  useEffect(() => {
    setValidFirstName(USER_Name_REGEX.test(firstName));
  }, [firstName]);

  useEffect(() => {
    setValidMiddleName(USER_Name_REGEX.test(middleName));
  }, [middleName]);

  useEffect(() => {
    setValidLastName(USER_Name_REGEX.test(lastName));
  }, [lastName]);
  //email
  useEffect(() => {
    setValidemail(EMAIL_REGEX.test(email));
  }, [email]);
  //for password
  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);
  //for error message
  useEffect(() => {
    setErrMsg("");
  }, [user, pwd, matchPwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if button enabled with JS hack
    const v1 = USER_REGEX.test(user);
    const v2 = PWD_REGEX.test(pwd);
    const v3 = USER_Name_REGEX(firstName);
    if (!v1 || !v2 || !v3) {
      setErrMsg("Invalid Entry");
      return;
    }
    console.log(user, pwd);
    setSuccess(true);
    try {
      const response = await axios.post(
        "https://real-coal-production.up.railway.app/users/auth/register",
        JSON.stringify({ user, email, pwd }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(response?.data);
      console.log(response?.accessToken);
      console.log(JSON.stringify(response));
      setSuccess(true);
      //clear state and controlled inputs
      //need value attrib on inputs for this
      setUser("");
      setPwd("");
      setMatchPwd("");
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 409) {
        setErrMsg("Username Taken");
      } else {
        setErrMsg("Registration Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <div className="parent-container overflow-auto">
      <container id="newContainer">
        <img src="UMS.jpg" alt="" style={{ width: "30rem", margin: "auto" }} />
        <h1>SDU User Management System</h1>
      </container>
      <container id="logroot">
        {success ? (
          <section id="loginSec">
            <h1>Success!</h1>
            <p>
              <a href="/login">Sign In</a>
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
            <h1>Register Form</h1>
            <form onSubmit={handleSubmit} id="loginForm">
              <label htmlFor="username">
                Employee_ID:
                <FontAwesomeIcon
                  icon={faCheck}
                  className={validId ? "valid" : "hide"}
                />
                <FontAwesomeIcon
                  icon={faTimes}
                  className={validId || !user ? "hide" : "invalid"}
                />
              </label>
              <input
                type="text"
                id="username"
                ref={userRef}
                autoComplete="off"
                onChange={(e) => setUser(e.target.value)}
                value={user}
                placeholder="12345678"
                required
                aria-invalid={validId ? "false" : "true"}
                aria-describedby="uidnote"
                onFocus={() => setUserFocus(true)}
                onBlur={() => setUserFocus(false)}
              />
              <p
                id="uidnote"
                className={
                  userFocus && user && !validId ? "instructions" : "offscreen"
                }
              >
                <FontAwesomeIcon icon={faInfoCircle} />
                Must be 8 characters only.
                <br />
                Accepts only letters/ numbers.
              </p>
              {/* name */}
              <label htmlFor="firstName">
                First Name:
                <FontAwesomeIcon
                  icon={faCheck}
                  className={validFirstName ? "valid" : "hide"}
                />
                <FontAwesomeIcon
                  icon={faTimes}
                  className={validFirstName || !firstName ? "hide" : "invalid"}
                />
              </label>
              <input
                type="text"
                id="firstName"
                autoComplete="off"
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
                placeholder="First Name"
                required
                aria-invalid={validFirstName ? "false" : "true"}
                aria-describedby="usernamenote"
                onFocus={() => setFirstnameFocus(true)}
                onBlur={() => setFirstnameFocus(false)}
              />
              <p
                id="usernamenote"
                className={
                  FirstnameFocus && firstName && !validFirstName
                    ? "instructions"
                    : "offscreen"
                }
              >
                <FontAwesomeIcon icon={faInfoCircle} />
                Requirement
                <br />
                Must begin with a letter.
                <br />
                Accept letters only.
              </p>

              <label htmlFor="middleName">
                Middle Name:
                <FontAwesomeIcon
                  icon={faCheck}
                  className={validMiddleName ? "valid" : "hide"}
                />
                <FontAwesomeIcon
                  icon={faTimes}
                  className={
                    validMiddleName || !middleName ? "hide" : "invalid"
                  }
                />
              </label>
              <input
                type="text"
                id="middleName"
                autoComplete="off"
                onChange={(e) => setMiddleName(e.target.value)}
                value={middleName}
                placeholder="Middle Name"
                // required
                aria-invalid={validMiddleName ? "false" : "true"}
                aria-describedby="usernamenote"
                onFocus={() => setMiddlenameFocus(true)}
                onBlur={() => setMiddlenameFocus(false)}
              />
              <p
                id="usernamenote"
                className={
                  MiddlenameFocus && firstName && !validMiddleName
                    ? "instructions"
                    : "offscreen"
                }
              >
                <FontAwesomeIcon icon={faInfoCircle} />
                Requirement
                <br />
                Must begin with a letter.
                <br />
                Accept letters only.
              </p>

              <label htmlFor="lastName">
                Last Name:
                <FontAwesomeIcon
                  icon={faCheck}
                  className={validLastName ? "valid" : "hide"}
                />
                <FontAwesomeIcon
                  icon={faTimes}
                  className={validLastName || !lastName ? "hide" : "invalid"}
                />
              </label>
              <input
                type="text"
                id="lastName"
                autoComplete="off"
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
                placeholder="Last Name"
                // required
                aria-invalid={validLastName ? "false" : "true"}
                aria-describedby="usernamenote"
                onFocus={() => setLastnameFocus(true)}
                onBlur={() => setLastnameFocus(false)}
              />
              <p
                id="usernamenote"
                className={
                  LastnameFocus && firstName && !validLastName
                    ? "instructions"
                    : "offscreen"
                }
              >
                <FontAwesomeIcon icon={faInfoCircle} />
                Requirement
                <br />
                Must begin with a letter.
                <br />
                Accept letters only.
              </p>
              {/* email field */}
              <label htmlFor="email">
                Email:
                <FontAwesomeIcon
                  icon={faCheck}
                  className={validemail ? "valid" : "hide"}
                />
                <FontAwesomeIcon
                  icon={faTimes}
                  className={validemail || !email ? "hide" : "invalid"}
                />
              </label>
              <input
                type="text"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
                aria-invalid={validemail ? "false" : "true"}
                aria-describedby="emailnote"
                onFocus={() => setEmailFocus(true)}
                onBlur={() => setEmailFocus(false)}
              />

              <p
                id="emailnote"
                className={
                  emailFocus && !validemail ? "instructions" : "offscreen"
                }
              >
                <FontAwesomeIcon icon={faInfoCircle} />
                It must include
                <br />
                username (alphanumeric, dots, underscores, or hyphens), @
                symbol, domain (alphanumeric, dots, or hyphens), and a 2 to
                4-character.
              </p>
              {/* password */}
              <label htmlFor="password">
                Password:
                <FontAwesomeIcon
                  icon={faCheck}
                  className={validPwd ? "valid" : "hide"}
                />
                <FontAwesomeIcon
                  icon={faTimes}
                  className={validPwd || !pwd ? "hide" : "invalid"}
                />
              </label>
              <input
                type="password"
                id="password"
                onChange={(e) => setPwd(e.target.value)}
                value={pwd}
                required
                aria-invalid={validPwd ? "false" : "true"}
                aria-describedby="pwdnote"
                onFocus={() => setPwdFocus(true)}
                onBlur={() => setPwdFocus(false)}
              />
              {/* <input
                type={showPassword ? "text" : "password"}
                id="password"
                onChange={(e) => setPwd(e.target.value)}
                value={pwd}
                required
                aria-invalid={validPwd ? "false" : "true"}
                aria-describedby="pwdnote"
                onFocus={() => setPwdFocus(true)}
                onBlur={() => setPwdFocus(false)}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="password-toggle"
              >
                {showPassword ? "Hide" : "Show"}
              </button> */}
              <p
                id="pwdnote"
                className={pwdFocus && !validPwd ? "instructions" : "offscreen"}
              >
                <FontAwesomeIcon icon={faInfoCircle} />
                8 to 24 characters.
                <br />
                Must include uppercase and lowercase letters, a number and a
                special character.
                <br />
                Allowed special characters:{" "}
                <span aria-label="exclamation mark">!</span>{" "}
                <span aria-label="at symbol">@</span>{" "}
                <span aria-label="hashtag">#</span>{" "}
                <span aria-label="dollar sign">$</span>{" "}
                <span aria-label="percent">%</span>
              </p>

              <label htmlFor="confirm_pwd">
                Confirm Password:
                <FontAwesomeIcon
                  icon={faCheck}
                  className={validMatch && matchPwd ? "valid" : "hide"}
                />
                <FontAwesomeIcon
                  icon={faTimes}
                  className={validMatch || !matchPwd ? "hide" : "invalid"}
                />
              </label>
              <input
                type="password"
                id="confirm_pwd"
                onChange={(e) => setMatchPwd(e.target.value)}
                value={matchPwd}
                required
                aria-invalid={validMatch ? "false" : "true"}
                aria-describedby="confirmnote"
                onFocus={() => setMatchFocus(true)}
                onBlur={() => setMatchFocus(false)}
              />
              <p
                id="confirmnote"
                className={
                  matchFocus && !validMatch ? "instructions" : "offscreen"
                }
              >
                <FontAwesomeIcon icon={faInfoCircle} />
                Must match the first password input field.
              </p>

              <button
                id="logbutton"
                style={{
                  border:
                    validId && validPwd && validMatch
                      ? "2px solid green"
                      : "1px solid lightgray",
                  backgroundColor:
                    validId && validPwd && validMatch
                      ? "green"
                      : "rgb(2 132 199);",
                  color: validId && validPwd && validMatch ? "white" : "white",
                }}
                disabled={!validId || !validPwd || !validMatch ? true : false}
              >
                Sign Up
              </button>
            </form>
            <p>
              Already registered?
              <span className="line">
                <a href="/login">Sign In</a>
              </span>
            </p>
          </section>
        )}
      </container>
    </div>
  );
};

export default Register;
