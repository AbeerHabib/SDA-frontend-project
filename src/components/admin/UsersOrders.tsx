import { ChangeEvent } from "react";
import { useSelector, useDispatch } from "react-redux";

import { AppDispatch, RootState } from "../../redux/store";
import { searchOrder, sortOrders } from "../../redux/slices/orders/orderSlice";
import AdminFunctions from "./AdminFunctions";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faMagnifyingGlass, faSort } from "@fortawesome/free-solid-svg-icons";

const UsersOrders = () => {

  const { orders, isLoading, error, searchTerm } = useSelector((state: RootState) => state.orders);
  const dispatch: AppDispatch = useDispatch();

  if (isLoading) {
    return <p>Loading Orders data...</p>
  }
  if (error) {
    return <p>{error}</p>
  }

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    let searchTerm = event.target.value;
    dispatch(searchOrder(searchTerm));
  };

  const searchedOrders = searchTerm ? orders.filter((order) => (order.productId == Number(searchTerm))) : orders;

  const handleOptionChange = (event: ChangeEvent<HTMLSelectElement>) => {
    let searchTerm = event.target.value;
    dispatch(sortOrders(searchTerm));
  };

  return (
    <div className="categories-container">

      <AdminFunctions />

      <div className="main-content">
        <div className="main-content-div">

          <div className="users-functions">
            <div className="users-functions-search-n-sort">
              <div className="users-functions-search">
                <FontAwesomeIcon icon={faMagnifyingGlass} size="lg" style={{color: "#7D7C7C"}} />
                <input type="text" name="searchOrder" id="searchOrder" placeholder="Search by product Id" onChange={handleSearch} value={searchTerm} />
              </div>

              <div className="users-functions-sort">
                <FontAwesomeIcon icon={faSort} size="lg" style={{color: "#7D7C7C"}} />
                <select name="sort" id="sort" defaultValue={"none"} onChange={handleOptionChange}>
                  <option value="none" disabled hidden>Sort</option>
                  <option value="ascending">Date (Oldest - Newest)</option>
                  <option value="descending">Date (Newest - Oldest)</option>
                </select>
              </div>
            </div>            
          </div>

          <div className="orders">
            <table>
              <tr>
                <th>Order</th>
                <th>Product Id</th>
                <th>User Id</th>
                <th>Purchased at</th>
                <th></th>
              </tr>
              {searchedOrders.length > 0 &&
              searchedOrders.map((order) => {
                const { id, productId, userId, purchasedAt } = order;
                return (
                  <tr key={id}>
                    <td className="order-id">{id}</td>
                    <td>{productId}</td>
                    <td>{userId}</td>
                    <td>{String(purchasedAt)}</td>
                    <td className="order-status"><FontAwesomeIcon icon={faCircleCheck} size="lg" style={{color: "green"}}/></td>
                  </tr>
                );
              })
              }
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UsersOrders;