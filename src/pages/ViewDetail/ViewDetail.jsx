import React from "react";
import { Link, useLoaderData, useNavigate } from "react-router";
import Countdown from "react-countdown";
import { ArrowLeft } from "lucide-react";

const ViewDetail = () => {
  const food = useLoaderData();
  const navigate = useNavigate();

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
                <strong>Requested By:</strong> {userName} ({userEmail})
              </p>
              <p>
                <strong>Request Date:</strong>{" "}
                {new Date(requestDate).toLocaleString()}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 mt-6">
            <img
              src={donorImage}
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
          <Link
            to={`/myFoodRequest/${food._id}`}
            // onClick={() => handleRequestClick(food._id)}
            className="btn btn-primary btn-sm w-full"
          >
            {"Request Now"}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ViewDetail;
