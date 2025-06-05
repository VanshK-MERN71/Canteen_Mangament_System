import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GetToCart from "../../utils/GetToCard";
import verify from "../../utils/Veryfy";
import { useCart } from "../../CartContext";

const Cart = () => {
  verify("/cart");

  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { updateCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartItems = async () => {
      const data = await GetToCart();
      if (data.success) {
        setCartItems(data.data);
        setLoading(false);
      }
    };
    fetchCartItems();
  }, []);

  const removeFromCart = async (id) => {
    try {
      const response = await fetch("http://localhost:3000/menu/cart/remove", {
        method: "DELETE",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      const data = await response.json();
      
      
      if (data.success) {
        setCartItems((prevCartItems) => prevCartItems.filter((item) => item.itemId !== id));
          const data = await GetToCart();
        if (data.success) {
          updateCart();
          
          setCartItems(data.data);
          setLoading(false);
        }
      } else {
        alert("Failed to remove item!");
      }
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  const handleProductClick = (item) => {
    sessionStorage.setItem("Temp", JSON.stringify(item));
    navigate("/menu/ProductInfo");
  };

  const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);

  return (
    <div className="container mt-4 vh-100">
      <h2 className="mb-4">Your Cart 🛒</h2>

      {loading ? (
        <h4 className="text-center text-secondary">Loading cart...</h4>
      ) : cartItems.length === 0 ? (
        <h4 className="text-center text-warning">Your cart is empty! 😞</h4>
      ) : (
        <>
          <div className="row">
            {cartItems.map((item) => (
              <div key={item._id} className="col-md-6 col-lg-4 mb-4" style={{position:'relative'}}>
               
                  <div
                    className=" OrderAll-Card "
                    onClick={() => handleProductClick(item)}
                  style={{ cursor: "pointer" }}

                  >
                    <div className="OrderAll-Card-body" style={{display:'flex',width:'max-content'}}>
                    <img
                      src={item.image_url}
                      alt={item.name}
                      className="img-fluid"
                      style={{ width: "60px", height: "60px", borderRadius: "10px" }}
                    />

                    <div className="ms-3 flex-grow-1">
                      <h5 className="mb-1">{item.name}</h5>
                      <p className={`fw-bold ${item.available ? "text-success" : "text-danger"}`}>
                        {item.available ? "Available ✅" : "Unavailable ❌"}
                      </p>
                      
                      <div style={{display:'flex',gap:'10px'}}>
                        <strike>Old Price: ₹{item.price}</strike>
                        <p className="fw-bold">Price: ₹{item.finalPrice}</p>
                      </div>
                    </div>

                    <button
                      className="btn"
                      style={{position:'relative' ,right:'5%'}}
                      onClick={(e) => { e.stopPropagation(); removeFromCart(item._id);console.log(item);
                      }}
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </div>
                  </div>
                </div>
            ))}
              </div>

        
        </>
      )}
    </div>
  );
};

export default Cart;
