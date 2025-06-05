import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCart } from "../../CartContext"; 
import "./Card.css";

const Card = ({ item }) => {
  
  const { updateCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  function fetchItem() {
    try {
      sessionStorage.setItem("Temp", JSON.stringify(item));
    } catch (error) {
      alert("Unwanted Error");
    }
  }

  const AddToCart = async (id) => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3000/menu/cart", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      const data = await response.json();
      if (data.success) {
        alert("✅ Item added to cart!");
        updateCart();
      } else {
        alert("❌ Failed to add item to cart.");
      }
    } catch (error) {
      console.error("Item added error", error);
    }
    setLoading(false);
  };

  const handleBuyNow = () => {
    sessionStorage.setItem("CheckoutItem", JSON.stringify(item));
    navigate("/checkout");
  };

  const discount = item.discount || 0;
  const finalPrice = item.price - (item.price * discount) / 100;

  return (
    <div className="Card shadow-sm p-3 rounded position-relative">

      {discount > 0 && (
        <div className="discount-badge">
          -{discount}% OFF
        </div>
      )}

      <div className="card-hover">
        <ul className="icon-list"  style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
          <li><i className="fa-solid fa-heart text-danger"></i></li>
          <li>
            <Link to="/menu/ProductInfo" onClick={fetchItem} className="a">
              <i className="fa-solid fa-eye text-primary"></i>
            </Link>
          </li>
          <li onClick={() => AddToCart(item._id)} className="cart-btn">
            {loading ? <i className="fa-solid fa-spinner fa-spin"></i> : <i className="fa-solid fa-cart-plus"></i>}
          </li>
        </ul>
      </div>

      <div className="img text-center ">
        <Link to="/menu/ProductInfo" onClick={fetchItem} >
          <img src={item.image_url} alt={item.name} className="img-fluid rounded" id="img"/>
        </Link>
      </div>

      <div className="text-center mt-2">
        <h5 className="fw-bold">{item.name}</h5>
        <p className="small text-muted" id="hid">
          {item.description}{" "}
          <Link to="/menu/ProductInfo" onClick={fetchItem} className="a">More</Link>
        </p>
       

        <div>
          {discount > 0 ? (
            <h6 className="fw-bold text-success">
              ₹{finalPrice.toFixed(2)}{" "}
              <span className="text-muted small" style={{ textDecoration: "line-through" }}>
                ₹{item.price}
              </span>
            </h6>
          ) : (
            <h6 className="fw-bold text-success">₹{item.price}</h6>
          )}
          
          <button onClick={handleBuyNow} className="btn btn-sm btn-warning fw-bold">BUY</button>
        </div>
      </div>
    </div>
  );
};

export default Card;
