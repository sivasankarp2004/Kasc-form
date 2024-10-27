const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb+srv://sivasankar:sivasankar@cluster0.nsf3v.mongodb.net/', { 
    // Removed deprecated options
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Define a Mongoose schema
const responseSchema = new mongoose.Schema({
    responses: [
        {
            question: String,
            answer: Number,
            label: String
        }
    ],
    name: { type: String, required: true },
    registerNo: { type: String, required: true },
    department: { type: String, required: true }
});

const Response = mongoose.model('Response', responseSchema);

// Route to handle form submission
app.post('/submit', async (req, res) => {
    try {
        const { responses, name, registerNo, department } = req.body;
        const newResponse = new Response({ 
            responses, 
            name, 
            registerNo, 
            department 
        });
        
        await newResponse.save();
        res.status(201).send('Responses saved successfully');
    } catch (error) {
        console.error('Error saving responses:', error);
        res.status(500).send('Error saving responses');
    }
});

// Route to get all responses
app.get('/responses', async (req, res) => {
    try {
        const responses = await Response.find();
        res.status(200).json(responses);
    } catch (error) {
        console.error('Error fetching responses:', error);
        res.status(500).send('Error fetching responses');
    }
});

app.get("/get",(req,res)=>{
    res.send("Deployed")
})

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
