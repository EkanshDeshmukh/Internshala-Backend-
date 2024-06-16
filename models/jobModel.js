const mongoose = require('mongoose')

const jobModel = new mongoose.Schema({
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: "student" }],
    employe: { type: mongoose.Schema.Types.ObjectId, ref: "employe" },
    title: String,
    skill: String,
    jobtype: { type: String, emum: ["In office", "Remote"] },
    openings: Number,
    description: String,
    preferences: String,
    salary: Number,
    perks: String,
    assesments: String,
}, { timestamps: true })

module.exports = mongoose.model('job', jobModel)