const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema({
    cid: { type: mongoose.Schema.Types.ObjectId, ref: "Company", required: true },
    name: { type: String, required: true },
    dob: { type: Date },
    email: { type: String, required: true },
    phone: { type: String },
    salary: { type: Number, required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    deleted_at: { type: Date },
});

module.exports = mongoose.model("Employee", EmployeeSchema);
