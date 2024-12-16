const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');


router.get('/second-highest-salary', async (req, res) => {
  try {
    const data = await Employee.aggregate([
      
      { $sort: { cid: 1, salary: -1 } },
     
      { $group: { _id: '$cid', salaries: { $push: '$$ROOT' } } },
    
      { $project: { secondHighest: { $arrayElemAt: ['$salaries', 1] } } },
      
      {
        $lookup: {
          from: 'companies', 
          localField: '_id',
          foreignField: '_id', 
          as: 'companyDetails', 
        },
      },
      
      { $unwind: '$companyDetails' },
    ]);

  
    const result = data.map((d) => ({
      companyName: d.companyDetails.name, 
      employeeName: d.secondHighest.name,
      salary: d.secondHighest.salary,
    }));

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});


router.get('/max-salary-employees', async (req, res) => {
  try {
    const data = await Employee.aggregate([
      
      { $sort: { cid: 1, salary: -1 } },
      
      { $group: { _id: '$cid', maxSalary: { $first: '$$ROOT' } } },
      
      {
        $lookup: {
          from: 'companies',
          localField: '_id',
          foreignField: '_id',
          as: 'companyDetails',
        },
      },
      
      { $unwind: '$companyDetails' },
    ]);

    
    const result = data.map((d) => ({
      companyName: d.companyDetails.name, 
      employeeName: d.maxSalary.name,
      salary: d.maxSalary.salary,
    }));

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
