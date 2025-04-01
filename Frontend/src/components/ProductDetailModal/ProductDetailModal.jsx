import React, { useContext, useState } from 'react';
import { StoreContext } from '../../context/StoreContext';
import './ProductDetailModal.css';
import { assets } from '../../assets/assets';

const ProductDetailModal = ({ item, onClose }) => {
  const { cartItems, addToCart, removeFromCart, url } = useContext(StoreContext);
  const [selectedImage, setSelectedImage] = useState(0);
  
  // Make sure we're using the correct ID property - use item._id instead of item.id
  const itemId = item._id;
  
  // For demo purposes - creating multiple image variations
  // In a real app, you would use actual different images from your backend
  const productImages = [
    item.image,
    item.image,
    item.image,
    item.image
  ];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-image-section">
          <div className="modal-image-container">
            <img 
              src={url + "/images/" + productImages[selectedImage]} 
              alt={item.name} 
              className="modal-image" 
            />
            <button className="close-button" onClick={onClose}>×</button>
          </div>
          <div className="thumbnail-container">
            {productImages.map((img, index) => (
              <div 
                key={index} 
                className={`thumbnail ${selectedImage === index ? 'active-thumbnail' : ''}`}
                onClick={() => setSelectedImage(index)}
              >
                <img src={url + "/images/" + img} alt={`${item.name} - view ${index + 1}`} />
              </div>
            ))}
          </div>
        </div>
        <div className="modal-info">
          <div className="modal-header">
            <h2>{item.name}</h2>
            <img src={assets.rating_starts} alt="Rating" />
          </div>
          <p className="modal-description">{item.description}</p>
          <p className="modal-price">₹{item.price}</p>
          
          <div className="modal-actions">
            {!cartItems[itemId] ? (
              <button className="add-to-cart-btn" onClick={() => addToCart(itemId)}>
                <img src={assets.add_icon_white} alt="Add" />
                <span>Add to Cart</span>
              </button>
            ) : (
              <div className="cart-quantity-control">
                <img 
                  onClick={() => removeFromCart(itemId)} 
                  src={assets.remove_icon_red} 
                  alt="Remove" 
                /> 
                <p>{cartItems[itemId]}</p>
                <img 
                  onClick={() => addToCart(itemId)} 
                  src={assets.add_icon_green} 
                  alt="Add" 
                />
              </div>
            )}
          </div>
          
          <div className="product-details-section">
            <h3>Food Details</h3>
            <ul>
              <li><strong>Category:</strong> {item.category || 'Food'}</li>
              <li><strong>Preparation Time:</strong> 15-20 mins</li>
              <li><strong>Delivery:</strong> 30-45 mins</li>
              <li><strong>Dietary Info:</strong> {item.dietary || 'Regular'}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailModal;