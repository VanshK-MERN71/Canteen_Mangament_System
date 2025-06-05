import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Checkout.css";
import PaymentCard from "./PymentCard";
import useVerify from "../../utils/Veryfy";

export default function Checkout() {
  useVerify();
  const [showPayment, setShowPayment] = useState(false);
  const OrderData = JSON.parse(sessionStorage.getItem("CheckoutItem")) || {};
  const [count, setCount] = useState(1);
  const [price, setPrice] = useState(OrderData.price || 0);
  const [finalPrice, setFinalPrice] = useState(0);

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phone: "",
    city: "",
    pincode: "",
    country: "",
    fullAddress: "",
    method: "UPI",
    quantity: '1'
    
  });

  function InputHandler(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  function Submit(e) {
    e.preventDefault();

    if (!formData.email.endsWith('@gmail.com')) {
      alert("Email not valid. Please enter a valid Gmail address (example@gmail.com).");
      return;
    }

    if (formData.email.length < 12) {
      alert("Email is too short. Please enter a valid email with at least 12 characters.");
      return;
    }

    if (formData.method === 'COD') {
      alert("Cash on Delivery Not Available!");
    } else {
      handlePayment();
    }
  }

  const handlePayment = () => {
    setShowPayment(true);
  };

  useEffect(() => {
    const newPrice = (OrderData.price || 0) * count;
    setPrice(newPrice);

    // Discount Calculation (Default 50% if OrderData.discount is not available)
    const discountPercent = OrderData.discount ? OrderData.discount : 50;
    const discountAmount = (newPrice * discountPercent) / 100;
    setFinalPrice(newPrice - discountAmount);
  }, [count, OrderData.price, OrderData.discount]);
  
  function priceHigh(e) {
    e.preventDefault(); // Button click pe refresh hone se bachne ke liye
    setCount(prevCount => prevCount + 1);
    setFormData({ ...formData, [quantity]: count });
  }

  function priceLow(e) {
    e.preventDefault();
    if (count <= 1) return;
    setCount(prevCount => prevCount - 1);
    setFormData({ ...formData, [quantity]: count });
  }

  return (
    <div className="checkout-container">
      <div className="payment-card-main">
        <form onSubmit={Submit} style={{ width: '100%' }}>
          <div className="payment-card">
            <div className="card-details">
              <h2 className="text-white">Your Information</h2>

              <div className="mb-3 input-group">
                <input type="text" className="form-control" name="fullname" onChange={InputHandler} placeholder="Enter full name" required />
                <input type="text" className="form-control" name="city" onChange={InputHandler} placeholder="Enter city" required />
              </div>
              <div className="mb-3 input-group">
                <input type="email" className="form-control" name="email" onChange={InputHandler} placeholder="Enter email" required />
                <input type="text" className="form-control" name="pincode" onChange={InputHandler} placeholder="Pin Code" required />
              </div>
              <div className="mb-3 input-group">
                <input type="text" className="form-control" name="phone" onChange={InputHandler} placeholder="Enter phone number" required />
                <select className="form-select" name="country" onChange={InputHandler} required>
                  <option value="">Select country</option>
                  <option value="India">India</option>
                  <option value="USA">USA</option>
                  <option value="UK">UK</option>
                  <option value="Canada">Canada</option>
                </select>
              </div>
              <div className="mb-3 input-group" style={{ display: 'flex' }}>
                <input type="text" className="form-control" name="fullAddress" onChange={InputHandler} placeholder="Enter street address" required />
                <div style={{ margin: '5px' }}>
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
                    <button className="btn border text-white" onClick={priceLow}>-</button>
                    <b>{count}</b>
                    <button className="btn border text-white" onClick={priceHigh}>+</button>
                  </div>
                </div>
              </div>
              <div className="mb-3 input-group">
                <select className="form-select" name="method" onChange={InputHandler} style={{ textAlign: 'center' }} required>
                  <option value="UPI">UPI</option>
                  <option value="COD">COD</option>
                </select>
              </div>

              <p className="valid-date text-white">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita modi repellendus similique soluta molestias corrupti harum dolores! Corporis, ab quis? Quia atque sequi debitis suscipit saepe ratione, fuga autem illo.
              </p>
            </div>
          </div>
          <div className="checkout-box">
            <h3>Order Summary</h3>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div style={{ position: 'relative', width: '200px', height: '200px' }}>
                <img src={OrderData.image_url} alt="Product" style={{ position: 'absolute', width: '100%', height: '100%' }} />
              </div>
            </div>
            <div className="summary-details">
              <p>Sub Total: <span>₹{price.toFixed(2)}</span></p>
              <p>Discount: <span className="text-success">-{OrderData.discount || 50}%</span></p>
              <hr />
              <p className="total">Total: <span>₹{finalPrice.toFixed(2)}</span></p>
            </div>
            <label className="form-check-label">
              <input type="checkbox" className="form-check-input me-2" required />
              I agree with Terms of Use
            </label>
            <button className="pay-btn" type="submit">ORDER</button>
          </div>
        </form>

        {showPayment && (
          <div style={{ position: 'absolute' }}>
            <PaymentCard formData={formData} OrderData={OrderData} totalAmount={finalPrice} setShowPayment={setShowPayment} />
          </div>
        )}
      </div>
    </div>
  );
}
