import { useLoaderData, useNavigate } from "react-router";
import Countdown from "react-countdown";
import { ArrowLeft, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

// Utility: Load and parse from localStorage safely
const loadFoodsFromStorage = () => {
  try {
    const stored = localStorage.getItem("availableFoods");
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const MyRequestFood = () => {
  const navigate = useNavigate();
  const loadedFood = useLoaderData(); // may be one object or array
  const [foods, setFoods] = useState(loadFoodsFromStorage);

  // Normalize and merge loaded data on change
  useEffect(() => {
    if (!loadedFood) return;

    const newFoods = Array.isArray(loadedFood) ? loadedFood : [loadedFood];

    setFoods((prevFoods) => {
      const merged = [
        ...prevFoods,
        ...newFoods.filter((nf) => !prevFoods.some((f) => f._id === nf._id)),
      ];
      return merged;
    });
  }, [loadedFood]);

  // Save to localStorage whenever foods changes
  useEffect(() => {
    localStorage.setItem("availableFoods", JSON.stringify(foods));
  }, [foods]);

  // Delete a food from state and localStorage
  const handleDelete = (id) => {
    const updatedFoods = foods.filter((food) => food._id !== id);
    setFoods(updatedFoods);
    localStorage.setItem("availableFoods", JSON.stringify(updatedFoods));
  };

  // Countdown renderer
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
            donorImage,
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
                  title="Delete"
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
                    {new Date(requestDate).toLocaleString()}
                  </p>
                </div>

                <div className="flex items-center gap-4 mt-6">
                  <img
                    src={donorImage}
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
