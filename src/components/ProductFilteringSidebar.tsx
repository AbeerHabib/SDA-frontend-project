import React, { useState } from "react";
import { useSelector } from "react-redux";

import { RootState } from "../redux/store";
import { Category } from "../types/CategoryType";
import { prices } from "../prices";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

type ProductProductFilteringSidebarProps = {
    checkedCategories: number[];
    setCheckedCategories: React.Dispatch<React.SetStateAction<number[]>>;
    setPriceRange: React.Dispatch<React.SetStateAction<number[]>>;
}

const ProductFilteringSidebar = ({ checkedCategories, setCheckedCategories, setPriceRange }: ProductProductFilteringSidebarProps) => {
    const { categories } = useSelector((state: RootState) => state.categories);

    // Filter products based on selected categories
    const handleCheckedCategoryChange = (categoryId: number) => {
        if(checkedCategories.includes(categoryId)) {
            const filteredCategories = checkedCategories.filter((c: number) => c !== categoryId);
            setCheckedCategories(filteredCategories);
        }
        else {
            setCheckedCategories((prevState: number []) => [...prevState, categoryId]);
        }
    }

    // Filter products based on selected price
    const handlePriceChange = (priceId: number) => {
        const selectedPriceObj = prices.find((price) => price.id == priceId);
        if(selectedPriceObj) {
            setPriceRange(selectedPriceObj.range);
            
        }
    }  
    
    // Visibilty for the filter lists
    const [visibility, setVisibility] = useState({
        isCategoryVisibile: true,
        isPriceVisible: true
    });

    const handleCategoriesClick = () => {
        setVisibility(prevState => ({
            ...prevState,
            isCategoryVisibile: !prevState.isCategoryVisibile
        }));
    }

    const handlePricesClick = () => {
        setVisibility(prevState => ({
            ...prevState,
            isPriceVisible: !prevState.isPriceVisible
        }));
    }
 
    return (
        <aside className="filtering-sidebar">
            <div className="filtering-sidebar-container">
                    
                <div className="filtering-sidebar-section">
                    <div className="filtering-sidebar-section-title">
                        <p>Categories</p>
                        <FontAwesomeIcon icon={visibility.isCategoryVisibile ? faMinus : faPlus} style={{color: "#7D7C7C", cursor: "pointer"}} size="lg" onClick={handleCategoriesClick}/>
                    </div>
                        
                    {visibility.isCategoryVisibile && (
                    <div className="filtering-sidebar-section-options">
                        <div className="filtering-options-div">
                            {categories.length > 0 &&
                            categories.map((category: Category) => {
                                return (
                                    <div className="filtering-options-div-item" key={category.id}>
                                        <label>
                                            <input type="checkbox" name="category" value={category.id} onChange={() => {handleCheckedCategoryChange(category.id)}}/>
                                            {category.name}
                                        </label>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    )}
                </div>
                    
                <div className="filtering-sidebar-section">
                    <div className="filtering-sidebar-section-title">
                        <p>Price</p>
                        <FontAwesomeIcon icon={visibility.isPriceVisible ? faMinus : faPlus} style={{color: "#7D7C7C", cursor: "pointer"}} size="lg" onClick={handlePricesClick}/>
                    </div>
                        
                    {visibility.isPriceVisible && (
                    <div className="filtering-sidebar-section-options">
                        <div className="filtering-options-div">
                            {prices.length > 0 &&
                            prices.map((price) => {
                                return (
                                    <div className="filtering-options-div-item" key={price.id}>
                                        <label>
                                            <input type="radio" name="price" value={price.id} onChange={() => {handlePriceChange(price.id)}}/>
                                            {price.name}
                                        </label>
                                    </div>
                                );
                            })
                            }
                        </div>
                    </div>
                    )}
                </div>
            </div>
        </aside>
    )
}

export default ProductFilteringSidebar;