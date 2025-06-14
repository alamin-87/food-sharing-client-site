import React, { useContext, useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router";
import { AuthContext } from "../../context/AuthContext/AuthContext";
import Countdown from "react-countdown";
import Swal from "sweetalert2";

const MyFood = () => {
  const initialFood = useLoaderData();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [foods, setFoods] = useState([]);

  // ⏳ Countdown renderer
  const renderCountdown = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      return <span className="text-red-600 font-semibold">Expired</span>;
    } else {
      return (
        <span className="text-green-600 font-medium">
          {days > 0 && `${days}d `} {hours}h {minutes}m {seconds}s
        </span>
      );
    }
  };

  // ✅ Filter user's requested foods
  useEffect(() => {
    if (user?.email && Array.isArray(initialFood)) {
      const myFoods = initialFood.filter(
        (food) => food.userEmail === user.email
      );
      setFoods(myFoods);
    }
  }, [user, initialFood]);

  // 🔄 Delete handler with SweetAlert2
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this request!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const res = await fetch(`http://localhost:3000/foods/${id}`, {
          method: "DELETE",
        });

        if (res.ok) {
          setFoods((prev) => prev.filter((food) => food._id !== id));
          Swal.fire("Deleted!", "Your request has been removed.", "success");
        } else {
          Swal.fire("Error!", "Failed to delete. Please try again.", "error");
        }
      } catch (err) {
        Swal.fire("Error!", "Something went wrong. Try later.", "error");
      }
    }
  };


  return (
    <section className="min-h-screen bg-base-200 p-6 text-base-content">
      <h2 className="text-3xl font-bold mb-6 text-center text-orange-500">
        My Requested Foods
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {foods.map((food) => (
          <div
            key={food._id}
            className="bg-base-100 border border-base-300 rounded-xl overflow-hidden shadow-lg"
          >
            <img
              src={food.foodImage}
              alt={food.foodName}
              className="w-full h-52 object-cover"
            />
            <div className="p-4 space-y-2">
              <h3 className="text-xl font-bold text-orange-500">
                {food.foodName}
              </h3>
              <p>
                <strong>Quantity:</strong> {food.foodQuantity}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                <span className="capitalize">{food.foodStatus}</span>
              </p>
              <p>
                <strong>Pickup Location:</strong> {food.pickupLocation}
              </p>
              <p>
                <strong>Expires:</strong>{" "}
                <Countdown
                  date={new Date(food.expireDate)}
                  renderer={renderCountdown}
                />
              </p>
              <p>
                <strong>Additional Notes:</strong> {food.additionalNotes}
              </p>
              <p>
                <strong>Donor:</strong> {food.donatorName} ({food.donatorEmail})
              </p>
              <p>
                <strong>Requested By:</strong> {food.userName} ({food.userEmail}
                )
              </p>
              <p>
                <strong>Request Date:</strong>{" "}
                {new Date(food.requestDate).toLocaleString()}
              </p>

              <div className="flex items-center gap-3 mt-3">
                <img
                  src={food.donatorImg}
                  alt={food.donatorName}
                  className="w-10 h-10 rounded-full border border-base-300"
                />
                <span className="text-sm font-medium">{food.donatorName}</span>
              </div>

              <div className="flex justify-between mt-4">
                <button
                  onClick={() => navigate(`/updateFood/${food._id}`)}
                  className="btn btn-sm btn-outline btn-warning"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(food._id)}
                  className="btn btn-sm btn-outline btn-error"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MyFood;
