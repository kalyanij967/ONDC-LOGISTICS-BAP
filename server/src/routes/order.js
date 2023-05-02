// save new order 
// fetch all prev orders
// update order : cancel track 
const express = require("express");
const app = express();
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');
const bcrypt = require('bcrypt')
const jwt  = require('jsonwebtoken');
const User = require('../models/person');
const Order = require("../models/order");
const JWT_SECRET = 'secRET';// require(process.env)


// Create a new order
router.post("/neworder", async (req, res) => {
	try {
		const { source, destination, value, type, email, courier,price ,address} = req.body.order;
		if (!source || !destination || !value || !type || !email || !courier || !price || !address) {
			console.log('missing fields for new order');
			return res.status(400).json({ error: "Missing required fields" });
		}
		let user = await User.findOne({email})
		if(!user) {
			console.log('user not found');
			return res.status(404).json({
				error: "Error Retreiving user"
			})
		} 

		const order = new Order({
			pickupaddress:user.address,

			deliveryaddress:address,
			items:{value,type},
			paymentStatus: 'PAID',
			paymentdetails : {
				amount : price
			},
			providercontact:courier,
			tracking: false,
			// message, 
			state: "PENDING-CONFIRMATION",
		});
		order.save().then(savedOrder => {
			user.orders.push(savedOrder._id);
			user.save().then(() => {
				res.json({
					message:"Succefully updated Order",
					
				});
			})
			.catch(err => {
				console.log("order saving to user error",err);
				res.status(500).json({ error: "Error updating your order into account", code: "PAYWAIT" });
			})
		})
		.catch(err => {
			console.log("order saving error",err);
			res.status(500).json({ error: "Error updating your order", code: "PAYWAIT" });
		})
	}catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal server error" });
	}
});

// Get all orders
router.post("/allorders", async (req, res) => {
	const {email} = req.body;
	console.log(email);
	// return res.json({email})
	try {
		const user = await User.findOne({email});
		if(!user) {
			res.status(500).json({error : "Cannot find user"});
		}
		res.json({orders: user.orders});
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal server error" });
	}
});

// Get a specific order by ID
router.get("/:orderId", async (req, res) => {
	try {
		const order = await Order.findById(req.params.orderId);
		if (!order) {
		return res.status(404).json({ error: "Order not found" });
		}
		res.json(order);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal server error" });
	}
});

// Update an existing order by ID
router.put("/:orderId", async (req, res) => {
	try {
		const { pickupaddress, deliveryaddress, items, userId, paymentdetails, providercontact, tracking, state, transactionId, paymentStatus, message } = req.body;
		if (!pickupaddress || !deliveryaddress || !items || !userId || !paymentdetails) {
		return res.status(400).json({ error: "Missing required fields" });
		}
		const order = await Order.findById(req.params.orderId);
		if (!order) {
		return res.status(404).json({ error: "Order not found" });
		}
		order.pickupaddress = pickupaddress;
		order.deliveryaddress = deliveryaddress;
		order.items = items;
		order.userId = userId;
		order.paymentdetails = paymentdetails;
		order.providercontact = providercontact;
		order.tracking = tracking || order.tracking;
		order.state = state || order.state;
		order.transactionId = transactionId || order.transactionId;
		order.paymentStatus = paymentStatus || order.paymentStatus;
		order.message = message;
		const savedOrder = await order.save();
		res.json(savedOrder);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal server error" });
	}
});

// Delete an existing order by ID
router.delete("/:orderId", async (req, res) => {
	try {
		const order = await Order.findById(req.params.orderId);
		if (!order) {
		return res.status(404).json({ error: "Order not found" });
		}
		await order.remove();
		res.json({ message: "Order deleted successfully" });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal server error" });
	}
});

module.exports = router