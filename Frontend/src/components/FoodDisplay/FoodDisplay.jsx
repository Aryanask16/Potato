import React, { useContext, useState, useEffect } from 'react'
import './FoodDisplay.css'
import { StoreContext } from '../../context/StoreContext'
import FoodItem from '../FoodItem/FoodItem'
import ProductDetailModal from '../ProductDetailModal/ProductDetailModal'

const FoodDisplay = ({category}) => {
    const {food_list, cartItems} = useContext(StoreContext)
    const [selectedItem, setSelectedItem] = useState(null)
    
    // Update selectedItem when cart changes
    useEffect(() => {
        if (selectedItem) {
            // Find the latest version of the item from food_list
            const updatedItem = food_list.find(item => item._id === selectedItem._id);
            if (updatedItem) {
                setSelectedItem(updatedItem);
            }
        }
    }, [cartItems, food_list, selectedItem]);
    
    const handleItemClick = (item) => {
        setSelectedItem(item)
    }
    
    const closeModal = () => {
        setSelectedItem(null)
    }
    
    return (
        <div className='food-display' id='food-display'>
            <h2>Top Dishes near you </h2>
            <div className="food-display-list">
                {food_list.map((item, index) => {
                    if (category === "All" || category === item.category) {
                        return (
                            <FoodItem 
                                key={index} 
                                id={item._id} 
                                name={item.name}
                                description={item.description} 
                                price={item.price} 
                                image={item.image}
                                onClick={() => handleItemClick(item)} 
                            />
                        )
                    }
                    return null
                })}
            </div>
            
            {selectedItem && (
                <ProductDetailModal 
                    item={selectedItem} 
                    onClose={closeModal} 
                />
            )}
        </div>
    )
}

export default FoodDisplay
