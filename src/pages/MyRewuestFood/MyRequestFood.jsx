import { useLoaderData, useNavigate } from "react-router";
import Countdown from "react-countdown";
import { ArrowLeft, Trash2 } from "lucide-react";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext/AuthContext";

const MyRequestFood = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [foods, setFoods] = useState([]);

  // Load fresh data from backend
  const loadRequestedFoods = () => {
    fetch(`http://localhost:3000/foods?userEmail=${user?.email}`)
      .then((res) => res.json())
      .then((data) => setFoods(data))
      .catch((err) => console.error("Fetch failed:", err));
  };

  useEffect(() => {
    if (user?.email) {
      loadRequestedFoods();
    }
  }, [user]);

  const handleDelete = (id) => {
    fetch(`http://localhost:3000/foods/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        requestDate: null,
        foodStatus: "available",
        userName: null,
        userEmail: null,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount) {
          loadRequestedFoods(); // Refresh list
        }
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

  if (!foods.length) {
    return <div className="p-10 text-center">No requested food found.</div>;
  }

  return (
    <section className="min-h-screen px-4 py-10 bg-base-200 text-base-content">
      <div className="max-w-6xl mx-auto grid gap-10 md:grid-cols-2">
        {foods.map((food) => {
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
                  className="absolute top-4 right-4 bg-red-600 text-white p-2 rounded-full shadow hover:bg-red-700 transition"
                  title="Cancel Request"
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
                    <strong>Additional Notes:</strong> {additionalNotes}
                  </p>
                </div>

                <div className="space-y-1">
                  <p>
                    <strong>Status:</strong>{" "}
                    <span className="capitalize">{foodStatus}</span>
                  </p>
                  <p>
                    <strong>Requested By:</strong> {userName} ({userEmail})
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
