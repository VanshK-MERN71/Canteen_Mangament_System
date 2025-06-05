import React, { useEffect, useState } from 'react';
import { fetchOrders } from '../utils/api';
import OrderCard from '../components/OrderCard';
import 'bootstrap/dist/css/bootstrap.min.css';
import useVerify from '../utils/Veryfy'

const Orders = () => {
  useVerify();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const getOrders = async () => {
      try {
        const data = await fetchOrders();
        setOrders(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching orders:', error);
        setError('Failed to load orders. Please try again later.');
        setLoading(false);
      }
    };

    getOrders();
  }, []);

  return (
    <div className="orders-page">

      <div className="bg-primary text-white text-center py-5">
        <h1 className="display-4">Your Orders</h1>
        <p className="lead">View all your placed orders here.</p>
      </div>


      <div className="container my-5">
        {loading ? (
          <div className="text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : error ? (
          <div className="alert alert-danger text-center">{error}</div>
        ) : orders.length === 0 ? (
          <div className="text-center">
            <p>No orders found. Place an order first!</p>
            <a href="/menu" className="btn btn-primary">
              Explore Menu
            </a>
          </div>
        ) : (
          <div className="row">
            {orders.map((order) => (
              <OrderCard key={order._id} order={order} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;