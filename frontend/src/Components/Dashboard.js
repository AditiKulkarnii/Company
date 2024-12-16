import React, { useEffect, useState } from 'react';
import { getSecondHighestSalary, getMaxSalaryEmployees } from '../Services/api'; // Adjust the path as needed

const Dashboard = () => {
  const [secondHighestSalaries, setSecondHighestSalaries] = useState([]);
  const [maxSalaryEmployees, setMaxSalaryEmployees] = useState([]);

  useEffect(() => {
    // Fetch Second-Highest Salaries
    const fetchSecondHighestSalaries = async () => {
      try {
        const data = await getSecondHighestSalary();
        setSecondHighestSalaries(data);
      } catch (err) {
        console.error('Error fetching second-highest salaries:', err);
      }
    };

    // Fetch Employees with Maximum Salaries
    const fetchMaxSalaryEmployees = async () => {
      try {
        const data = await getMaxSalaryEmployees();
        setMaxSalaryEmployees(data);
      } catch (err) {
        console.error('Error fetching max salary employees:', err);
      }
    };

    fetchSecondHighestSalaries();
    fetchMaxSalaryEmployees();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      
      {/* Second-Highest Salaries Table */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Second-Highest Salaries</h2>
        <table className="min-w-full table-auto border-collapse border border-gray-200 shadow-md">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2">Company Name</th>
              <th className="border px-4 py-2">Employee Name</th>
              <th className="border px-4 py-2">Salary</th>
            </tr>
          </thead>
          <tbody>
            {secondHighestSalaries.map((row, index) => (
              <tr key={index} className="text-center">
                <td className="border px-4 py-2">{row.companyName}</td>
                <td className="border px-4 py-2">{row.employeeName}</td>
                <td className="border px-4 py-2">{row.salary}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Max Salary Employees Table */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Employees with Maximum Salaries</h2>
        <table className="min-w-full table-auto border-collapse border border-gray-200 shadow-md">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2">Company Name</th>
              <th className="border px-4 py-2">Employee Name</th>
              <th className="border px-4 py-2">Salary</th>
            </tr>
          </thead>
          <tbody>
            {maxSalaryEmployees.map((row, index) => (
              <tr key={index} className="text-center">
                <td className="border px-4 py-2">{row.companyName}</td>
                <td className="border px-4 py-2">{row.employeeName}</td>
                <td className="border px-4 py-2">{row.salary}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
