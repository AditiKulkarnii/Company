import React, { useState } from 'react';
import { createEmployee, updateEmployee, deleteEmployee } from '../Services/api';
import { toast } from 'react-toastify';

const EmployerForm = ({ employee, companies, onSubmit, onDelete }) => {
  const [name, setName] = useState(employee ? employee.name : '');
  const [dob, setDob] = useState(employee ? employee.dob : '');
  const [email, setEmail] = useState(employee ? employee.email : '');
  const [phone, setPhone] = useState(employee ? employee.phone : '');
  const [salary, setSalary] = useState(employee ? employee.salary : '');
  const [companyId, setCompanyId] = useState(employee ? employee.cid : '');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const employeeData = { name, dob, email, phone, salary, cid: companyId };

    try {
      if (employee) {
        await updateEmployee(employee.id, employeeData);
        toast.success('Employee updated successfully', { autoClose: 1000 });
      } else {
        await createEmployee(employeeData);
        toast.success('Employee created successfully', { autoClose: 1000 });
      }
      setName('');
      setDob('');
      setEmail('');
      setPhone('');
      setSalary('');
      setCompanyId('');
      onSubmit(); 
    } catch (error) {
      console.error('Error submitting employee', error);
      toast.error('Error submitting employee', { autoClose: 1000 });
    }
  };

  const handleDelete = async () => {
    if (employee && employee.id) {
      try {
        await deleteEmployee(employee.id);
        toast.success('Employee deleted successfully', { autoClose: 1000 });
        onDelete(employee.id); 
      } catch (error) {
        console.error('Error deleting employee', error);
        toast.error('Error deleting employee', { autoClose: 1000 });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Employee Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 p-2 w-full border rounded"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
        <input
          type="date"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          className="mt-1 p-2 w-full border rounded"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 p-2 w-full border rounded"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Phone</label>
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="mt-1 p-2 w-full border rounded"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Salary</label>
        <input
          type="number"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
          className="mt-1 p-2 w-full border rounded"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Company</label>
        <select
          value={companyId}
          onChange={(e) => setCompanyId(e.target.value)}
          className="mt-1 p-2 w-full border rounded"
          required
        >
          <option value="">Select Company</option>
          {companies && companies.length > 0 ? (
            companies.map((company) => (
              <option key={company.id} value={company.id}>
                {company.name}
              </option>
            ))
          ) : (
            <option value="" disabled>No companies available</option>
          )}
        </select>
      </div>

      
      <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
        {employee ? 'Update Employee' : 'Create Employee'}
      </button>

      
      {employee && (
        <>
          <button
            type="button"
            onClick={handleDelete}
            className="bg-red-500 text-white py-2 px-4 rounded mt-2 ml-2"
          >
            Delete Employee
          </button>
        </>
      )}
    </form>
  );
};

export default EmployerForm;
