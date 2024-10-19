import React, { useEffect, useState } from 'react';
import axios from 'axios';

const InsuranceData = () => {
    const [insuranceData, setInsuranceData] = useState([]);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        const fetchInsuranceData = async () => {
            try {
                const token = localStorage.getItem('token'); // Retrieve the token from local storage
                const response = await axios.get('http://localhost:5000/getUserData', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setInsuranceData(response.data.data); // Set the retrieved data to state
            } catch (err) {
                setError(err.response ? err.response.data.error : 'Error fetching data');
            }
        };

        fetchInsuranceData();
    }, []);
    
    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h1>Your Insurance Data</h1>
            {insuranceData.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Mobile</th>
                            <th>Email</th>
                            <th>Insurance Type</th>
                            <th>Vehicle Reg No</th>
                            <th>Premium Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {insuranceData.map((data) => (
                            <tr key={data.id}>
                                <td>{data.id}</td>
                                <td>{data.name}</td>
                                <td>{data.mobile}</td>
                                <td>{data.email}</td>
                                <td>{data.insuranceType}</td>
                                <td>{data.vehicleRegNo}</td>
                                <td>{data.premiumAmount}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No insurance data available.</p>
            )}
        </div>
    );
};

export default InsuranceData;
