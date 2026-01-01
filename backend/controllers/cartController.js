import userModel from "../models/userModel.js";

// Add items to user cart
const addToCart = async (req, res) => {
  try {
    // Validation
    if (!req.body.itemId) {
      return res.json({ success: false, message: "Item ID is required" });
    }

    // Find user
    let userData = await userModel.findById(req.userId);
    
    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }

    let cartData = userData.cartData || {}; // Initialize if undefined

    // Add or increment item
    if (!cartData[req.body.itemId]) {
      cartData[req.body.itemId] = 1;
    } else {
      cartData[req.body.itemId] += 1;
    }

    // Update user cart
    await userModel.findByIdAndUpdate(req.userId, { cartData });
    
    res.json({ success: true, message: "Added To Cart" });
    
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error adding to cart" });
  }
};

// Remove items from user cart
const removeFromCart = async (req, res) => {
  try {
    // Validation
    if (!req.body.itemId) {
      return res.json({ success: false, message: "Item ID is required" });
    }

    // Find user
    let userData = await userModel.findById(req.userId);
    
    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }

    let cartData = await userData.cartData || {};

    // Remove or decrement item
    if (cartData[req.body.itemId]>0) {
      cartData[req.body.itemId] -= 1;
      
      // Remove item if quantity becomes 0
      if (cartData[req.body.itemId] <= 0) {
        delete cartData[req.body.itemId];
      }
    }

    // Update user cart
    await userModel.findByIdAndUpdate(req.userId, { cartData });
    
    res.json({ success: true, message: "Removed From Cart" });
    
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error removing from cart" });
  }
};

// Fetch user cart data
const getCart = async (req, res) => {
  try {
    // Find user
    let userData = await userModel.findById(req.userId);
    
    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }

    let cartData = await userData.cartData || {};
    
    res.json({ success: true, cartData });
    
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error fetching cart" });
  }
};

export { addToCart, removeFromCart, getCart };