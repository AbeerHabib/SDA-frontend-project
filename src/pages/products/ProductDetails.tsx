import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { AppDispatch, RootState } from "../../redux/store";
import { fetchSingleProduct } from "../../redux/slices/products/singleProductSlice";
import { Product } from "../../types/ProductType";
import { addToCart } from "../../redux/slices/cart/cartSlice";

const ProductDetails = () => {

  const { id } = useParams();

  const { product, isLoading, error } = useSelector((state: RootState) => state.singleProduct);
  const { categories } = useSelector((state: RootState) => state.categories);

  const dispatch: AppDispatch = useDispatch();

  useEffect (() => {
    dispatch(fetchSingleProduct(Number(id)));
  }, [dispatch, id]);

  if (isLoading) {
    return <p>Loading product data...</p>
  }
  if (error) {
    return <p>{error}</p>
  }
  
  const getCategoryNameById = (categoryId: Number) => {
    const category = categories.find((category) => category.id == categoryId)
    return category ? category.name + ', ' : ''
  }

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart(product));
  }
  
  return (
    <div className="product-container">
      <div className="main-content">
        <div className="main-content-div">

          {product && (
            <div key={product.id} className="single-product">
              <div className="img-n-sizes">
                <img src={product.image} alt={product.name} />
                {product.sizes && product.sizes.length > 0 && (  
                <div className="sizes">
                  <ul>
                    <label className="sizes-variants-label">Sizes:</label>
                    {product.sizes.map((size, id) => (
                      <li key={id}>{size}</li>
                    ))}
                  </ul>
                </div>
                )}
              </div>
              
              <div className="single-product-details">
                <div className="name-n-price">
                  <h1>{product.name}</h1>
                  <p className="single-product-price">{product.price} SAR</p>
                </div>

                <div className="single-product-description">
                  <p>{product.description}</p>
                </div>
                
                {product.variants && product.variants.length > 0 && ( 
                <div className="variants">
                  <ul>
                    <label className="sizes-variants-label">Variants:</label>
                    {product.variants.map((variant, id) => (
                      <li key={id}>{variant}</li>
                    ))}
                  </ul>
                </div>
                )}

                <hr/>
                
                <div className="product-categories">
                  <p>Categories:{' '}
                    {product.categories &&
                    product.categories.map((categoryId) => getCategoryNameById(categoryId))}
                  </p>
                </div>

                <div className="single-product-btn">
                  <button onClick={()=>{handleAddToCart(product)}}>Add To Cart</button>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default ProductDetails;