require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const personRoutes = require("./routes/personRoute");

const app = express();
const PORT = 3000;
const DATABASE_USER = process.env.DATABASE_USER;
const DATABASE_PASSWORD = encodeURIComponent(process.env.DATABASE_PASSWORD);
const DATABASE_CONNECTION_STRING = `mongodb+srv://${DATABASE_USER}:${DATABASE_PASSWORD}@cluster0.uj7x7cn.mongodb.net/?retryWrites=true&w=majority`;

// forma de let JSON / middlewares
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

// rotas da API
app.use("/person", personRoutes);

// rota inicial / endpoint
app.get("/", (req, res) => {
  res.json({
    message: "Welcome!",
  });
});

mongoose
  .connect(DATABASE_CONNECTION_STRING)
  .then(() => {
    console.log("Connected to database");

    // sobe o servidor
    app.listen(PORT, () => {
      console.log(`server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => console.log(error));
