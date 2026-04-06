import express from "express";
import { createOrder } from "../controller/order.controller.js";

const router = express.Router();

// URL: http://localhost:4001/order/checkout
router.post("/checkout", createOrder);

export default router;