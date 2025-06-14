import React from "react";
import { motion } from "framer-motion";
import { FaRecycle, FaShieldAlt, FaUsers } from "react-icons/fa";
import { MdHowToReg, MdListAlt, MdConnectWithoutContact } from "react-icons/md";

const ChooseUs = () => {
  const benefits = [
    {
      icon: <FaShieldAlt className="text-4xl text-orange-500" />,
      title: "Verified & Safe",
      desc: "All donations are screened for safety and hygiene to ensure trust.",
    },
    {
      icon: <FaRecycle className="text-4xl text-orange-500" />,
      title: "Sustainable Impact",
      desc: "We minimize waste and maximize food redistribution in local communities.",
    },
    {
      icon: <FaUsers className="text-4xl text-orange-500" />,
      title: "Stronger Community",
      desc: "Every donation builds a better, more connected community.",
    },
  ];

  return (
    <>
      <section className="py-20 bg-gradient-to-r from-orange-50 via-white to-orange-50">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-extrabold text-orange-600 mb-12">
            Why Choose DishDrop?
          </h2>
          <div className="grid md:grid-cols-3 gap-10">
            {benefits.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.2 }}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-orange-200 transition"
              >
                <div className="mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default ChooseUs;
