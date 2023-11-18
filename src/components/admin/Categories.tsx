import { ChangeEvent, FormEvent, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { AppDispatch, RootState } from "../../redux/store";
import { addCategory, deleteCategory, updateCategory, searchCategory, sortCategories } from "../../redux/slices/categories/categorySlice";
import { v4 as uuidv4 } from 'uuid';
import AdminFunctions from "./AdminFunctions";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faMagnifyingGlass, faSort } from '@fortawesome/free-solid-svg-icons';

const Categories = () => {

  const { categories, isLoading, error, searchTerm } = useSelector((state: RootState) => state.categories);
  const [categoryName, setCategoryName] = useState('');
  const [isUpdate, setIsUpdate] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(0);
  const [createCategoryError, setCreateCategoryError] = useState("");

  const dispatch: AppDispatch = useDispatch();

  if (isLoading) {
      return <p>Loading Categories data...</p>
  }
  if (error) {
      return <p>{error}</p>
  }

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    let searchTerm = event.target.value;
    dispatch(searchCategory(searchTerm));
  };

  const searchedCategories = searchTerm ? categories.filter((category) => 
  category.name.toLowerCase().includes(searchTerm.toLocaleLowerCase())) : categories;

  const handleOptionChange = (event: ChangeEvent<HTMLSelectElement>) => {
    let searchTerm = event.target.value;
    dispatch(sortCategories(searchTerm));
  };

  const handleCategoryChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCategoryName(event.target.value);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    try {
      const testCondition = /[^a-zA-Z]/;
      if(testCondition.test(categoryName)) {
        setCreateCategoryError('* Category name cannot contain symbols or numbers');
        return;
      }
      setCreateCategoryError('');
      if(!isUpdate) {
        const newCategory = { id: uuidv4(), name: categoryName }
        dispatch(addCategory(newCategory));      
      }
      else {
        const UpdateCategoryData = { id: selectedCategoryId, name: categoryName }
        dispatch(updateCategory(UpdateCategoryData));
        setIsUpdate(!isUpdate);
      }
      setCategoryName('');
  }
  catch(error) {
    console.log(error);
  }
  };

  const handleUpdate = (id: number, name: string) => {
    setSelectedCategoryId(id);
    setIsUpdate(!isUpdate);
    setCategoryName(name);
  };

  const handleDelete = (id: number) => {
    dispatch(deleteCategory(id));
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
                <input type="text" name="searchCategory" id="searchCategory" placeholder="Search by category name" onChange={handleSearch} value={searchTerm}/>
              </div>

              <div className="admin-products-functions-sort">
                <FontAwesomeIcon icon={faSort} size="lg" style={{color: "#7D7C7C"}} />
                <select name="sort" id="sort" defaultValue={"none"} onChange={handleOptionChange}>
                  <option value="none" disabled hidden>Sort</option>
                  <option value="AtoZ">Name (A - Z)</option>
                  <option value="ZtoA">Name (Z - A)</option>
                </select>
              </div>

              <div className="admin-products-functions-create">
                <form onSubmit={handleSubmit}>
                  <input type="text" name="Category" id="Category" placeholder="Enter category name" value={categoryName} onChange={handleCategoryChange} required/>
                  <button className="">{isUpdate ? 'UPDATE' : 'CREATE'}</button>
                  <div className="error-message">
                    <p>
                      {createCategoryError && 
                        <p>{createCategoryError}</p>
                      }
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
          
          <div className="users">
            <table>
              <tr>
                <th>Name</th>
                <th></th>
                <th></th>
              </tr>
              {searchedCategories.length > 0 &&
                searchedCategories.map((category) => {
                  const { id, name } = category;
                  return (
                    <tr key={id}>
                    <td>{name}</td>
                    <td className="category-update-div"><button className="category-update-div-btn" onClick={()=> {handleUpdate(category.id, category.name)}}>UPDATE</button></td>
                    <td className="delete-user"><FontAwesomeIcon icon={faTrashCan} size="lg" onClick={()=>{handleDelete(category.id)}} /></td>
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

export default Categories;