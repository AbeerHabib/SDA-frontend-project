import { ChangeEvent, FormEvent, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { AppDispatch, RootState } from "../../redux/store";
import { addProduct, deleteProduct, searchProduct, sortProducts, updateProduct } from "../../redux/slices/products/productSlice";
import { Product } from "../../types/ProductType";
import AdminFunctions from "./AdminFunctions";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faMagnifyingGlass, faSort } from '@fortawesome/free-solid-svg-icons';

const Products = () => {
  const initialProductState: Product = {
    id: 0,
    name: '',
    image: '',
    description: '',
    categories: [],
    variants: [],
    sizes: [],
    price: 0,
  }

  const { products, isLoading, error, searchTerm } = useSelector((state: RootState) => state.products);
  const { categories } = useSelector((state: RootState) => state.categories);
  const [product, setProduct] = useState<Product>(initialProductState),
  [isUpdate, setIsUpdate] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(0);
  
  const dispatch: AppDispatch = useDispatch();

  if (isLoading) {
    return <p>Loading products data...</p>
  }
  if (error) {
    return <p>{error}</p>
  }

  const getCategoryNameById = (categoryId: Number) => {
    const category = categories.find((category) => category.id == categoryId)
    return category ? category.name + ', ' : '';
  }

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    let searchTerm = event.target.value;
    dispatch(searchProduct(searchTerm));
  };

  const searchedProducts = searchTerm ? products.filter((product) => product.name.toLowerCase().includes(searchTerm.toLocaleLowerCase())) : products;

  const handleOptionChange = (event: ChangeEvent<HTMLSelectElement>) => {
    let searchTerm = event.target.value;
    dispatch(sortProducts(searchTerm));
  };

  const handleProductChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    const isList = name === 'categories' || name === 'variants' || name === 'sizes';
    if (isList) {
      setProduct({
        ...product,
        [name]: value.split(',')
      });
    }
    else {
      setProduct({ ...product, [name]: value });
    }
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    product.id = +new Date();
    if(!isUpdate) {
      dispatch(addProduct(product));
    }
    else {
      const UpdateProductData = { ...product, id: selectedProductId };
      dispatch(updateProduct(UpdateProductData));
      setIsUpdate(!isUpdate);
    }
    setProduct(initialProductState);
  };

  const handleUpdate = (id: number, name: string, image: string, description: string, 
    categories: number[], variants: string[], sizes: string[], price: number) => {
      setSelectedProductId(id);
      setIsUpdate(!isUpdate);
      setProduct({ ...product, name, image, description, categories, variants, sizes, price });
  };

  const handleDelete = (id: number) => {
    dispatch(deleteProduct(id));
  };

  return (
    <div className="categories-container">

      <AdminFunctions />

      <div className="main-content">
        <div className="main-content-div">

          <div className="admin-products-functions">
            <div className="admin-products-functions-searchSortCreate">
              <div className="admin-products-functions-search">
                <FontAwesomeIcon icon={faMagnifyingGlass} size="lg" style={{color: "#7D7C7C"}} />
                <input type="text" name="searchProduct" id="searchProduct" placeholder="Search by product name" onChange={handleSearch} value={searchTerm}/>
              </div>

              <div className="admin-products-functions-sort">
                <FontAwesomeIcon icon={faSort} size="lg" style={{color: "#7D7C7C"}} />
                <select name="sort" id="sort" defaultValue={"none"} onChange={handleOptionChange}>
                  <option value="none" disabled hidden>Sort</option>
                  <option value="AtoZ">Name (A - Z)</option>
                  <option value="ZtoA">Name (Z - A)</option>
                  <option value="lowToHigh">Price (Low - High)</option>
                  <option value="highToLow">Price (High - Low)</option>
                </select>
              </div>
              
              <div className="create-product-form">
                <form onSubmit={handleSubmit}>
                  <input type="text" name="name" id="name" placeholder="Product Name" value={product.name} onChange={handleProductChange} required/>
                  <input type="text" name="image" id="image" placeholder="Image URL" value={product.image} onChange={handleProductChange} required/>
                  <textarea name="description" id="description" placeholder="Product Description" value={product.description} onChange={handleProductChange}/>
                  <input type="text" name="categories" id="categories" placeholder="Categories (add Categories using their numbers) (use comma , to create multiple)" value={product.categories.join(',')} onChange={handleProductChange} required/>
                  <input type="text" name="variants" id="variants" placeholder="Variants (use comma , to create multiple)" value={product.variants.join(',')} onChange={handleProductChange}/>
                  <input type="text" name="sizes" id="sizes" placeholder="Sizes (use comma , to create multiple)" value={product.sizes.join(',')} onChange={handleProductChange}/>
                  <input type="text" name="price" id="price" placeholder="Price" value={product.price} onChange={handleProductChange} required/>
                  <button className="create-product-btn">{isUpdate ? 'UPDATE' : 'CREATE'}</button>
                </form>
              </div>
            </div>
          </div>

          <div className="users">
            <table>
              <tr>
                <th>Name</th>
                <th>Image</th>
                <th>Description</th>
                <th>categories</th>
                <th>Variants</th>
                <th>Sizes</th>
                <th>Price</th>
              </tr>
              {searchedProducts.length > 0 &&
              searchedProducts.map((product) => {
                const { id, name, image, description, categories, variants, sizes, price } = product;
                return (
                  <tr key={id}>
                    <td>{name}</td>
                    <td><img src={image} alt={name} className="product-img"/></td>
                    <td className="product-description">{description}</td>
                    <td>{categories &&
                        categories.map((categoryId) => getCategoryNameById(categoryId))}
                    </td>
                    <td className="product-variant">{variants && variants.join(', ')}</td>
                    <td>{sizes && sizes.join(', ')}</td>
                    <td className="product-price">{price} SAR</td>
                    <td className="category-update-div"><button className="category-update-div-btn" 
                    onClick={()=> {handleUpdate(product.id, product.name, product.image, product.description, product.categories
                    , product.variants, product.sizes, product.price)}}>UPDATE</button></td>
                    <td className="delete-user"><FontAwesomeIcon icon={faTrashCan} size="lg" onClick={()=>{handleDelete(product.id)}} /></td>
                  </tr>
                );
              })
              }
            </table>
          </div>
            
        </div>
      </div>
    </div>
  );
};

export default Products;