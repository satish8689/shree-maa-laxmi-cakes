'use client';

import { useEffect, useState } from 'react';
import { FaHeart, FaShoppingCart } from 'react-icons/fa';
import styles from './restaurant.module.scss';
import OrderSummary from '../orderSummary.js';
import { toast } from 'react-toastify';

export default function ProductList() {
    const [products, setProducts] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [search, setSearch] = useState('');
    const [priceRange, setPriceRange] = useState('');
    const [icProducts, setIcProducts] = useState([]);
    const [showOrderSummary, setShowOrderSummary] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [showPopup, setShowPopup] = useState(false);
    const [userName, setUserName] = useState('');
    const [userMobile, setUserMobile] = useState('');
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [wishlist, setWishlist] = useState([]);
    const [selectedType, setSelectedType] = useState('');

    useEffect(() => {
        const storedUser = localStorage.getItem('userInfo');
        if (!storedUser) {
            setShowPopup(true);
        } else {
            const userData = JSON.parse(storedUser);
            setUserName(userData.name);
            setUserMobile(userData.mobile);
        }
        getProducts();
    }, []);
const rdata = [
  {
    id: "21",
    productImage: "/img/dalfry.jpg",
    productTitle: "Dal Fry",
    price: 120,
    originalPrice: 150,
    note: "Tasty Homestyle",
    description: "Classic North Indian dal fry with ghee tadka.",
    rating: "4.4",
    reviewCount: "34",
    type: "dal"
  },
  {
    id: "22",
    productImage: "/img/dal-makhani7.webp",
    productTitle: "Dal Makhani",
    price: 160,
    originalPrice: 200,
    note: "Punjabi Delight",
    description: "Creamy and rich dal makhani cooked overnight.",
    rating: "4.6",
    reviewCount: "55",
    type: "dal"
  },
  {
    id: "23",
    productImage: "/img/dal-tadka.jpg",
    productTitle: "Dal Tadka",
    price: 130,
    originalPrice: 160,
    note: "Spicy Tadka",
    description: "Yellow dal with flavorful garlic tadka.",
    rating: "4.3",
    reviewCount: "27",
    type: "dal"
  },
  {
    id: "24",
    productImage: "/img/jeera-rice.avif",
    productTitle: "Jeera Rice",
    price: 100,
    originalPrice: 120,
    note: "Perfect with Dal",
    description: "Basmati rice tempered with cumin seeds.",
    rating: "4.5",
    reviewCount: "40",
    type: "chawal"
  },
  {
    id: "25",
    productImage: "/img/Manchurian Fried Rice.avif",
    productTitle: "Manchurian Fried Rice",
    price: 140,
    originalPrice: 180,
    note: "Indo-Chinese Combo",
    description: "Spicy fried rice with veg Manchurian balls.",
    rating: "4.6",
    reviewCount: "48",
    type: "startup"
  },
  {
    id: "26",
    productImage: "/img/Masala Sandwich.jpg",
    productTitle: "Masala Sandwich",
    price: 90,
    originalPrice: 120,
    note: "Toasted",
    description: "Toasted sandwich with spicy mashed potato stuffing.",
    rating: "4.3",
    reviewCount: "30",
    type: "startup"
  },
  {
    id: "27",
    productImage: "/img/pizza-1.jpg",
    productTitle: "Cheese Burst Pizza",
    price: 299,
    originalPrice: 399,
    note: "Extra Cheese",
    description: "Loaded cheese burst pizza with veggies.",
    rating: "4.7",
    reviewCount: "89",
    type: "startup"
  },
  {
    id: "28",
    productImage: "/img/pizza-2.avif",
    productTitle: "Veg Supreme Pizza",
    price: 249,
    originalPrice: 349,
    note: "Crispy Crust",
    description: "Supreme pizza with olives, capsicum, and corn.",
    rating: "4.5",
    reviewCount: "76",
    type: "startup"
  },
  {
    id: "29",
    productImage: "/img/pizza-3.avif",
    productTitle: "Paneer Tikka Pizza",
    price: 259,
    originalPrice: 359,
    note: "Tandoori Twist",
    description: "Tandoori paneer pizza with spicy topping.",
    rating: "4.6",
    reviewCount: "54",
    type: "startup"
  },
  {
    id: "30",
    productImage: "/img/pizza-4.avif",
    productTitle: "Double Cheese Pizza",
    price: 229,
    originalPrice: 329,
    note: "Cheese Overload",
    description: "Two layers of cheese on soft crust.",
    rating: "4.4",
    reviewCount: "42",
    type: "startup"
  },
  {
    id: "31",
    productImage: "/img/pizza-4.jpg",
    productTitle: "Classic Margherita",
    price: 199,
    originalPrice: 249,
    note: "Best Seller",
    description: "Classic pizza with mozzarella and tomato sauce.",
    rating: "4.5",
    reviewCount: "58",
    type: "startup"
  },
  {
    id: "32",
    productImage: "/img/plan-rice.jpg",
    productTitle: "Plain Rice",
    price: 80,
    originalPrice: 100,
    note: "Steamed Rice",
    description: "Soft and fluffy plain white rice.",
    rating: "4.2",
    reviewCount: "25",
    type: "chawal"
  },
  {
    id: "33",
    productImage: "/img/Red Sauce Pasta.jpg",
    productTitle: "Red Sauce Pasta",
    price: 180,
    originalPrice: 220,
    note: "Spicy & Tangy",
    description: "Pasta in rich tomato basil sauce.",
    rating: "4.4",
    reviewCount: "33",
    type: "startup"
  },
  {
    id: "34",
    productImage: "/img/Veg Lollipop [3 Pieces].avif",
    productTitle: "Veg Lollipop (3 pcs)",
    price: 120,
    originalPrice: 150,
    note: "Hot & Crispy",
    description: "Crispy veg lollipops served with spicy dip.",
    rating: "4.6",
    reviewCount: "41",
    type: "startup"
  },
  {
    id: "35",
    productImage: "/img/Veg Manchurian.jpg",
    productTitle: "Veg Manchurian",
    price: 130,
    originalPrice: 170,
    note: "Indo-Chinese Favorite",
    description: "Fried veg balls tossed in Manchurian gravy.",
    rating: "4.7",
    reviewCount: "53",
    type: "startup"
  }
];

    async function getProducts() {
        // let apiresult = await fetch('/api/restaurant');
        // let { data } = await apiresult.json();
        let data = rdata
        if (data.length > 0) {
            let productObj = data.map(iterator => ({ ...iterator }));
            setProducts(productObj);
        }
        setIsLoading(false);
    }

    const handleToggleWishlist = (productId) => {
        setWishlist(prev =>
            prev.includes(productId)
                ? prev.filter(id => id !== productId)
                : [...prev, productId]
        );
        toast.success("Wishlist updated!", { position: "top-center", autoClose: 3000 });
    };

    useEffect(() => {
        document.body.style.overflow = selectedProduct ? 'hidden' : '';
    }, [selectedProduct]);

    const handleAddToCart = (productId, quantity) => {
        let selectPro = products.find(p => p.id === productId);
        if (!selectPro) return;

        let numericQuantity = parseFloat(quantity);
        let totalPrice = numericQuantity * selectPro.price;

        setSelectedProducts(prev => {
            let updatedProducts = prev.map(p =>
                p.title === selectPro.productTitle
                    ? { ...p, quantity, proTotalPrice: totalPrice }
                    : p
            );

            if (!quantity) {
                updatedProducts = updatedProducts.filter(p => p.title !== selectPro.productTitle);
            } else if (!prev.some(p => p.title === selectPro.productTitle)) {
                updatedProducts.push({
                    id: selectPro.id,
                    title: selectPro.productTitle,
                    productImage: selectPro.productImage,
                    price: selectPro.price,
                    type: selectPro.type,
                    quantity,
                    proTotalPrice: totalPrice
                });
            }

            return updatedProducts;
        });

        toast.success("Product added!", { position: "top-center", autoClose: 3000, className: 'customSuccessToast' });
    };
    const handleOrder = () => setShowOrderSummary(true);
    const handleGoBack = () => setShowOrderSummary(false);

    const handlePopupSubmit = () => {
        if (!userName.trim() || !userMobile.trim()) {
            alert("Please enter valid Name and Mobile Number");
            return;
        }

        if (!/^\d{10}$/.test(userMobile)) {
            alert("Please enter a valid 10-digit mobile number.");
            return;
        }

        localStorage.setItem('userInfo', JSON.stringify({ name: userName, mobile: userMobile }));
        setShowPopup(false);
    };

    const handleUserProfile = () => {
        setShowPopup(true);
    };

   const filteredProducts = products.filter(product => {
  // Match search text
  const matchesSearch =
    !search ||
    (product.productTitle &&
      product.productTitle.toLowerCase().includes(search.toLowerCase()));

  // Match price range
  let matchesPrice = true;
  const price = parseFloat(product.price);
  if (priceRange === 'below500') matchesPrice = price < 500;
  else if (priceRange === '500to1000') matchesPrice = price >= 500 && price <= 1000;
  else if (priceRange === 'above1000') matchesPrice = price > 1000;

  // Match selected type
  const matchesType = !selectedType || product.type === selectedType;

  // Final filter result
  return matchesSearch && matchesPrice && matchesType;
});

    if (showOrderSummary) {
        return (
            <OrderSummary
                selectedProducts={selectedProducts}
                setSelectedProducts={setSelectedProducts}
                goBack={handleGoBack}
            />
        );
    }

    const filterOption = [
        {
            "id": "21",
            "productImage": "/img/dalfry.jpg",
            "title": "All",
            "type": ""
        },
        {
            "id": "25",
            "productImage": "/img/Masala Sandwich.jpg",
            "title": "Startup",
            "type": "startup"
        },
        {
            "id": "21",
            "productImage": "/img/dalfry.jpg",
            "title": "Dal",
            "type": "dal"
        },
        {
            "id": "25",
            "productImage": "/img/plan-rice.jpg",
            "title": "Chawal",
            "type": "chawal"
        },
        {
            "id": "21",
            "productImage": "/img/pizza-1.jpg",
            "title": "Pizza",
            "type": "pizza"
        }     
    ];

    const filterProducts = (selectedType) => {
    const result =  products.filter(product => product.type === selectedType);
    console.log("result", result)
    setIcProducts(result)
    };

    return (
        <>
            <div className={styles.header}>
                <div className={styles.shopName}>Smart Restaurant</div> 
                <div className={styles.bannerSection}>
                 <img
                                src={'/img/1600w-N0tLXTR6eGs.webp'}
                                className={styles.bannerImage}
                                alt={'banner'}
                            />
            </div>               
            </div>

            

           <div className={styles.container}>
  {showPopup && (
    <div className={styles.popup}>
      <div className={styles.popupContent}>
        <h2>Enter Your Details</h2>
        <input
          type="text"
          placeholder="Enter Name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className={styles.input}
        />
        <input
          type="tel"
          placeholder="Enter Whatsapp Number"
          value={userMobile}
          onChange={(e) => setUserMobile(e.target.value)}
          className={styles.input}
        />
        <button onClick={handlePopupSubmit} className={styles.submitButton}>
          Submit
        </button>
      </div>
    </div>
  )}

  {/* Main content with filter and products */}
  <div className={styles.mainContent}>
    {/* Filter Panel on Left */}
    <div className={styles.filterPanel}>
      <div className={styles.filterRow}>
        {filterOption.map(opt => (
          <button
            key={opt.id}
            className={selectedType === opt.type ? styles.activeFilter : ''}
            onClick={() => setSelectedType(opt.type)}
          >
            <img
              src={opt.productImage}
              alt={opt.title}
              className={styles.filterImage}
            />
            {opt.title}
          </button>
        ))}
      </div>
    </div>

    {/* Product List on Right */}
    <div className={styles.productList}>
      {isLoading ? (
        <div className={styles.loadercontainer}><div className={styles.loader}></div></div>
      ) : (
        <>
          {filteredProducts.length > 0 ? (
            filteredProducts.map(product => (
              <div
                key={product.id}
                className={styles.productCard}
                onClick={() => setSelectedProduct(product)}
              >
                <img
                  src={product.productImage}
                  alt={product.productTitle}
                  className={styles.productImage}
                />
                <div className={styles.productDetails}>
                  <div className={styles.actions}>
                    <span className={styles.productTitle}>{product.productTitle}</span>
                  </div>
                </div>
                <div className={styles.priceRow}>
                  <span className={styles.productPrice}>₹{product.price}</span>
                  <span className={styles.originalPrice}>₹{product.originalPrice}</span>
                  {product.originalPrice > product.price && (
                    <span className={styles.discount}>
                      {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                    </span>
                  )}
                </div>
                <div className={styles.reviewRow}>
                  <span className={styles.rating}>{product.rating}</span>
                  <span className={styles.star}>★</span>
                  <span className={styles.reviewCount}>({product.reviewCount} Reviews)</span>
                </div>
              </div>
            ))
          ) : (
            <p>No products available</p>
          )}
        </>
      )}
    </div>
  </div>

  <div className={styles.bottomBarRow}></div>
</div>


            {selectedProduct && (
                <div className={styles.modalOverlay} onClick={() => setSelectedProduct(null)}>
                    <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                        <button onClick={() => setSelectedProduct(null)} className={styles.closeBtn}>×</button>
                        <div className={styles.modalContentWithButton}>
                            
                            <img
                                src={selectedProduct.productImage}
                                className={styles.productImageDetails}
                                alt={selectedProduct.productTitle}
                            />
                            <div className={styles.modalHeader}>
                                <h2 className={styles.productTitleDetails}>{selectedProduct.productTitle}</h2>
                                <div className={styles.wishlisDetailstIcon} onClick={() => handleToggleWishlist(selectedProduct.id)}>
                                    <img
                                        src={wishlist.includes(selectedProduct.id) ? 'icon/redheart.png' : 'icon/blackheart.png'}
                                        alt="Wishlist"
                                        className={styles.wishlistIconImg}
                                    />
                                </div>
                            </div>
                            <div className={styles.priceRowDetails}>
                                 <span className={styles.productPrice}>₹{selectedProduct.price}</span>
                                        <span className={styles.originalPrice}>₹{selectedProduct.originalPrice}</span>
                                        {selectedProduct.originalPrice > selectedProduct.price && (
                                        <span className={styles.discount}>
                                            {Math.round(((selectedProduct.originalPrice - selectedProduct.price) / selectedProduct.originalPrice) * 100)}% OFF
                                        </span>
                                        )}
                            </div>
                            <div className={styles.reviewRowDetails}>
                                <span className={styles.ratingDetails}>{selectedProduct.rating}</span>
                                <span className={styles.starDetails}>★</span>
                                <span className={styles.reviewCountDetails}>({selectedProduct.reviewCount} Reviews)</span>
                            </div>
                            <p><strong>Note:</strong> {selectedProduct.note}</p>
                            <p><strong>Description:</strong> {selectedProduct.description}</p>
                            {/* <button type="button" className={styles.addToCardDetails}>Add To Card</button> */}

                            {/* {selectedProducts.some(p => p.id === selectedProduct.id) ? (
                                <div className={styles.qtyButtonsDetails}>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            const existing = selectedProducts.find(p => p.id === selectedProduct.id);
                                            if (existing.quantity > 1) {
                                                handleAddToCart(selectedProduct.id, existing.quantity - 1);
                                            } else {
                                                handleAddToCart(selectedProduct.id, '');
                                            }
                                        }}
                                    >
                                        −
                                    </button>
                                    <span>
                                        {selectedProducts.find(p => p.id === selectedProduct.id)?.quantity}
                                    </span>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            const existing = selectedProducts.find(p => p.id === selectedProduct.id);
                                            handleAddToCart(selectedProduct.id, Number(existing.quantity) + 1);
                                        }}
                                    >
                                        +
                                    </button>
                                </div>
                            ) : (
                                <button
                                    type="button"
                                    className={styles.addToCardDetails}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleAddToCart(selectedProduct.id, 1);
                                    }}
                                >
                                    Add To Cart
                                </button>
                            )} */}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
