const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./middleware');
dotenv.config({ path: './config.env' });

const uri = "mongodb+srv://admin:k1Q9gkIStO8TvvbA@cluster0.mms3uvi.mongodb.net/cineflex?retryWrites=true&w=majority";

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 10000, // You can adjust this value based on your needs
}).then(() => {
  console.log("DB connected successfully....");
}).catch((err) => {
  console.error('Error connecting to MongoDB:', err.message);
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('Server has started on port', port);
});
