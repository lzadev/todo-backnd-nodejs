const express = require("express");
const cors = require("cors");
const todoRouter = require("../routes/todo.routes");
const notFound = require("../middlewares/notFound");
const connect = require("../database/connect");

class Server {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  routes() {
    this.app.use("/api/todos", todoRouter);
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    // this.app.use(notFound);
  }

  async start() {
    try {
      await connect(process.env.MONGO_URI);
      const PORT = process.env.PORT || 3000;
      this.app.listen(PORT, async () => {
        console.log(`App listening on port ${PORT}`);
      });
    } catch (error) {
      console.log("Error trying to connect to db", error);
    }
  }
}
module.exports = Server;
