
import React, { useState } from "react";
import axios from "axios";

const CreateNew = ({ closeModal }) => {
  const [file, setFile] = useState(null);
  const [formValues, setFormValues] = useState({
    name: '',
    mobile: '',
    email: '',
    date: '',
    insuranceType: '',
    renewalType: '',
    vehicleType: '',
    vehicleRegNo: '',
    vehicleDate: '',
    makeModel: '',
    premiumAmount: '',
    paymentMode: '',
    agentName: '',
    agentContact: '',
    agentEmail: '',
  });

  const [errors, setErrors] = useState({});

  // Handle file upload
  const handleFileUpload = (event) => {
    setFile(event.target.files[0]);
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));

    // Update error state if the input is cleared
    if (value.length === 0) {
      setErrors((prev) => ({ ...prev, [name]: true }));
    } else {
      // Remove error for this field if it has a value
      setErrors((prev) => ({ ...prev, [name]: false }));
    }
  };

  // Validate form fields
  const validateFields = () => {
    const newErrors = {};
    Object.keys(formValues).forEach((key) => {
      if (!formValues[key]) {
        newErrors[key] = true; // Set error if field is empty
      }
    });
    if (!file) {
      newErrors.file = true; // Check if a file is uploaded
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateFields()) {
      alert("Please fill in all fields.");
      return;
    }

    // Prepare form data for submission
    const dataToSubmit = {
      ...formValues,
      // If you want to include the file, you might need to handle that differently (e.g., via FormData)
      // file, // Uncomment this if you want to handle file upload
    };

    try {
      const token = localStorage.getItem('token'); // Assuming token is stored in local storage
      const response = await axios.post('http://localhost:5000/save-user-data', dataToSubmit, {
        headers: {
          Authorization: `Bearer ${token}`,  // Include token in headers
        },
      });
      alert(response.data.message); // Notify the user of the success
      // Optionally close modal or reset state here
      closeModal(); // Call closeModal if you want to close the modal after submission
    } catch (error) {
      alert(error.response?.data?.error || "An error occurred while saving data.");
    }

    // Reset form values and errors after submission if needed
    setFormValues({
      name: '',
      mobile: '',
      email: '',
      date: '',
      insuranceType: '',
      renewalType: '',
      vehicleType: '',
      vehicleRegNo: '',
      vehicleDate: '',
      makeModel: '',
      premiumAmount: '',
      paymentMode: '',
      agentName: '',
      agentContact: '',
      agentEmail: '',
    });
    setErrors({});
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-sky-50 rounded-lg shadow-lg sm:w-3/4 h-5/6 relative overflow-hidden">
        <div className="p-6 h-full flex flex-col">
          {/* Header */}
          <header className="flex justify-between items-center border-b pb-4 ">
            <h2 className="text-xl font-semibold text-gray-700">Insurance Form</h2>
            <span
              className="text-gray-600 text-2xl font-bold cursor-pointer hover:text-red-600 transition"
              onClick={closeModal}
            >
              &times;
            </span>
          </header>

          {/* Form Section */}
          <form className="overflow-y-auto mt-6 px-2 flex-grow" onSubmit={handleSubmit}>
            {/* Customer Details */}
            <section className="mb-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Customer Details</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="w-full max-w-sm min-w-[150px]">
                  <input
                    type="text"
                    name="name"
                    value={formValues.name}
                    onChange={handleChange}
                    placeholder="Name"
                    className={`w-full bg-transparent placeholder:text-gray-400 text-gray-700 text-sm border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-blue-600 hover:border-gray-600 shadow-sm focus:shadow`}
                    required
                  />
                  {errors.name && <p className="text-red-500 text-sm">Name is mandatory</p>}
                </div>

                <div className="w-full max-w-sm min-w-[150px]">
                  <input
                    type="text"
                    name="mobile"
                    value={formValues.mobile}
                    onChange={handleChange}
                    placeholder="Mobile No"
                    className={`w-full bg-transparent placeholder:text-gray-400 text-gray-700 text-sm border ${errors.mobile ? 'border-red-500' : 'border-gray-300'} rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-blue-600 hover:border-gray-600 shadow-sm focus:shadow`}
                    required
                  />
                  {errors.mobile && <p className="text-red-500 text-sm">Mobile No is mandatory</p>}
                </div>

                <div className="w-full max-w-sm min-w-[150px]">
                  <input
                    type="email"
                    name="email"
                    value={formValues.email}
                    onChange={handleChange}
                    placeholder="Email ID"
                    className={`w-full bg-transparent placeholder:text-gray-400 text-gray-700 text-sm border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-blue-600 hover:border-gray-600 shadow-sm focus:shadow`}
                    required
                  />
                  {errors.email && <p className="text-red-500 text-sm">Email ID is mandatory</p>}
                </div>
              </div>
            </section>

            {/* Policy Details */}
            <section className="mb-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Policy Details</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="w-full max-w-sm min-w-[150px]">
                  <input
                    type="date"
                    name="date"
                    value={formValues.date}
                    onChange={handleChange}
                    className={`w-full bg-transparent placeholder:text-gray-400 text-gray-700 text-sm border ${errors.date ? 'border-red-500' : 'border-gray-300'} rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-blue-600 hover:border-gray-600 shadow-sm focus:shadow`}
                    required
                  />
                  {errors.date && <p className="text-red-500 text-sm">Date is mandatory</p>}
                </div>

                <div className="w-full max-w-sm min-w-[150px]">
                  <select
                    name="insuranceType"
                    value={formValues.insuranceType}
                    onChange={handleChange}
                    className={`w-full bg-transparent placeholder:text-gray-400 text-gray-700 text-sm border ${errors.insuranceType ? 'border-red-500' : 'border-gray-300'} rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-blue-600 hover:border-gray-600 shadow-sm focus:shadow`}
                    required
                  >
                    <option value="">Select Insurance Type</option>
                    <option value="Comprehensive">Comprehensive</option>
                    <option value="Third-Party">Third-Party</option>
                  </select>
                  {errors.insuranceType && <p className="text-red-500 text-sm">Insurance Type is mandatory</p>}
                </div>

                <div className="w-full max-w-sm min-w-[150px]">
                  <select
                    name="renewalType"
                    value={formValues.renewalType}
                    onChange={handleChange}
                    className={`w-full bg-transparent placeholder:text-gray-400 text-gray-700 text-sm border ${errors.renewalType ? 'border-red-500' : 'border-gray-300'} rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-blue-600 hover:border-gray-600 shadow-sm focus:shadow`}
                    required
                  >
                    <option value="">Select Renewal Type</option>
                    <option value="Annual">Annual</option>
                    <option value="Bi-Annual">Bi-Annual</option>
                    <option value="Quarterly">Quarterly</option>
                  </select>
                  {errors.renewalType && <p className="text-red-500 text-sm">Renewal Type is mandatory</p>}
                </div>
              </div>
            </section>

            {/* Vehicle Details */}
            <section className="mb-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Vehicle Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="w-full max-w-sm min-w-[100px]">
                  <input
                    type="text"
                    name="vehicleType"
                    value={formValues.vehicleType}
                    onChange={handleChange}
                    placeholder="Vehicle Type"
                    className={`w-full bg-transparent placeholder:text-gray-400 text-gray-700 text-sm border ${errors.vehicleType ? 'border-red-500' : 'border-gray-300'} rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-blue-600 hover:border-gray-600 shadow-sm focus:shadow`}
                    required
                  />
                  {errors.vehicleType && <p className="text-red-500 text-sm">Vehicle Type is mandatory</p>}
                </div>

                <div className="w-full max-w-sm min-w-[100px]">
                  <input
                    type="text"
                    name="vehicleRegNo"
                    value={formValues.vehicleRegNo}
                    onChange={handleChange}
                    placeholder="Vehicle Reg No"
                    className={`w-full bg-transparent placeholder:text-gray-400 text-gray-700 text-sm border ${errors.vehicleRegNo ? 'border-red-500' : 'border-gray-300'} rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-blue-600 hover:border-gray-600 shadow-sm focus:shadow`}
                    required
                  />
                  {errors.vehicleRegNo && <p className="text-red-500 text-sm">Vehicle Reg No is mandatory</p>}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="w-full max-w-sm min-w-[100px]">
                  <input
                    type="date"
                    name="vehicleDate"
                    value={formValues.vehicleDate}
                    onChange={handleChange}
                    className={`w-full bg-transparent placeholder:text-gray-400 text-gray-700 text-sm border ${errors.vehicleDate ? 'border-red-500' : 'border-gray-300'} rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-blue-600 hover:border-gray-600 shadow-sm focus:shadow`}
                    required
                  />
                  {errors.vehicleDate && <p className="text-red-500 text-sm">Vehicle Date is mandatory</p>}
                </div>

                <div className="w-full max-w-sm min-w-[100px]">
                  <input
                    type="text"
                    name="makeModel"
                    value={formValues.makeModel}
                    onChange={handleChange}
                    placeholder="Make/Model"
                    className={`w-full bg-transparent placeholder:text-gray-400 text-gray-700 text-sm border ${errors.makeModel ? 'border-red-500' : 'border-gray-300'} rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-blue-600 hover:border-gray-600 shadow-sm focus:shadow`}
                    required
                  />
                  {errors.makeModel && <p className="text-red-500 text-sm">Make/Model is mandatory</p>}
                </div>
              </div>
            </section>

            {/* Payment Details */}
            <section className="mb-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Payment Details</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="w-full max-w-sm min-w-[150px]">
                  <input
                    type="text"
                    name="premiumAmount"
                    value={formValues.premiumAmount}
                    onChange={handleChange}
                    placeholder="Premium Amount"
                    className={`w-full bg-transparent placeholder:text-gray-400 text-gray-700 text-sm border ${errors.premiumAmount ? 'border-red-500' : 'border-gray-300'} rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-blue-600 hover:border-gray-600 shadow-sm focus:shadow`}
                    required
                  />
                  {errors.premiumAmount && <p className="text-red-500 text-sm">Premium Amount is mandatory</p>}
                </div>

                <div className="w-full max-w-sm min-w-[150px]">
                  <select
                    name="paymentMode"
                    value={formValues.paymentMode}
                    onChange={handleChange}
                    className={`w-full bg-transparent placeholder:text-gray-400 text-gray-700 text-sm border ${errors.paymentMode ? 'border-red-500' : 'border-gray-300'} rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-blue-600 hover:border-gray-600 shadow-sm focus:shadow`}
                    required
                  >
                    <option value="">Select Payment Mode</option>
                    <option value="Cash">Cash</option>
                    <option value="Credit Card">Credit Card</option>
                    <option value="Debit Card">Debit Card</option>
                    <option value="Net Banking">Net Banking</option>
                  </select>
                  {errors.paymentMode && <p className="text-red-500 text-sm">Payment Mode is mandatory</p>}
                </div>

                <div className="w-full max-w-sm min-w-[150px]">
                  <input
                    type="file"
                    name="file"
                    onChange={handleFileUpload}
                    className={`w-full bg-transparent placeholder:text-gray-400 text-gray-700 text-sm border ${errors.file ? 'border-red-500' : 'border-gray-300'} rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-blue-600 hover:border-gray-600 shadow-sm focus:shadow`}
                    // required
                  />
                  {errors.file && <p className="text-red-500 text-sm">File upload is mandatory</p>}
                </div>
              </div>
            </section>

            {/* Agent Details */}
            <section className="mb-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Agent Details</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="w-full max-w-sm min-w-[150px]">
                  <input
                    type="text"
                    name="agentName"
                    value={formValues.agentName}
                    onChange={handleChange}
                    placeholder="Agent Name"
                    className={`w-full bg-transparent placeholder:text-gray-400 text-gray-700 text-sm border ${errors.agentName ? 'border-red-500' : 'border-gray-300'} rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-blue-600 hover:border-gray-600 shadow-sm focus:shadow`}
                    required
                  />
                  {errors.agentName && <p className="text-red-500 text-sm">Agent Name is mandatory</p>}
                </div>

                <div className="w-full max-w-sm min-w-[150px]">
                  <input
                    type="text"
                    name="agentContact"
                    value={formValues.agentContact}
                    onChange={handleChange}
                    placeholder="Agent Contact"
                    className={`w-full bg-transparent placeholder:text-gray-400 text-gray-700 text-sm border ${errors.agentContact ? 'border-red-500' : 'border-gray-300'} rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-blue-600 hover:border-gray-600 shadow-sm focus:shadow`}
                    required
                  />
                  {errors.agentContact && <p className="text-red-500 text-sm">Agent Contact is mandatory</p>}
                </div>

                <div className="w-full max-w-sm min-w-[150px]">
                  <input
                    type="email"
                    name="agentEmail"
                    value={formValues.agentEmail}
                    onChange={handleChange}
                    placeholder="Agent Email"
                    className={`w-full bg-transparent placeholder:text-gray-400 text-gray-700 text-sm border ${errors.agentEmail ? 'border-red-500' : 'border-gray-300'} rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-blue-600 hover:border-gray-600 shadow-sm focus:shadow`}
                    required
                  />
                  {errors.agentEmail && <p className="text-red-500 text-sm">Agent Email is mandatory</p>}
                </div>
              </div>
            </section>

            {/* Submit Button */}
            <div className="flex justify-end mt-4">
              <button
                type="submit"
                className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300 ease"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateNew;
