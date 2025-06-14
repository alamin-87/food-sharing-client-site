import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext/AuthContext";
import { useLoaderData, useNavigate } from "react-router";
import Swal from "sweetalert2";

const UpdateFood = () => {
  const { user } = useContext(AuthContext);
  const {
    _id,
    foodName,
    foodImage,
    foodQuantity,
    donatorImg,
    donatorName,
    donatorEmail,
    // requestDate,
    pickupLocation,
    expireDate,
    additionalNotes,
    foodStatus,
  } = useLoaderData();
  const navigate = useNavigate();

  const handelUpdateFood = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const updatedFood = Object.fromEntries(formData.entries());

    fetch(`http://localhost:3000/foods/${_id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updatedFood),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Tip updated successfully!",
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            navigate("/myFood");
          });
        }
      });
  };

  return (
    <>
      <div className="max-w-xl mx-auto p-6 bg-white rounded shadow">
        <h2 className="text-2xl font-bold mb-4">Update Your Food</h2>
        <form onSubmit={handelUpdateFood} className="space-y-4">
          <input
            type="text"
            name="foodName"
            defaultValue={foodName}
            placeholder="Food Name"
            className="input input-bordered w-full"
          />

          <input
            type="text"
            name="foodImage"
            defaultValue={foodImage}
            placeholder="Image URL"
            className="input input-bordered w-full"
          />

          <input
            type="text"
            name="foodQuantity"
            defaultValue={foodQuantity}
            placeholder="Quantity"
            className="input input-bordered w-full"
          />

          <input
            type="text"
            name="donatorName"
            defaultValue={donatorName}
            placeholder="Donator Name"
            className="input input-bordered w-full"
          />

          <input
            type="email"
            name="donatorEmail"
            defaultValue={donatorEmail}
            placeholder="Donator Email"
            className="input input-bordered w-full"
          />
          <input
            type="text"
            name="donatorImg"
            defaultValue={donatorImg}
            placeholder="Donator IMG URL"
            className="input input-bordered w-full"
          />

          <input
            type="text"
            name="pickupLocation"
            defaultValue={pickupLocation}
            placeholder="Pickup Location"
            className="input input-bordered w-full"
          />

          <input
            type="datetime-local"
            name="expireDate"
            defaultValue={expireDate}
            className="input input-bordered w-full"
          />

          <textarea
            name="additionalNotes"
            defaultValue={additionalNotes}
            placeholder="Additional Notes"
            className="textarea textarea-bordered w-full"
          />

          <select
            name="foodStatus"
            defaultValue={foodStatus}
            className="select select-bordered w-full"
          >
            <option value="available">Available</option>
            <option value="expired">Expired</option>
          </select>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              value={user?.email || "Not logged in"}
              className="input input-bordered w-full"
              readOnly
            />
            <input
              type="text"
              value={user?.displayName || "Not logged in"}
              className="input input-bordered w-full"
              readOnly
            />
          </div>

          <div className="flex flex-col gap-4 mt-4">
            <button type="submit" className="btn btn-success w-full">
              Update Tip
            </button>
            <button
              type="button"
              onClick={() => navigate("/myFood")}
              className="btn btn-outline btn-warning w-full"
            >
              Cancel & Go Back
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default UpdateFood;
