const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var session = require("express-session");
const cluster = require("cluster");
const config = require("./config");
const { mongoose } = require("./database");

const app = express();

const http = require("http").Server(app);
const io = require("socket.io")(http);

io.on("connection", function (socket) {
  console.log("usuario conectado " + socket.id);
  socket.on("disconnect", function () {
    console.log("usuario desconectado " + socket.id);
    // io.sockets.emit('pedido', msg)
  });
  socket.on("like", like => {
    io.to(socket.id).emit("like", like)
  })
  socket.on("cart", pro => {
    io.to(socket.id).emit("cart", pro)
  })
  socket.on("hour", hour => {
    io.to(socket.id).emit("hour", hour)
  })
  socket.on("order", order => {
    io.sockets.emit("order", order);
  });
});

require("./system/prototype");
global.config = require("./in18");
global.i18n = require("./system/helpers/i18n");

global.i18n.setLanguage();

//Settings
app.set("port", process.env.PORT || 3000);
app.use(
  session({
    secret: "AsdalkAasdkaSDSS*SASDAS@",
    saveUninitialized: true,
    resave: true,
    cookie: { maxAge: 8 * 60 * 60 * 1000 }
  })
);

app.use(logger("dev"));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());

//Middlewares
app.use(morgan("dev"));
app.use(cors());
//app.use(cors())

const initData = require("./models/initData");
//initData.createRol()
//initData.createUser()
//initData.createCity()
//initData.createDocumentType()
//initData.createGender()
//initData.createCompany()
//initData.createCategory()
//initData.createProduct()

//Routes
app.use("/api/user", require("./routes/user.routes"));
app.use("/api/documentypes", require("./routes/documentType.routes"));
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/product", require("./routes/product.routes"));
app.use("/api/category", require("./routes/category.routes"));
app.use("/api/company", require("./routes/company.routes"));
app.use("/api/city", require("./routes/city.routes"));
app.use("/api/gender", require("./routes/routes.gender"));
app.use("/api/resetpass", require("./routes/resetpass.routes"));
app.use("/api/branchoffice", require("./routes/branchoffice.routes"));
app.use("/api/invoice", require("./routes/invoice.routes"));
app.use("/api/order", require("./routes/order.routes"));
app.use("/api/factureref", require("./routes/factureref.routes"));
app.use("/api/charts", require("./routes/charts.routes"));
app.use("/api/sales", require("./routes/sales.routes"));
app.use("/api/hours", require("./routes/hour.routes"));
app.use("/api/adds", require("./routes/add.routes"));

// const numCPUs = require('os').cpus().length;
// if (cluster.isMaster)
// {
//   masterProcess();
// }
// else
// {
//   childProcess();
// }

function masterProcess() {
  console.log(`Master ${process.pid} is running`);

  for (let i = 0; i < numCPUs; i++) {
    console.log(`Forking process number ${i}...`);

    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
    console.log(`...Forking a new process...`);

    cluster.fork();
  });
}

function childProcess() {
  console.log(`Worker ${process.pid} started...`);
  http.listen(config.port, function () {
    console.log(`Server Runing on PORT ${config.port}`);
  });
}

// //Starting the server
http.listen(app.get("port"), () => {
  console.log("Server on port ", app.get("port"));
});
