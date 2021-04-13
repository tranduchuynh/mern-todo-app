require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const authRouter = require('./routes/auth');
const postRouter = require('./routes/posts');
const cors = require('cors');

const connectDB = async () => {
  try {
    await mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@mern-learn.bsqss.mongodb.net/mern-learn?retryWrites=true&w=majority`, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });

    console.log('MongoDB connected')
  } catch (err) {
    console.error(err);
    process.exit(1)
  }
}

connectDB();

const app = express();
app.use(express.json());
app.use(cors())

app.get('/', (req, res) => {
  res.send('hello word');
})

app.use('/api/auth/', authRouter);
app.use('/api/posts/', postRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))