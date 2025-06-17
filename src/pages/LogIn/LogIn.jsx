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

  // Get Firebase ID token from current user
  const getIdToken = async () => {
    const user = auth.currentUser;
    if (user) {
      return await user.getIdToken(true);
    }
    return null;
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    loginUser(email, password)
      .then(async (result) => {
        const token = await getIdToken();
        if (!token) throw new Error("Failed to get ID token");
        // ✅ Store the token
        localStorage.setItem("auth-token", token);

        const signInInfo = {
          email,
          lastSignInTime: result.user.metadata.lastSignInTime,
        };

        fetch("https://server-site-alpha-umber.vercel.app/users", {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(signInInfo),
        })
          .then((res) => {
            if (!res.ok) {
              throw new Error("Failed to update last sign-in time");
            }
            return res.json();
          })
          .then(() => {
            toast.success("Login Successful", {
              position: "top-right",
              autoClose: 5000,
              theme: "light",
              transition: Bounce,
            });
            navigate(location?.state || "/");
          })
          .catch((err) => {
            toast.error(err.message);
          });
      })
      .catch((error) => {
        toast.error(`Login failed: ${error.message}`);
      });
  };

  const handleGoogleLogin = () => {
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const user = result.user;
        const token = await getIdToken();
        if (!token) throw new Error("Failed to get ID token");

        const userProfile = {
          name: user.displayName,
          email: user.email,
          creationTime: user.metadata.creationTime,
          lastSignInTime: user.metadata.lastSignInTime,
        };

        fetch(`https://server-site-alpha-umber.vercel.app/users?email=${user.email}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
          .then((res) => res.json())
          .then(async (existingUsers) => {
            if (existingUsers?.length > 0) {
              toast.info("Welcome back!");
              navigate(location?.state || "/");
            } else {
              const postRes = await fetch("https://server-site-alpha-umber.vercel.app/users", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(userProfile),
              });
              if (!postRes.ok) {
                throw new Error("Failed to create user");
              }
              const postData = await postRes.json();
              if (postData.insertedId) {
                Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: "Your Profile has been created",
                  showConfirmButton: false,
                  timer: 1500,
                });
              }
              navigate(location?.state || "/");
            }
          })
          .catch((err) => {
            toast.error("Failed to verify user or create profile");
            console.error(err);
          });
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


