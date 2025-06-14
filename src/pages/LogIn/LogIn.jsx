import React, { useRef, useContext } from "react";
import { NavLink, useLocation, useNavigate } from "react-router";
import {
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../../firebase/firebase.init";
import { Bounce, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import { AuthContext } from "../../context/AuthContext/AuthContext";

const LogIn = () => {
  const { loginUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const provider = new GoogleAuthProvider();
  const emailRef = useRef();

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    loginUser(email, password)
      .then((result) => {
        //  update last sign in to db
        const signInInfo = {
          email,
          lastSignInTime: result.user?.metadata?.lastSignInTime,
        };
        fetch("http://localhost:3000/users", {
          method: "PATCH",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(signInInfo),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            toast.success("Login Successful", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              transition: Bounce,
            });
          });
        navigate(location?.state || "/");
      })
      .catch((error) => {
        toast.error(`Login failed: ${error.message}`);
      });
  };

  const handleGoogleLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        const userProfile = {
          name: user.displayName,
          email: user.email,
          creationTime: user.metadata?.creationTime,
          lastSignInTime: user.metadata?.lastSignInTime,
        };
        // Step 1: Check if user already exists in MongoDB
        fetch(
          `http://localhost:3000/users?email=${user.email}`
        )
          .then((res) => res.json())
          .then((existingUser) => {
            if (existingUser && existingUser.length > 0) {
              // User already exists
              toast.info("Welcome back!");
              navigate(location?.state || "/");
            } else {
              // User does not exist, so insert new user
              fetch("http://localhost:3000/users", {
                method: "POST",
                headers: {
                  "content-type": "application/json",
                },
                body: JSON.stringify(userProfile),
              })
                .then((res) => res.json())
                .then((data) => {
                  if (data.insertedId) {
                    Swal.fire({
                      position: "top-end",
                      icon: "success",
                      title: "Your Profile has been created",
                      showConfirmButton: false,
                      timer: 1500,
                    });
                  }
                  navigate(location?.state || "/");
                })
                .catch((error) => {
                  console.error("DB save error:", error);
                  toast.error("Failed to save user to DB.");
                });
            }
          });
        console.log(result);
        // navigate(location?.state || "/");
        toast.success("Logged in with Google!");
      })
      .catch((error) => {
        toast.error(`Google login failed: ${error.message}`);
      });
  };

  const handleForgetPassword = () => {
    const email = emailRef.current?.value;
    if (!email) {
      toast.warn("Please enter your email first.");
      return;
    }

    sendPasswordResetEmail(auth, email)
      .then(() => {
        toast.success("Password reset email sent!");
      })
      .catch((error) => {
        toast.error(`Failed to send reset email: ${error.message}`);
      });
  };

  return (
    <>
      <ToastContainer />
      <div className="hero min-h-screen bg-base-200 px-4 mt-0">
        <div className="hero-content flex-col gap-10 w-full max-w-6xl">
          <div className="text-center lg:w-1/2">
            <h1 className="text-4xl lg:text-5xl font-bold">Login now!</h1>
            <p className="pt-6 text-base lg:text-lg max-w-md mx-auto">
              Log in to share meals, discover local dishes, and connect with
              food lovers in your community. Your next meaningful bite starts
              here.
            </p>
          </div>

          <div className="card w-full max-w-sm bg-base-100 shadow-2xl lg:w-1/2">
            <div className="card-body">
              <form onSubmit={handleLogin}>
                <label className="label">Email</label>
                <input
                  name="email"
                  type="email"
                  className="input input-bordered w-full"
                  placeholder="Email"
                  ref={emailRef}
                  required
                />
                <label className="label mt-2">Password</label>
                <input
                  name="password"
                  type="password"
                  className="input input-bordered w-full"
                  placeholder="Password"
                  required
                />
                <div className="text-right mt-2">
                  <button
                    type="button"
                    onClick={handleForgetPassword}
                    className="link link-hover text-sm text-blue-500"
                  >
                    Forgot password?
                  </button>
                </div>
                <button className="btn btn-neutral mt-4 w-full">Login</button>
              </form>

              <p className="text-sm text-center mt-4">
                Don't have an account?{" "}
                <NavLink className="text-blue-500 underline" to="/register">
                  Register
                </NavLink>
              </p>

              <button
                onClick={handleGoogleLogin}
                className="btn bg-white text-black border border-gray-300 mt-4 w-full"
              >
                <svg
                  aria-label="Google logo"
                  width="16"
                  height="16"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  className="mr-2"
                >
                  <g>
                    <path d="m0 0H512V512H0" fill="#fff"></path>
                    <path
                      fill="#34a853"
                      d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                    ></path>
                    <path
                      fill="#4285f4"
                      d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                    ></path>
                    <path
                      fill="#fbbc02"
                      d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                    ></path>
                    <path
                      fill="#ea4335"
                      d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                    ></path>
                  </g>
                </svg>
                Login with Google
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LogIn;
