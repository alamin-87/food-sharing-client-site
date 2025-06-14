import React, { useState } from "react";
import { Link, useLoaderData } from "react-router";
import Countdown from "react-countdown";
import { motion } from "framer-motion";

const AvailableFood = () => {
  const foods = useLoaderData();
  const [sortOrder, setSortOrder] = useState("asc");

  const sortedFoods = [...foods].sort((a, b) => {
    const dateA = new Date(a.expireDate);
    const dateB = new Date(b.expireDate);
    return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
  });

  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      return <span className="text-red-500 font-semibold">Expired</span>;
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
    <section className="py-10 px-4 min-h-screen transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        {/* Header + Sort Dropdown */}
        <div className="mb-6 flex justify-between items-center flex-wrap gap-4">
          <h2 className="text-3xl font-bold text-orange-600">
            Available Foods
          </h2>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="select select-bordered select-sm bg-white text-black transition-all"
          >
            <option value="asc">Sort by Expiry (Soonest First)</option>
            <option value="desc">Sort by Expiry (Latest First)</option>
          </select>
        </div>

        {/* Food Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedFoods.map((food, idx) => (
            <motion.div
              key={food._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="bg-base-100 text-base-content rounded-lg shadow-md border border-base-300 hover:shadow-2xl transition-shadow"
            >
              <img
                src={food.foodImage}
                alt={food.foodName}
                className="w-full h-52 object-cover rounded-t-lg"
              />
              <div className="p-4 space-y-2">
                <h3 className="text-xl font-bold text-orange-500">
                  {food.foodName}
                </h3>
                <p>
                  <strong>Quantity:</strong> {food.foodQuantity}
                </p>
                <p>
                  <strong>Pickup:</strong> {food.pickupLocation}
                </p>
                <p>
                  <strong>Expires In:</strong>{" "}
                  <Countdown
                    date={new Date(food.expireDate)}
                    renderer={({ days, hours, minutes, seconds, completed }) =>
                      completed ? (
                        <span className="text-error font-semibold">
                          Expired
                        </span>
                      ) : (
                        <span className="text-success font-medium">
                          {days > 0 && `${days}d `}
                          {hours}h {minutes}m {seconds}s
                        </span>
                      )
                    }
                  />
                </p>
                <p>
                  <strong>Notes:</strong> {food.additionalNotes || "None"}
                </p>

                {/* Donor Info */}
                <div className="flex items-center gap-3 mt-3">
                  <img
                    src={food.donorImage}
                    alt="Donor"
                    className="w-10 h-10 rounded-full border border-base-300"
                  />
                  <div>
                    <p className="font-medium">{food.donatorName}</p>
                    <p className="text-xs text-base-content/70">
                      {food.donatorEmail}
                    </p>
                  </div>
                </div>

                {/* View Details Button */}
                <div className="card-actions justify-end flex items-center">
                  <Link
                    to={`/foodDetail/${food._id}`}
                    className="btn btn-sm btn-outline btn-info"
                  >
                    👁️ See More
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AvailableFood;
