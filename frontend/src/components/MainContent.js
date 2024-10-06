import React, {useState} from "react";
import CreateNew from "./CreateNew.js";


const MainContent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  return (
    <div className="">
      <header className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold"> Welcome to Knox </h2>

        <div className="relative inline-block text-left">
          <button
            type="button"
            className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            onClick={openModal} // open modal on click
          >
            Create New Account
          </button>
        </div>
      </header>

      <section className="grid grid-cols-4 gap-7 mb-8">
        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-gray-500">Total revenue</h3>
          <p className="text-2xl font-bold">$2.6M</p>
          <p className="text-green-500">+4.5% from last week</p>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-gray-500">Average order value</h3>
          <p className="text-2xl font-bold">$455</p>
          <p className="text-red-500">-0.5% from last week</p>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-gray-500">Tickets sold</h3>
          <p className="text-2xl font-bold">5,888</p>
          <p className="text-green-500">+4.5% from last week</p>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-gray-500">Pageviews</h3>
          <p className="text-2xl font-bold">823,067</p>
          <p className="text-green-500">+21.2% from last week</p>
        </div>
      </section>

      <section className="bg-white p-6 rounded shadow">
        <h3 className="text-lg font-bold mb-4">Recent orders</h3>
        <table className="w-full table-auto">
          <thead>
            <tr>
              <th className="text-left p-2">Order number</th>
              <th className="text-left p-2">Purchase date</th>
              <th className="text-left p-2">Customer</th>
              <th className="text-left p-2">Event</th>
              <th className="text-left p-2">Amount</th>
            </tr>
          </thead>
          <tbody>
            {[
              {
                orderNumber: 3000,
                date: "May 9, 2024",
                customer: "Leslie Alexander",
                event: "Bear Hug: Live in Concert",
                amount: "$80.00",
              },
              {
                orderNumber: 3000,
                date: "May 9, 2024",
                customer: "Leslie Alexander",
                event: "Bear Hug: Live in Concert",
                amount: "$80.00",
              }, {
                orderNumber: 3000,
                date: "May 9, 2024",
                customer: "Leslie Alexander",
                event: "Bear Hug: Live in Concert",
                amount: "$80.00",
              }, {
                orderNumber: 3000,
                date: "May 9, 2024",
                customer: "Leslie Alexander",
                event: "Bear Hug: Live in Concert",
                amount: "$80.00",
              }, {
                orderNumber: 3000,
                date: "May 9, 2024",
                customer: "Leslie Alexander",
                event: "Bear Hug: Live in Concert",
                amount: "$80.00",
              },
              {
                orderNumber: 3000,
                date: "May 9, 2024",
                customer: "Leslie Alexander",
                event: "Bear Hug: Live in Concert",
                amount: "$80.00",
              },
              {
                orderNumber: 3000,
                date: "May 9, 2024",
                customer: "Leslie Alexander",
                event: "Bear Hug: Live in Concert",
                amount: "$80.00",
              },
             
            ].map((order, index) => (
              <tr
                key={index}
                className="hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  /* Handle order click */
                }}
              >
                <td className="p-2">{order.orderNumber}</td>
                <td className="p-2">{order.date}</td>
                <td className="p-2">{order.customer}</td>
                <td className="p-2">{order.event}</td>
                <td className="p-2">{order.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      {isModalOpen && <CreateNew closeModal={closeModal} />}
    </div>
  );
};

export default MainContent;
