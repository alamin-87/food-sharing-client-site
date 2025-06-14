import React from "react";
import { motion } from "framer-motion";
import { FaRecycle, FaShieldAlt, FaUsers } from "react-icons/fa";
import { MdHowToReg, MdListAlt, MdConnectWithoutContact } from "react-icons/md";

const Works = () => {
  const steps = [
    {
      icon: <MdHowToReg className="text-5xl text-green-500" />,
      title: "Register",
      desc: "Sign up quickly to start donating or requesting food.",
    },
    {
      icon: <MdListAlt className="text-5xl text-yellow-500" />,
      title: "List Food",
      desc: "Add details of surplus food and set the pickup location.",
    },
    {
      icon: <MdConnectWithoutContact className="text-5xl text-blue-500" />,
      title: "Connect",
      desc: "We match you with someone in need, ensuring smooth handover.",
    },
  ];
  return (
    <>
      <section className="py-20 bg-base-200 text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-extrabold text-orange-600 mb-12">
            How It Works
          </h2>
          <div className="flex flex-col md:flex-row justify-center gap-10">
            {steps.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4, delay: idx * 0.2 }}
                className="bg-white rounded-2xl p-8 w-full md:w-1/3 shadow-md hover:shadow-lg transition"
              >
                <div className="mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
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

export default Works;
