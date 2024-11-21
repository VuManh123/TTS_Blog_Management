require("dotenv").config({
  path: "./.env",
});
require("rootpath")();
const express = require("express");
const bodyParser = require("body-parser");
const router = require("routes/api");
const { swaggerUIServe,swaggerUISetup } = require("kernels/api-docs");
const authRoutes = require("routes/auth");
const userRoutes = require("routes/user");
const cors = require('cors');
const app = express();
app.disable("x-powered-by");

app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

// Cho phép tất cả các origin (có thể giới hạn origin cụ thể nếu cần)
app.use("/", router);
app.use("/api-docs", swaggerUIServe, swaggerUISetup);
app.use("/api/auth", authRoutes);  // Định tuyến login, register
app.use("/api/user", userRoutes);  // Định tuyến của user cần xác thực

module.exports = app
