import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRectangleList } from "@fortawesome/free-regular-svg-icons";
import { faShapes, faTableCellsLarge, faUsers } from "@fortawesome/free-solid-svg-icons";

const AdminFunctions = () => {

  return (
    <div>
      <div className="admin-functions">
        <ul>
          <li>
            <Link to="/dashboard/admin/Categories" className="admin-function-link">
              <FontAwesomeIcon icon={faTableCellsLarge} size="lg" className="admin-function-icon"/>
              Categories
            </Link>
          </li>
              
          <li>
            <Link to="/dashboard/admin/products" className="admin-function-link">
              <FontAwesomeIcon icon={faShapes} size="lg" className="admin-function-icon"/>
              Products
            </Link>
          </li>

          <li>
            <Link to="/dashboard/admin/orders" className="admin-function-link">
              <FontAwesomeIcon icon={faRectangleList} size="lg" className="admin-function-icon"/>
              Orders
            </Link>
          </li>

          <li>
            <Link to="/dashboard/admin/users" className="admin-function-link">
              <FontAwesomeIcon icon={faUsers} size="lg" className="admin-function-icon"/>
              Users
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default AdminFunctions;