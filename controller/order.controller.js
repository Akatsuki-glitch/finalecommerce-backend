const Order = require('../models/order.model')

const createCheckout = async (req, res) => {
    const { name, email, phone, address, total, items } = req.body;
  
    try {
      if (!name || typeof total === "undefined") {
        return res.status(400).json({ error: "Missing required fields: name and total" });
      }
  
      // find the latest orderNumber and increment
      const lastOrder = await Order.findOne().sort({ orderNumber: -1 });
      const newOrderNumber = lastOrder ? lastOrder.orderNumber + 1 : 1;
  
      const newOrder = new Order({
        orderNumber: newOrderNumber,
        name,
        email,
        phone,
        address,
        total,
        items
      });
  
      const saved = await newOrder.save();
      res.status(201).json({ status: "success", saved });
  
    } catch (err) {
      console.error("Error saving order:", err);
      res.status(500).json({ status: "failed", error: "Failed to save order" });
    }
  };

const getAllOrder = async (req, res) => {
    try {
        const orders = await Order.find().sort({ createdAt: -1 });
        res.json(orders);
    } catch (err) {
        console.error("Error fetching orders:", err);
        res.status(500).json({ error: "Failed to fetch orders" });
    }
}

module.exports = {
    createCheckout,
    getAllOrder
}