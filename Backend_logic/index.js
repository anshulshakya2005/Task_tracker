const express = require('express');
const cors = require('cors');
require('./Models/db');
require('dotenv').config();
const bodyParser = require('body-parser');
const taskRouter = require('./Routes/Taskrouter');

const app = express();
const PORT = process.env.PORT || 8080;

/* ✅ MUST BE FIRST */
app.use(cors({
  origin: ["http://localhost:3000", "https://task-tracker-1-brw4.onrender.com"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

/* JSON parser */
app.use(express.json());
app.use(bodyParser.json());

/* Routes */
app.use('/tasks', taskRouter);

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});