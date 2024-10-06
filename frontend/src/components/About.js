// import React from 'react';

// const About = () => {
//     return (
//         <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
//             {/* Container for the content */}
//             <div className="bg-white shadow-md rounded-lg p-8 w-full md:w-3/4 lg:w-2/3">
//                 {/* Title Section */}
//                 <h1 className="text-5xl font-bold text-center text-blue-700 mb-8">About Our Car Insurance</h1>

//                 {/* Description Section */}
//                 <p className="text-gray-700 text-center mb-6">
//                     At Knoxomm Car Insurance, we are committed to providing comprehensive coverage options
//                     that ensure your peace of mind on the road. Our customer-first approach helps you 
//                     find the right plan to protect what matters most.
//                 </p>

//                 {/* Divider */}
//                 <hr className="my-6 border-gray-300" />

//                 {/* Cards Section */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     {/* Mission Card */}
//                     <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 shadow-sm transition duration-300 hover:shadow-lg">
//                         <h3 className="text-xl font-semibold text-blue-700 mb-2">Our Mission</h3>
//                         <p className="text-gray-600">
//                             To deliver affordable and reliable car insurance solutions that protect you
//                             from unforeseen events, ensuring that you're never left vulnerable.
//                         </p>
//                     </div>

//                     {/* Services Card */}
//                     <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 shadow-sm transition duration-300 hover:shadow-lg">
//                         <h3 className="text-xl font-semibold text-blue-700 mb-2">Our Services</h3>
//                         <p className="text-gray-600">
//                             We offer a range of customizable plans, including comprehensive coverage,
//                             collision protection, and third-party liability, tailored to fit your needs.
//                         </p>
//                     </div>

//                     {/* Why Choose Us Card */}
//                     <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 shadow-sm transition duration-300 hover:shadow-lg">
//                         <h3 className="text-xl font-semibold text-blue-700 mb-2">Why Choose Us</h3>
//                         <p className="text-gray-600">
//                             Our expert team is dedicated to providing exceptional customer service and
//                             support, ensuring that you have the best experience possible with our insurance plans.
//                         </p>
//                     </div>

//                     {/* Get In Touch Card */}
//                     <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 shadow-sm transition duration-300 hover:shadow-lg">
//                         <h3 className="text-xl font-semibold text-blue-700 mb-2">Get In Touch</h3>
//                         <p className="text-gray-600">
//                             For more information or to get a personalized quote, 
//                             <a href="/contact" className="text-blue-600 font-semibold hover:underline"> contact us</a>. 
//                             We're here to help you find the perfect coverage.
//                         </p>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default About;
import React from 'react';

const About = () => {
    return (
        <div className="bg-gray-50">
            {/* Main Container */}
            <div className="flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                {/* Title Section */}
                <h1 className="text-5xl font-bold text-center text-blue-600 mb-8">
                    About Our Car Insurance
                </h1>

                {/* Description Section */}
                <p className="text-lg text-gray-700 text-center mb-12 max-w-2xl">
                    At Knoxomm Car Insurance, we are dedicated to providing the best coverage options 
                    to protect you and your vehicle on the road. Your safety and peace of mind are our top priorities.
                </p>

                {/* Mission and Values Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {/* Mission */}
                    <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition-shadow duration-300 ease-in-out">
                        <div className="flex items-center mb-4">
                            <span className="text-blue-500 text-3xl">🛡️</span>
                            <h3 className="text-xl font-semibold text-gray-800 ml-4">Our Mission</h3>
                        </div>
                        <p className="text-gray-600">
                            To provide affordable, reliable, and customizable car insurance solutions that cater to every driver’s needs.
                        </p>
                    </div>

                    {/* Services */}
                    <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition-shadow duration-300 ease-in-out">
                        <div className="flex items-center mb-4">
                            <span className="text-blue-500 text-3xl">🚗</span>
                            <h3 className="text-xl font-semibold text-gray-800 ml-4">Our Services</h3>
                        </div>
                        <p className="text-gray-600">
                            Offering a range of coverage options, including comprehensive, collision, and liability insurance tailored for every driver.
                        </p>
                    </div>

                    {/* Why Choose Us */}
                    <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition-shadow duration-300 ease-in-out">
                        <div className="flex items-center mb-4">
                            <span className="text-blue-500 text-3xl">💼</span>
                            <h3 className="text-xl font-semibold text-gray-800 ml-4">Why Choose Us</h3>
                        </div>
                        <p className="text-gray-600">
                            With 24/7 support, an easy claims process, and a dedicated team, we ensure our customers are always taken care of.
                        </p>
                    </div>

                    {/* Contact Section */}
                    <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition-shadow duration-300 ease-in-out">
                        <div className="flex items-center mb-4">
                            <span className="text-blue-500 text-3xl">📞</span>
                            <h3 className="text-xl font-semibold text-gray-800 ml-4">Get In Touch</h3>
                        </div>
                        <p className="text-gray-600">
                            For personalized assistance or to get a quote, <a href="/contact" className="text-blue-600 font-semibold">contact us</a> today!
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
