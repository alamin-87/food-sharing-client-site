import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import Countdown from "react-countdown";

const FeaturedFoods = () => {
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/foods")
      .then((res) => res.json())
      .then((data) => setFoods(data.slice(0, 6)))
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  if (foods.length === 0) {
    return <p className="text-center mt-10 text-base-content">Loading featured foods...</p>;
  }

  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      return <span className="text-red-600 font-semibold">Expired</span>;
    } else {
      return (
        <span className="text-green-600 font-medium">
          {hours}h {minutes}m {seconds}s
        </span>
      );
    }
  };

  return (
    <section className="py-12 bg-base-200 text-base-content">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-6 text-orange-600">Featured Foods</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {foods.map((food, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="card bg-base-100 shadow-xl border border-base-300 hover:shadow-2xl transition-shadow"
            >
              <figure>
                <img
                  src={food.foodImage}
                  alt={food.foodName}
                  className="w-full h-52 object-cover rounded-t-lg"
                />
              </figure>
              <div className="card-body p-4 space-y-2">
                <h3 className="text-xl font-bold text-orange-500">{food.foodName}</h3>
                <p><strong>Quantity:</strong> {food.foodQuantity}</p>
                <p><strong>Pickup:</strong> {food.pickupLocation}</p>
                <p>
                  <strong>Expires In:</strong>{" "}
                  <Countdown date={new Date(food.expireDate)} renderer={renderer} />
                </p>
                <p><strong>Notes:</strong> {food.additionalNotes || "None"}</p>

                <div className="flex items-center gap-3 mt-2">
                  <img
                    src={food.donorImage}
                    alt="Donor"
                    className="w-10 h-10 rounded-full border"
                  />
                  <div>
                    <p className="font-medium">{food.donatorName}</p>
                    <p className="text-xs text-gray-500">{food.donatorEmail}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link to="/availableFoods">
            <button className="btn btn-outline btn-warning">Show All</button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedFoods;
