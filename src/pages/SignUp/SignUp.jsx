import React, { useContext } from "react";
import { NavLink, useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { auth } from "../../firebase/firebase.init";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import Swal from "sweetalert2";
import { AuthContext } from "../../context/AuthContext/AuthContext";

const SignUp = () => {
  const { createUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();
  const location = useLocation();

  const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const { email, password, ...rest } = Object.fromEntries(formData.entries());

    if (!email || !password) {
      return toast.error("Email and password are required");
    }

    try {
      const result = await createUser(email, password);
      const user = result.user;
      const token = await user.getIdToken();

      const userProfile = {
        email,
        ...rest,
        creationTime: user.metadata?.creationTime,
        lastSignInTime: user.metadata?.lastSignInTime,
      };

      const res = await fetch(`http://localhost:3000/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(userProfile),
      });

      const data = await res.json();
      if (res.ok && data.insertedId) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your Profile has been created",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/login");
      } else {
        toast.error(data.message || "Signup failed");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Signup failed");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const token = await user.getIdToken();

      const userProfile = {
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        creationTime: user.metadata?.creationTime,
        lastSignInTime: user.metadata?.lastSignInTime,
      };

      const res = await fetch(`http://localhost:3000/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(userProfile),
      });

      const data = await res.json();

      if (res.ok && data.insertedId) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your Profile has been created",
          showConfirmButton: false,
          timer: 1500,
        });
      }

      toast.success("Logged in with Google!");
      navigate(location?.state?.from || "/");
    } catch (error) {
      toast.error(`Google login failed: ${error.message}`);
    }
  };

  return (
    <div className="hero min-h-screen bg-base-200 px-4">
      <div className="hero-content flex-col justify-center items-center gap-10 w-full max-w-6xl">
        <div className="text-center  lg:w-1/2">
          <h1 className="text-4xl lg:text-5xl font-bold">Register now!</h1>
          <p className="pt-6 text-base lg:text-lg max-w-md mx-auto">
            Reduce food waste, share extra meals, and connect with a community
            that cares. Start making a difference—one dish at a time.
          </p>
        </div>

        <div className="card w-full max-w-sm bg-base-100 shadow-2xl lg:w-1/2">
          <div className="card-body">
            <form onSubmit={handleRegister}>
              <label className="label">Name</label>
              <input
                name="name"
                type="text"
                className="input input-bordered w-full"
                placeholder="Name"
              />
              <label className="label">Photo URL</label>
              <input
                name="photoURL"
                type="text"
                className="input input-bordered w-full"
                placeholder="Photo URL"
                required
              />
              <label className="label mt-2">Email</label>
              <input
                name="email"
                type="email"
                className="input input-bordered w-full"
                placeholder="Email"
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
              <button className="btn btn-neutral mt-4 w-full" type="submit">
                Register
              </button>
            </form>

            <p className="text-sm text-center mt-4">
              Already have an account?{" "}
              <NavLink className="text-blue-500 underline" to="/signIn">
                Login
              </NavLink>
            </p>
            <button
              onClick={handleGoogleLogin}
              className="btn bg-white text-black border border-gray-300 mt-4 w-full"
            >
              {/* Google SVG icon */}
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
  );
};

export default SignUp;
