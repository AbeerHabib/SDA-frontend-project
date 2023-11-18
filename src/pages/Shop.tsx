import { ChangeEvent, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { AppDispatch, RootState } from "../redux/store";
import { searchProduct, sortProducts } from "../redux/slices/products/productSlice";
import { addToCart } from "../redux/slices/cart/cartSlice";
import { Product } from "../types/ProductType";
import ProductFilteringSidebar from "../components/ProductFilteringSidebar";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faSort } from "@fortawesome/free-solid-svg-icons";

const Shop = () => {
  const dispatch: AppDispatch = useDispatch();
  const { products, isLoading, error, searchTerm } = useSelector((state: RootState) => state.products);
  
  const [checkedCategories, setCheckedCategories] = useState<number []>([]);
  const [priceRange, setPriceRange] = useState<number []>([]);
  
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(3);

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    let searchTerm = event.target.value;
    dispatch(searchProduct(searchTerm));
  };

  const handleOptionChange = (event: ChangeEvent<HTMLSelectElement>) => {
    let searchTerm = event.target.value;
    dispatch(sortProducts(searchTerm));
  };

  const filterProducts = products.filter((product) => {
    
    const searchMatch = searchTerm !== '' ? product.name.toLowerCase().includes(searchTerm.toLocaleLowerCase()) : product
    
    const categoryMatch = checkedCategories.length > 0 ? checkedCategories.some((id) => product.categories.includes(Number(id))) : product
    
    const priceMatch = priceRange.length > 0 ? product.price >= priceRange[0] && product.price <= priceRange[1] : product

    return searchMatch && categoryMatch && priceMatch;
  })

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filterProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filterProducts.length / productsPerPage);

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  }

  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  }

  let buttonElements = [];
  for (let i = 2; i <= totalPages - 1; i++) {
    buttonElements.push(<button key={i} onClick={() => {handlePageChange(i)}} className="pagination-btn-pages">{i}</button>);
  }

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart(product));
  }

  if (isLoading) {
    return <p>Loading products data...</p>
  }
  if (error) {
    return <p>{error}</p>
  }

  return (
    <div className="shop-container">

      <ProductFilteringSidebar 
      checkedCategories={checkedCategories} 
      setCheckedCategories={setCheckedCategories}
      setPriceRange={setPriceRange}
      />

      <div className="shop-main-content">
        <div className="shop-main-content-div">
          
          <div className="products-functions">
            <div className="products-functions-search-n-sort">
              <div className="products-functions-search">
                <FontAwesomeIcon icon={faMagnifyingGlass} size="lg" style={{color: "#7D7C7C"}} />
                <input type="text" name="searchProduct" id="searchProduct" placeholder="Search by product name" onChange={handleSearch} value={searchTerm}/>
              </div>

              <div className="products-functions-sort">
                <FontAwesomeIcon icon={faSort} size="lg" style={{color: "#7D7C7C"}} />
                <select name="sort" id="sort" defaultValue={"none"} onChange={handleOptionChange}>
                  <option value="none" disabled hidden>Sort</option>
                  <option value="AtoZ">Name (A - Z)</option>
                  <option value="ZtoA">Name (Z - A)</option>
                  <option value="lowToHigh">Price (Low - High)</option>
                  <option value="highToLow">Price (High - Low)</option>
                </select>
              </div>
            </div>

            <hr className="line"/>
          </div>
                    
          <div className="products">
            {currentProducts.length > 0 &&
              currentProducts.map((product: Product) => {
                const { id, name, image, description, price } = product;
                return (
                  <div key={id} className="product">
                    <Link to={`/shop/product/${id}`}>
                      <img src={image} alt={name} className="user-product-img"/>
                    </Link>

                    <div className='product-details'>
                      <div className="product-details-name-n-price">
                        <p className="product-name">{name}</p>
                        <p className="product-price"><b>{price} SAR</b></p>
                      </div>

                      <div className="product-desc">
                        <p >{description}</p>
                      </div>

                      <div className="user-product-settings">
                        <button onClick={()=>{handleAddToCart(product)}}>Add To Cart</button>
                      </div>
                    </div>
                  </div>
                );
              })
            }
          </div>

          <div className="pagination">
            <button onClick={handlePreviousPage} disabled={currentPage == 1} className="pagination-btn">&laquo;</button>
            {buttonElements}
            <button onClick={handleNextPage} disabled={currentPage == totalPages} className="pagination-btn">&raquo;</button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Shop;