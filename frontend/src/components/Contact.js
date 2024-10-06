import React from 'react';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const Contact = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-white p-4">
            {/* Main Container */}
            <div className="bg-white shadow-xl rounded-lg p-8 w-full md:w-3/4 lg:w-2/3">
                {/* Title Section */}
                <h1 className="text-4xl font-bold text-center text-blue-700 mb-6">Contact Us</h1>

                {/* Description Section */}
                <p className="text-gray-600 text-center mb-8">
                    We're here to assist you with all your car insurance needs. Reach out to us using the form below or through the contact details provided.
                </p>

                {/* Flex Container for Form and Contact Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Contact Form */}
                    <div className="bg-gray-100 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                        <h2 className="text-2xl font-semibold text-blue-600 mb-4">Get in Touch</h2>
                        <form className="space-y-4">
                            <div className="flex flex-col">
                                <label className="text-gray-700 font-semibold mb-2" htmlFor="name">Full Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                                    placeholder="Your Name"
                                    required
                                />
                            </div>

                            <div className="flex flex-col">
                                <label className="text-gray-700 font-semibold mb-2" htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                                    placeholder="Your Email"
                                    required
                                />
                            </div>

                            <div className="flex flex-col">
                                <label className="text-gray-700 font-semibold mb-2" htmlFor="message">Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows="5"
                                    className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                                    placeholder="Your Message"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
                            >
                                Send Message
                            </button>
                        </form>
                    </div>

                    {/* Contact Details */}
                    <div className="bg-gray-100 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                        <h2 className="text-2xl font-semibold text-blue-600 mb-4">Contact Details</h2>
                        <div className="space-y-4">
                            <div className="flex items-center">
                                <FaPhoneAlt className="text-blue-600 mr-2 text-2xl" />
                                <p className="text-gray-700">
                                    <span className="font-semibold">Phone:</span> (123) 456-7890
                                </p>
                            </div>
                            <div className="flex items-center">
                                <FaEnvelope className="text-blue-600 mr-2 text-2xl" />
                                <p className="text-gray-700">
                                    <span className="font-semibold">Email:</span> support@knoxomminsurance.com
                                </p>
                            </div>
                            <div className="flex items-center">
                                <FaMapMarkerAlt className="text-blue-600 mr-2 text-2xl" />
                                <p className="text-gray-700">
                                    <span className="font-semibold">Office Address:</span> 123 Car Insurance Ave, Cityville, CA 90001
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer Section */}
            <footer className="mt-8 text-center text-gray-500 text-sm">
                &copy; {new Date().getFullYear()} Knoxomm Insurance. All rights reserved.
            </footer>
        </div>
    );
};

export default Contact;
