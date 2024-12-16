import React, { useState, useEffect } from 'react';
import { getCompanies } from '../Services/api';
import CompanyForm from '../Components/CompanyForm';

const CompanyPage = () => {
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const data = await getCompanies();
        setCompanies(data);
      } catch (error) {
        console.error('Error fetching companies:', error);
      }
    };
    fetchCompanies();
  }, []);

  const handleFormSubmit = () => {
    const fetchUpdatedCompanies = async () => {
      try {
        const data = await getCompanies();
        setCompanies(data);
        setSelectedCompany(null);
      } catch (error) {
        console.error('Error refetching companies:', error);
      }
    };
    fetchUpdatedCompanies();
  };

  const handleEditCompany = (company) => {
    setSelectedCompany(company);
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Company Management</h2>
      <CompanyForm
        company={selectedCompany}
        onSubmit={handleFormSubmit}
        existingCompanies={companies.map((c) => c.name.toLowerCase())}
      />
      <div className="mt-6">
        <h3 className="text-xl font-bold mb-2">Company List</h3>
        <ul className="space-y-2">
          {companies.map((company) => (
            <li key={company.id} className="p-4 border rounded flex justify-between items-center">
              <span>{company.name}</span>
              <button
                onClick={() => handleEditCompany(company)}
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

export default CompanyPage;
