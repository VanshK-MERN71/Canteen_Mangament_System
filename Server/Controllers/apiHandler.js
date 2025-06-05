
const express = require('express');
const { Order } = require('../models/Order');
const jwt = require('jsonwebtoken');
const { MenuItem } = require('../Models/MenuItem');

const setApi = async (req, res) => {
  
  try {
    const {
      fullname,
      email,
      phone,
      city,
      pincode,
      country,
      fullAddress,
      discount,
      name,
      description,
      price,
      category,
      quantity = 1,
      image_url,
      finalPrice,
      status,
      _id,
    } = req.body;
    const userId = req.userId; 

    if (
      !fullname ||
      !email ||
      !phone ||
      !city ||
      !pincode ||
      !country ||
      !fullAddress ||
      !name ||
      !price ||
      !category ||
      !quantity||
      !image_url ||
      !finalPrice ||
      !_id
    ) {
      return res.status(400).json({ success: false, message: "Order Faild !" });
    }
    
    const menuItem = await MenuItem.findOne({ _id: _id });
    console.log("hiiii",menuItem);
    
    if (!menuItem) {
      return res.status(404).json({ success: false, message: "Order Faild!" });
    }

    if (menuItem.stock_quantity < quantity) {
      return res.status(400).json({ success: false, message: "Not enough stock available!" });
    }

    const newOrder = new Order({
      userId,
      OrderId:_id,
      fullname,
      email,
      phone,
      city,
      pincode,
      country,
      fullAddress,
      discount: discount || 0,
      itemName:name,
      description: description || "",
      price,
      category,
      stock_quantity:quantity,
      image_url,
      finalPrice,
      status,
      orderDate: new Date(),
    });

    await newOrder.save();

    menuItem.stock_quantity -= quantity;
    await menuItem.save();

    res.status(201).json({ success: true, orderId: newOrder._id, message: "Order placed successfully!" });
  } catch (error) {
    console.error("Error in setApi:", error);
    res.status(500).json({ success: false, message: "Server error!" });
  }
};



async function getApi(req, res) {

  try {
    const orders = await Order.find({ userId: req.userId });

    if (!orders || orders.length === 0) {
      return res.json({ success: false, message: "No orders found." });
    }

    res.json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
}

async function orderCancel(req, res) {
  try {
    const { orderId } = req.params;

    const order = await Order.findOne({ _id: orderId, userId: req.userId });
    
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found or unauthorized." });
    }
    
    if (order.status === "Delivered") {
      return res.status(400).json({ success: false, message: "Cannot cancel a delivered order" });
    }
    
    const menuItem = await MenuItem.findOne({ _id: order.OrderId });

    if (!menuItem) {
      return res.status(404).json({ success: false, message: "Menu item not found" });
    }

    menuItem.stock_quantity += order.stock_quantity;
    await menuItem.save();

    order.status = "Cancelled";
    await order.save();

    res.json({ success: true, message: "Order cancelled successfully!", data: order });

  } catch (error) {
    console.error("Cancel Order Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
}

async function OrderRemove(req, res) {
  try {
    const { id } = req.params;
    
    const deletedOrder = await Order.findByIdAndDelete({_id:id});

    if (!deletedOrder) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    res.status(200).json({ success: true, message: "Order deleted successfully!" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error deleting order", error: error.message });
  }
}


module.exports = { getApi, setApi, orderCancel ,OrderRemove}