import React, { useContext, useState } from "react";
import { useLoaderData, useNavigate } from "react-router";
import Countdown from "react-countdown";
import { ArrowLeft } from "lucide-react";
import Swal from "sweetalert2";
import { AuthContext } from "../../context/AuthContext/AuthContext";

const ViewDetail = () => {
  const { user } = useContext(AuthContext);
  const food = useLoaderData();
  const navigate = useNavigate();

  // Local state to reflect live changes
  const [currentFood, setCurrentFood] = useState(food);

  const {
    _id,
    foodName,
    foodImage,
    foodQuantity,
    donatorImg,
    donatorName,
    donatorEmail,
    userName,
    userEmail,
    requestDate,
    pickupLocation,
    expireDate,
    additionalNotes,
    foodStatus,
  } = currentFood;

  const handelUpdateFood = (id, isRequested) => {
    const updatedFood = isRequested
      ? {
          requestDate: null,
          foodStatus: "available",
          userName: null,
          userEmail: null,
        }
      : {
          requestDate: new Date().toISOString(),
          foodStatus: "requested",
          userName: user?.displayName,
          userEmail: user?.email,
        };

    fetch(`http://localhost:3000/foods/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedFood),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount) {
          // Update local state
          setCurrentFood((prev) => ({
            ...prev,
            ...updatedFood,
          }));

          Swal.fire({
            position: "top-end",
            icon: "success",
            title: isRequested
              ? "Request cancelled successfully!"
              : "Request sent successfully!",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((error) => {
        console.error("Update failed:", error);
      });
  };

  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      return <span className="text-red-600 font-semibold">Expired</span>;
    } else {
      return (
        <span className="text-green-600 font-medium">
          {days > 0 && `${days}d `}
          {hours}h {minutes}m {seconds}s
        </span>
      );
    }
  };

  return (
    <section className="min-h-screen px-4 py-10 bg-base-200 text-base-content transition-colors duration-300">
      <div className="max-w-4xl mx-auto bg-base-100 shadow-lg rounded-lg overflow-hidden border border-base-300">
        <div className="relative">
          <img
            src={foodImage}
            alt={foodName}
            className="w-full h-72 object-cover"
          />
          <button
            onClick={() => navigate(-1)}
            className="absolute top-4 left-4 bg-white text-black dark:bg-gray-800 dark:text-white p-2 rounded-full shadow hover:scale-105 transition"
          >
            <ArrowLeft size={20} />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <h2 className="text-3xl font-bold text-orange-500">{foodName}</h2>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <p>
                <strong>Quantity:</strong> {foodQuantity}
              </p>
              <p>
                <strong>Pickup Location:</strong> {pickupLocation}
              </p>
              <p>
                <strong>Expires In:</strong>{" "}
                <Countdown date={new Date(expireDate)} renderer={renderer} />
              </p>
              <p>
                <strong>Additional Notes:</strong> {additionalNotes}
              </p>
            </div>

            <div>
              <p>
                <strong>Status:</strong>{" "}
                <span className="capitalize">{foodStatus}</span>
              </p>
              <p>
                <strong>Requested By:</strong>{" "}
                {userName ? `${userName} (${userEmail})` : "Not yet requested"}
              </p>
              <p>
                <strong>Request Date:</strong>{" "}
                {requestDate ? new Date(requestDate).toLocaleString() : "N/A"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 mt-6">
            <img
              src={donatorImg}
              alt="Donor"
              className="w-14 h-14 rounded-full border border-base-300"
            />
            <div>
              <p className="font-semibold">{donatorName}</p>
              <p className="text-sm text-base-content/70">{donatorEmail}</p>
            </div>
          </div>
        </div>

        <div className="p-2">
          <button
            onClick={() => handelUpdateFood(_id, foodStatus === "requested")}
            className={`btn btn-sm w-full ${
              foodStatus === "requested" ? "btn-warning" : "btn-primary"
            }`}
          >
            {foodStatus === "requested" ? "Cancel Request" : "Request Now"}
          </button>
        </div>
      </div>
    </section>
  );
};

export default ViewDetail;
