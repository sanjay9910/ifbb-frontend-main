import React, { useState } from "react";
import Input from "./Input";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    dob: "",
    course: "",
    state: "",
    message: "",
    termsAccepted: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.termsAccepted) {
      alert("You must accept the terms.");
      return;
    }
    alert("submitted");
  };


  const inputDetails = [
    {
      label: "Name",
      name: "name",
      type: 'text',
      value: formData.name,
      placeholder: "Enter Your Name"
    }, {
      label: "Email",
      type: 'email', name: "email",
      value: formData.email,
      placeholder: "Enter Your email"
    },
    {
      label: "Phone Number",
      type: 'phone', name: "phone",
      value: formData.phone,
      placeholder: "Enter Your Phone number"
    },
    {
      label: "Date Of Birth",
      type: 'date', name: "dob",
      value: formData.dob,
      placeholder: "Enter Your DOB (dd-mm-yyyy)"
    },
    {
      label: "Selected Course",
      type: 'text', name: "course",
      value: formData.course,
      placeholder: "Select Course"
    },
    {
      label: "State",
      type: 'text', name: "state",
      value: formData.state,
      placeholder: "Enter your state"
    },
  ]


  return (
    <div className="max-w-4xl mx-auto max-md:px-8 px-6  py-16 sm:py-28">
      <h1 className="text-3xl font-bold text-center mb-2">Get in Touch with IFBB</h1>
      <p className="text-center text-zinc-600 mb-6">
        We’re Here to Help You on Your Fitness Journey. Reach Out to Us with Any
        Questions or to Schedule a Visit!
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">

        {inputDetails.map((detail, index) => (
          <Input key={index} detail={detail} handleChange={handleChange} />


        ))}



        <div>
          <label className="block mb-1 font-medium">Message</label>
          <textarea
            name="message"
            rows="4"
            value={formData.message}
            onChange={handleChange}
            required
            placeholder="Type your message..."
            className="w-full border  border-zinc-300 rounded resize-none px-3 py-2"
          />
        </div>

        <div className="flex items-center space-x-2">
          <input
            name="termsAccepted"
            type="checkbox"
            checked={formData.termsAccepted}
            onChange={handleChange}
            className="border rounded  "
          />
          <label className="text-sm">
            I accept the <a href="#" className="text-[#2424B9] underline">Terms</a>
          </label>
        </div>

        <button
          type="submit"
          className="bg-[#2424B9] hover:bg-blue-800 font-semibold text-white px-6 py-2 rounded"
        >
          Submit Now
        </button>
      </form>
    </div>
  );
};

export default Contact;
