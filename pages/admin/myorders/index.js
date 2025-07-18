'use client';

import styles from './myorder.module.scss';
import { useEffect, useState } from 'react';
import { FaTrash } from "react-icons/fa";

export default function Admin() {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [error, setError] = useState('');
    const [showOldOrders, setShowOldOrders] = useState(false);

    useEffect(() => {
        getProducts();
    }, []);

    useEffect(() => {
        filterProducts();
    }, [products, showOldOrders]);

    const getProducts = async () => {
        const res = await fetch('/api/orders');
        const result = await res.json();

        const sorted = result?.data?.sort(
            (a, b) => new Date(a.deliveryDateTime) - new Date(b.deliveryDateTime)
        );
        setProducts(sorted);
    };

   const filterProducts = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set to start of today

    const filtered = showOldOrders
        ? products
        : products.filter(order => {
            const orderDate = new Date(order.deliveryDateTime);
            orderDate.setHours(0, 0, 0, 0); // Normalize to midnight
            return orderDate >= today;
        });

    setFilteredProducts(filtered);
};

    const handleDelete = async (id) => {
        const res = await fetch('/api/orders', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id }),
        });

        if (res.ok) {
            getProducts();
        }
    };

    const handleStatusChange = async (id, newStatus) => {
        const res = await fetch('/api/orders', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id, status: newStatus }),
        });

        if (res.ok) {
            getProducts();
        } else {
            setError("Failed to update status");
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Manage Orders</h1>
            <p className={styles.error}>{error}</p>

            {/* ✅ Toggle for filtering */}
            <div className={styles.filterWrapper}>
                <label>
                    <input
                        type="checkbox"
                        checked={showOldOrders}
                        onChange={() => setShowOldOrders(!showOldOrders)}
                    />
                    Show Old Orders
                </label>
            </div>

            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Name/Mobile</th>
                        <th>Products</th>
                        <th>Status</th>
                        <th>Delivery Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredProducts.map((order) => (
                        <tr key={order.id}>
                            <td>
                                {order.name}<br />
                                {order.mobileNumber}
                            </td>
                            <td>
                                {order.order.map((item) => (
                                    <div key={item.id} style={{ marginBottom: '5px' }}>
                                        <img src={item.productImage} alt={item.title} width="50" />
                                        <div>{item.title} - ₹{item.price} × {item.quantity}</div>
                                    </div>
                                ))}
                            </td>
                            <td>
                                <select
                                    value={order.status || "Pending"}
                                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                >
                                    <option value="Pending">Pending</option>
                                    <option value="In-Progress">In-Progress</option>
                                    <option value="Done">Done</option>
                                </select>
                            </td>
                            <td className={styles.ddate}>
                                <strong>{new Date(order.deliveryDateTime).toLocaleDateString('en-GB', {
                                    day: '2-digit',
                                    month: 'short',
                                    year: 'numeric'
                                })}</strong>
                            </td>
                            <td>
                                <button onClick={() => handleDelete(order.id)}>
                                    <FaTrash />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
