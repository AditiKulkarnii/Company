import React, { useState, useEffect } from 'react';
import { createCompany, updateCompany, deleteCompany } from '../Services/api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CompanyForm = ({ company, onSubmit = () => {}, existingCompanies = [] }) => {
  const [name, setName] = useState(company ? company.name : '');
  const [isExistingName, setIsExistingName] = useState(false); 

  
  useEffect(() => {
    if (company) {
      setName(company.name);
    }
  }, [company]);

  
  useEffect(() => {
    setIsExistingName(existingCompanies.includes(name.trim().toLowerCase()));
  }, [name, existingCompanies]);

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const companyData = { name };

    try {
      if (company) {
        await updateCompany(company.id, companyData);
        toast.success('Company updated successfully', { autoClose: 1000 });
      } else {
        if (isExistingName) {
          toast.error('Company already exists', { autoClose: 1000 });
          return;
        }
        await createCompany(companyData);
        toast.success('Company created successfully', { autoClose: 1000 });
      }
      onSubmit(); 
      setName(''); 
    } catch (error) {
      console.error('Error submitting company', error);
      toast.error('Error submitting company', { autoClose: 1000 });
    }
  };

  
  const handleDelete = async () => {
    try {
      await deleteCompany(company?.id);
      toast.success('Company deleted successfully', { autoClose: 1000 });
      onSubmit();
      setName('');
    } catch (error) {
      console.error('Error deleting company', error);
      toast.error('Error deleting company', { autoClose: 1000 });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Company Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 p-2 w-full border rounded"
          required
        />
        {isExistingName && (
          <p className="text-sm text-red-500">This company name already exists!</p>
        )}
      </div>
      <div className="flex space-x-4">
        <button
          type="submit"
          className={`py-2 px-4 rounded ${
            isExistingName
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-blue-500 text-white'
          }`}
          disabled={isExistingName}
        >
          {company ? 'Update' : 'Submit'}
        </button>
        <button
          type="button"
          onClick={handleDelete}
          className="bg-red-500 text-white py-2 px-4 rounded"
        >
          Delete
        </button>
      </div>
    </form>
  );
};

export default CompanyForm;
