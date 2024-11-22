require("dotenv").config({ path: "./.env" });
require("rootpath")();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");  // Import cors
const router = require("routes/api");
const { swaggerUIServe, swaggerUISetup } = require("kernels/api-docs");
const authRoutes = require("routes/auth");
const userRoutes = require("routes/user");

const app = express();
app.disable("x-powered-by");

// Cấu hình CORS cho phép tất cả các domain (hoặc domain cụ thể)
app.use(cors({
  origin: 'http://localhost:4200',  // Thêm origin cho phép (địa chỉ frontend Angular)
  methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Các phương thức HTTP cho phép
  allowedHeaders: ['Content-Type', 'Authorization'],  // Các header cho phép
}));

app.use(bodyParser.json());
app.use("/", router);
app.use(express.json());

app.use("/api-docs", swaggerUIServe, swaggerUISetup);
app.use("/api/auth", authRoutes);  // Định tuyến login, register
app.use("/api/user", userRoutes);  // Định tuyến của user cần xác thực

module.exports = app;
