import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext/AuthContext";
import { toast } from "react-toastify";

const AddFood = () => {
  const { user } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const foodData = {
      foodName: form.foodName.value,
      foodQuantity: form.foodQuantity.value,
      donatorName: form.donatorName.value,
      donatorImg: form.donatorImg.value,
      donatorEmail: form.donatorEmail.value,
      foodImage: form.foodImage.value,
      pickupLocation: form.pickupLocation.value,
      expireDate: form.expireDate.value,
      additionalNotes: form.additionalNotes.value,
      foodStatus: form.foodStatus.value,
      userEmail: user.email,
      userName: user.displayName,
    };

    try {
      const token = await user.getIdToken(); // 🔐 get Firebase token

      const res = await fetch("https://server-site-alpha-umber.vercel.app/foods", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // 🔐 send token in header
        },
        body: JSON.stringify(foodData),
      });

      const data = await res.json();

      if (res.ok && data.insertedId) {
        toast.success("Food data added successfully!");
        form.reset();
      } else {
        toast.error(data.message || "Failed to add food data");
      }
    } catch (error) {
      console.error("Error submitting food:", error);
      toast.error("Submission failed: " + error.message);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Submit Food Details</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="foodName"
          placeholder="Food Name"
          className="input input-bordered w-full"
          required
        />
        <input
          type="text"
          name="foodImage"
          placeholder="Image URL"
          className="input input-bordered w-full"
          required
        />
        <input
          type="text"
          name="foodQuantity"
          placeholder="Quantity"
          className="input input-bordered w-full"
          required
        />
        <input
          type="text"
          name="donatorName"
          placeholder="Donator Name"
          className="input input-bordered w-full"
          required
        />
        <input
          type="email"
          name="donatorEmail"
          placeholder="Donator Email"
          className="input input-bordered w-full"
          required
        />
        <input
          type="text"
          name="donatorImg"
          placeholder="Donator Img URL"
          className="input input-bordered w-full"
        />
        <input
          type="text"
          name="pickupLocation"
          placeholder="Pickup Location"
          className="input input-bordered w-full"
          required
        />
        <input
          type="datetime-local"
          name="expireDate"
          className="input input-bordered w-full"
          required
        />
        <textarea
          name="additionalNotes"
          placeholder="Additional Notes"
          className="textarea textarea-bordered w-full"
        />
        <select
          name="foodStatus"
          className="select select-bordered w-full"
          required
        >
          <option value="available">Available</option>
          <option value="expired">Expired</option>
        </select>

        {/* Read-only user info */}
        <input
          type="text"
          value={user?.displayName || ""}
          readOnly
          className="input input-bordered w-full bg-gray-100"
          placeholder="User Name"
        />
        <input
          type="email"
          value={user?.email || ""}
          readOnly
          className="input input-bordered w-full bg-gray-100"
          placeholder="User Email"
        />

        <button type="submit" className="btn btn-primary w-full">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddFood;
