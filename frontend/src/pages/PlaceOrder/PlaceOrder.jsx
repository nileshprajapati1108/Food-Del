import React, { useContext } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url } =
    useContext(StoreContext);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const placeOrder = async (event) => {
    event.preventDefault();
    let orderItems = [];
    food_list.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    });
    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 5,
    };
    let response = await axios.post(url + "/api/order/place", orderData, {
      headers: { token },
    });
    if (response.data.success) {
      const { session_url } = response.data;
      window.location.replace(session_url);
    } else {
      alert("ERROR!");
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/cart");
    }else if(getTotalCartAmount()===0){
      navigate("/cart")
    }
  }, [token]);

  return (
    <form className="place-order" onSubmit={placeOrder}>
      {/* LEFT FORM */}
      <div className="place-order-left">
        <h2 className="title">Delivery Information</h2>

        <div className="row">
          <input
            name="firstName"
            onChange={onChangeHandler}
            value={data.firstName}
            type="text"
            placeholder="First Name"
            required
          />
          <input
            name="lastName"
            onChange={onChangeHandler}
            value={data.lastName}
            type="text"
            placeholder="Last Name"
            required
          />
        </div>

        <input
          name="email"
          onChange={onChangeHandler}
          value={data.email}
          type="email"
          placeholder="Email Address"
          required
        />
        <input
          name="street"
          onChange={onChangeHandler}
          value={data.street}
          type="text"
          placeholder="Street Address"
          required
        />

        <div className="row">
          <input
            name="city"
            onChange={onChangeHandler}
            value={data.city}
            type="text"
            placeholder="City"
            required
          />
          <input
            name="state"
            onChange={onChangeHandler}
            value={data.state}
            type="text"
            placeholder="State"
            required
          />
        </div>

        <div className="row">
          <input
            name="zipcode"
            onChange={onChangeHandler}
            value={data.zipcode}
            type="text"
            placeholder="Zip Code"
            required
          />
          <input
            name="country"
            onChange={onChangeHandler}
            value={data.country}
            type="text"
            placeholder="Country"
            required
          />
        </div>

        <input
          name="phone"
          onChange={onChangeHandler}
          value={data.phone}
          type="text"
          placeholder="Phone Number"
          required
        />
      </div>

      {/* RIGHT SUMMARY */}
      <div className="place-order-right">
        <div className="order-summary">
          <h2>Order Summary</h2>

          <div className="summary-row">
            <span>Subtotal</span>
            <span>${getTotalCartAmount()}</span>
          </div>

          <div className="summary-row">
            <span>Delivery Fee</span>
            <span>${getTotalCartAmount() === 0 ? 0 : 5}</span>
          </div>

          <hr />

          <div className="summary-total">
            <span>Total</span>
            <span>
              ${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 5}
            </span>
          </div>

          <button type="submit">PROCEED TO PAYMENT</button>

          <p className="secure-text">🔒 Secure payment guaranteed</p>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
