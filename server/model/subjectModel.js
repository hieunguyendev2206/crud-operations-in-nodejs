import mongoose from "mongoose";


const subjectSchema = new mongoose.Schema({
    subjectname: {
        type: String,
        required: true
    },
    sotc: {
        type: Number,
        required: true
    }
})


export default mongoose.model("Subject", subjectSchema);