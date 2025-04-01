import React, { useContext } from 'react'
import './FoodItem.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'

const FoodItem = ({id, name, price, description, image, onClick}) => {
    const{cartItems, addToCart, removeFromCart, url} = useContext(StoreContext)
    
    return (
        <div>
            <div className='food-item' onClick={onClick}>
                <div className="food-item-img-container">
                    <img className='food-item-image' src={url+"/images/"+image} alt="" />
                    {/* Stop propagation to prevent modal from opening when clicking add/remove buttons */}
                    <div onClick={(e) => e.stopPropagation()}>
                        {!cartItems[id]
                         ?<img className='add' onClick={()=>addToCart(id)} src={assets.add_icon_white} alt="" srcset="" />
                         :<div className='food-item-counter'>
                            <img onClick={()=>removeFromCart(id)} src={assets.remove_icon_red} alt="" srcset="" /> 
                            <p>{cartItems[id]}</p>
                            <img onClick={()=>addToCart(id)} src={assets.add_icon_green} alt="" />
                         </div> 
                        }
                    </div>
                </div>
                <div className="food-item-info">
                    <div className="food-item-name-rating">
                        <p>{name}</p>
                        <img src={assets.rating_starts} alt="" />
                    </div>
                    <p className="food-item-desc">{description}</p>
                    <p className="food-item-price">₹{price}</p>
                </div>
            </div>
        </div>
    )
}

export default FoodItem
