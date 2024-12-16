import React, { useState, useEffect } from 'react';
import EmployerForm from '../Components/EmployerForm';
import { getCompanies, getEmployees } from '../Services/api'; // Assuming these API functions are available

const EmployeePage = () => {
  const [employees, setEmployees] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  // Fetch companies and employees from the API when the component mounts
  useEffect(() => {
    const fetchCompaniesAndEmployees = async () => {
      try {
        const [companiesData, employeesData] = await Promise.all([
          getCompanies(),
          getEmployees(),
        ]);
        setCompanies(companiesData);
        setEmployees(employeesData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchCompaniesAndEmployees();
  }, []);

  const handleFormSubmit = () => {
    // Refresh the list of employees after submitting the form
    getEmployees().then((data) => setEmployees(data));
  };

  const handleDelete = (employeeId) => {
    // Remove deleted employee from the list
    setEmployees((prevEmployees) => prevEmployees.filter((emp) => emp.id !== employeeId));
  };

  const handleEditEmployee = (employee) => {
    setSelectedEmployee(employee);
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Employee Management</h2>

      {/* Form for creating/updating a company */}
      <EmployerForm
        employee={selectedEmployee}
        companies={companies}
        onSubmit={handleFormSubmit}
        onDelete={handleDelete}
      />

      {/* Employee List */}
      <div className="mt-6">
        <h3 className="text-xl font-bold mb-2">Employee List</h3>
        <ul className="space-y-2">
          {employees.map((employee) => (
            <li key={employee.id} className="p-4 border rounded flex justify-between items-center">
              <span>{employee.name}</span>
              <button
                onClick={() => handleEditEmployee(employee)}
                className="bg-yellow-500 text-white py-1 px-3 rounded"
              >
                Edit
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default EmployeePage;
