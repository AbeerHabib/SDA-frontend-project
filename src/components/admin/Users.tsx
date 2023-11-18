import { ChangeEvent } from "react";
import { useSelector, useDispatch } from "react-redux";

import { AppDispatch, RootState } from "../../redux/store";
import { banUser, deleteUser, searchUser, sortUsers } from "../../redux/slices/users/userSlice";
import { User } from "../../types/UserType";
import AdminFunctions from "./AdminFunctions";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBan, faMagnifyingGlass, faSort, faTrashCan } from "@fortawesome/free-solid-svg-icons";

const Users = () => {

  const { users, isLoading, error, searchTerm } = useSelector((state: RootState) => state.users);
  const dispatch: AppDispatch = useDispatch();
  
  if (isLoading) {
    return <p>Loading Users data...</p>
  }
  if (error) {
    return <p>{error}</p>
  }

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    let searchTerm = event.target.value;
    dispatch(searchUser(searchTerm));
  };

  const searchedUsers = searchTerm ? users.filter((user) => 
  user.firstName.toLowerCase().includes(searchTerm.toLocaleLowerCase())) : users;

  const handleOptionChange = (event: ChangeEvent<HTMLSelectElement>) => {
    let searchTerm = event.target.value;
    dispatch(sortUsers(searchTerm));
  };

  const handleDelete = (id: number) => {
    dispatch(deleteUser(id));
  };

  const handleBan = (id: number) => {
    dispatch(banUser(id));
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
                  <input type="text" name="searchUser" id="searchUser" placeholder="Search by user's first name" onChange={handleSearch} value={searchTerm} />
                </div>

                <div className="users-functions-sort">
                  <FontAwesomeIcon icon={faSort} size="lg" style={{color: "#7D7C7C"}} />
                  <select name="sort" id="sort" defaultValue={"none"} onChange={handleOptionChange}>
                    <option value="none" disabled hidden>Sort</option>
                    <option value="AtoZ">Name (A - Z)</option>
                    <option value="ZtoA">Name (Z - A)</option>
                    <option value="ascendingId">Id (Ascending)</option>
                    <option value="descendingId">Id (Descending)</option>
                  </select>
                </div>
            </div>
          </div>

          <div className="users">
            <table>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Email</th>
                <th>Password</th>
                <th>Role</th>
                <th></th>
                <th></th>
              </tr>
              {searchedUsers.length > 0 &&
              searchedUsers.map((user: User) => {
                if (user.role !== 'admin') {
                  const { id, firstName, lastName, email, password, role } = user;
                  return (
                    <tr key={id}>
                      <td className="user-role">{id}</td>
                      <td>{firstName} {lastName}</td>
                      <td>{email}</td>
                      <td>{password}</td>
                      <td className="user-role">{role}</td>
                      <td className="block-user" onClick={()=>{handleBan(user.id)}}>
                        {user.ban ? <FontAwesomeIcon icon={faBan} size="lg" style={{color: "#860404"}} /> : <FontAwesomeIcon icon={faBan} size="lg"  />}
                      </td>
                      <td className="delete-user"><FontAwesomeIcon icon={faTrashCan} size="lg" onClick={()=>{handleDelete(user.id)}} /></td>
                    </tr>
                  );
                }
              })
              }
            </table>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Users;