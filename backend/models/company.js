const mongoose = require("mongoose");

const CompanySchema = new mongoose.Schema({
    name: { type: String, required: true ,unique : true},
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    deleted_at: { type: Date },
});

module.exports = mongoose.model("Company", CompanySchema);
