const express = require("express");
const router = express.Router();
const Company = require("../models/company");

// Add company
// Add company
router.post("/", async (req, res) => {
    try {
        const companyName = req.body.name.trim();  // Ensure trimming extra spaces
        console.log("Checking for existing company name:", companyName);

        const existingCompany = await Company.findOne({
            name: { $regex: new RegExp('^' + companyName + '$', 'i') }
        });

        if (existingCompany) {
            return res.status(400).json({ message: "Company already exists" });
        }

        const company = new Company(req.body);
        await company.save();
        res.status(201).json(company);

    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log(error.message);
    }
});



// Get companies
router.get("/", async (req, res) => {
    try {
        const companies = await Company.find({ deleted_at: null });
        res.json(companies);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update company
router.put("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const company = await Company.findByIdAndUpdate(id, req.body, { new: true });
        if (!company) {
            return res.status(404).json({ message: "Company not found" });
        }
        res.json(company);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Soft delete company
router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const company = await Company.findByIdAndUpdate(id, { deleted_at: new Date() }, { new: true });
        if (!company) {
            return res.status(404).json({ message: "Company not found" });
        }
        res.json({ message: "Company deleted successfully", company });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
