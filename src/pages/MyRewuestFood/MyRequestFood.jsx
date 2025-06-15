import { useLoaderData, useNavigate } from "react-router";
import Countdown from "react-countdown";
import { ArrowLeft, Trash2 } from "lucide-react";
import { useState } from "react";
import Swal from "sweetalert2";

// Countdown renderer function
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

const MyRequestFood = () => {
  const navigate = useNavigate();
  const initialFoods = useLoaderData() || [];
  const [foods, setFoods] = useState(
    Array.isArray(initialFoods) ? initialFoods : [initialFoods]
  );

  // Delete handler
  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This request will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        const res = await fetch(`http://localhost:3000/requestedFoods/${id}`, {
          method: "DELETE",
        });

        if (res.ok) {
          const result = await res.json();
          if (result.deletedCount > 0) {
            setFoods((prevFoods) =>
              prevFoods.filter((food) => food._id !== id)
            );
            Swal.fire(
              "Deleted!",
              "The food request has been removed.",
              "success"
            );
          }
        } else {
          throw new Error("Failed to delete");
        }
      } catch (error) {
        Swal.fire("Error!", error.message, "error");
      }
    }
  };

  if (!foods.length) {
    return <div className="p-10 text-center">No requested food found.</div>;
  }

  return (
    <section className="min-h-screen px-4 py-10 bg-base-200 text-base-content">
      <div className="max-w-6xl mx-auto grid gap-10 md:grid-cols-2">
        {foods.filter(Boolean).map((food) => {
          if (!food?._id) return null;

          const {
            _id,
            foodName,
            foodImage,
            foodQuantity,
            donatorImg,
            donatorName,
            donatorEmail,
            requestDate,
            pickupLocation,
            expireDate,
            additionalNotes,
            foodStatus,
            requestName,
            requestEmail,
          } = food;

          return (
            <div
              key={_id}
              className="bg-base-100 shadow-xl rounded-lg border border-base-300 overflow-hidden"
            >
              <div className="relative">
                <img
                  src={foodImage}
                  alt={foodName}
                  className="w-full h-64 object-cover"
                />
                <button
                  onClick={() => navigate(-1)}
                  className="absolute top-4 left-4 bg-white text-black p-2 rounded-full shadow hover:scale-105 transition"
                >
                  <ArrowLeft size={20} />
                </button>

                <button
                  onClick={() => handleDelete(_id)}
                  className="absolute top-4 right-4 bg-red-500 text-white p-2 rounded-full shadow hover:bg-red-600 transition"
                >
                  <Trash2 size={20} />
                </button>
              </div>

              <div className="p-6 space-y-4">
                <h2 className="text-2xl font-bold text-orange-500">
                  {foodName}
                </h2>

                <div className="space-y-1">
                  <p>
                    <strong>Quantity:</strong> {foodQuantity}
                  </p>
                  <p>
                    <strong>Pickup Location:</strong> {pickupLocation}
                  </p>
                  <p>
                    <strong>Expires In:</strong>{" "}
                    <Countdown
                      date={new Date(expireDate)}
                      renderer={renderer}
                    />
                  </p>
                  <p>
                    <strong>Additional Notes:</strong>{" "}
                    {additionalNotes || "N/A"}
                  </p>
                </div>

                <div className="space-y-1">
                  <p>
                    <strong>Status:</strong>{" "}
                    <span className="capitalize">{foodStatus}</span>
                  </p>
                  <p>
                    <strong>Requested By:</strong>{" "}
                    {requestName && requestEmail
                      ? `${requestName} (${requestEmail})`
                      : "N/A"}
                  </p>
                  <p>
                    <strong>Request Date:</strong>{" "}
                    {requestDate
                      ? new Date(requestDate).toLocaleString()
                      : "N/A"}
                  </p>
                </div>

                <div className="flex items-center gap-4 mt-6">
                  <img
                    src={donatorImg}
                    alt="Donor"
                    className="w-12 h-12 rounded-full border"
                  />
                  <div>
                    <p className="font-semibold">{donatorName}</p>
                    <p className="text-sm text-base-content/70">
                      {donatorEmail}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default MyRequestFood;
