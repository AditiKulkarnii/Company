const express = require("express");
const router = express.Router();
const Employee = require("../models/Employee"); 
const Company = require("../models/company");


router.post("/", async (req, res) => {
    try {
        const { name, dob, email, phone, salary, cid } = req.body; 

       
        if (!name || !dob || !email || !phone || !salary || !cid) {
            return res.status(400).json({ error: "All fields are required" });
        }

       
        let companyId;

       
        if (typeof cid === 'string') {
            const company = await Company.findOne({ name: { $regex: new RegExp('^' + cid + '$', 'i') } });
            if (!company) {
                return res.status(404).json({ error: "Company not found" });
            }
            companyId = company._id; 
        } else {
           
            companyId = cid;
        }

       
        const employee = new Employee({
            name,
            dob,
            email,
            phone,
            salary,
            cid: companyId, 
        });

        
        await employee.save();

       
        res.status(201).json(employee);
    } catch (error) {
        console.error("Error creating employee:", error);
        res.status(500).json({ error: error.message });
    }
});



router.get("/", async (req, res) => {
    try {
        
        const employees = await Employee.find().populate("cid", "name");

        
        res.json(employees);
    } catch (error) {
        console.error("Error fetching employees:", error);
        res.status(500).json({ error: error.message });
    }
});


router.put("/:id", async (req, res) => {
    const { id } = req.params; 
    const { name, dob, email, phone, salary, cid } = req.body; 

    
    if (!name || !dob || !email || !phone || !salary || !cid) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
       
        const updatedEmployee = await Employee.findByIdAndUpdate(
            id,
            { name, dob, email, phone, salary, cid },
            { new: true } 
        );

        
        if (!updatedEmployee) {
            return res.status(404).json({ message: "Employee not found" });
        }

       
        res.json(updatedEmployee);
    } catch (error) {
        console.error("Error updating employee:", error);
        res.status(500).json({ error: error.message });
    }
});


router.delete("/:id", async (req, res) => {
    const { id } = req.params; 

    try {
        
        const deletedEmployee = await Employee.findByIdAndUpdate(
            id,
            { deleted_at: new Date() },
            { new: true }
        );

        if (!deletedEmployee) {
            return res.status(404).json({ message: "Employee not found" });
        }

      
        res.json({ message: "Employee deleted successfully", employee: deletedEmployee });
    } catch (error) {
        console.error("Error deleting employee:", error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
