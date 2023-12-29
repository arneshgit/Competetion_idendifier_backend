// Import required modules
const express = require('express');

// Create an Express application
const app = express();
app.use(express.json());
const cors = require('cors');
app.use(cors());
const userRoute = require("./routes/login");
app.use("/", userRoute);
app.get('/', (req, res) => {
  res.send('Hello, this is your Express server!');
});
app.post('/logins', (req, res) => {
  console.log(req.body);
});
const PORT = process.env.PORT || 8000; // Use the provided port or default to 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
