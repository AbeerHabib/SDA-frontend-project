import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";

import { AppDispatch, RootState } from "../../redux/store";
import CartIconElement from "./CartIconElement";
import { logout } from "../../redux/slices/users/userSlice";
import MenuCartIconElement from "./MenuCartIconElement";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser as faUserRegular } from "@fortawesome/free-regular-svg-icons";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const { isLoggedIn, userData } = useSelector((state: RootState) => state.users);
  const { cartItems } = useSelector((state: RootState) => state.cart);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const dispatch: AppDispatch = useDispatch();
    
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]); 

  const handleLogout = () => {
    dispatch(logout());
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="navbar-container">

      <a className="toggle-btn" onClick={toggleMenu}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>                    
      </a>

      <nav>
        <Link to="/">
          <img src="/images/logo.png" className="logo"/>
        </Link>

        <ul>
          <li>
            <Link to="/" className="link">Home</Link>
          </li>
          <li>
            <Link to="/shop" className="link">Shop</Link>
          </li>
          <li>
            <Link to="#" className="link">About Us</Link>
          </li>
          <li>
            <Link to="#" className="link">Contact</Link>
          </li>
        </ul>

        <ul>
          {!isLoggedIn && (
          <>
            <li>
              <Link to="/login" className="link">Log in</Link>
            </li>
            <li>
              <Link to="/signup" className="signup-link">Sign Up</Link>
            </li>
            <li>
              <Link to="/cart" className="">
                <CartIconElement value={cartItems.length > 0 ? cartItems.length : 0}/>
              </Link>
            </li>
          </>
          )}

          {isLoggedIn && userData && userData.role == 'user' && (
          <>
            <li>
              <Link to={`/dashboard/profile`} className="profile-icon">
                <FontAwesomeIcon icon={faUserRegular} size="lg"/>
              </Link>
            </li>
            <li>
              <Link to="/cart" className="">
                <CartIconElement value={cartItems.length > 0 ? cartItems.length : 0}/>
              </Link>
            </li>
          </>
          )}

          {isLoggedIn && userData && userData.role == 'admin' && (
          <>
            <li>
              <Link to={`/dashboard/${userData.role}`} className="profile-icon">
                <FontAwesomeIcon icon={faUserRegular} size="lg"/>
              </Link>
            </li>
            <li>
              <Link to="/" className="logout-link" onClick={handleLogout}>
                <FontAwesomeIcon icon={faArrowRightFromBracket} size="lg" className="logout-icon-for-admin"/>
              </Link>
            </li>
          </>
          )}
        </ul>
      </nav>

      <div className={`navbar-menu ${isMenuOpen ? "open" : ""}`}>
        <ul>
          <li>
             <Link to="/" className="link">Home</Link>
          </li>
          <li>
            <Link to="/shop" className="link">Shop</Link>
          </li>
          <li>
            <Link to="#" className="link">About Us</Link>
          </li>
          <li>
            <Link to="#" className="link">Contact</Link>
          </li>
          {!isLoggedIn && (
          <>
            <li>
              <Link to="/login" className="menu-link">Log in</Link>
            </li>
            <li>
              <Link to="/signup" className="signup-menu-link">Sign Up</Link>
            </li>
            <li>
              <Link to="/cart" className="">
                <MenuCartIconElement value={cartItems.length > 0 ? cartItems.length : 0}/>
              </Link>
            </li>
          </>
          )}

          {isLoggedIn && userData && userData.role == 'user' && (
          <>
            <li>
              <Link to={`/dashboard/profile`} className="profile-icon">
                <FontAwesomeIcon icon={faUserRegular} size="lg"/>
              </Link>
            </li>
            <li>
              <Link to="/cart" className="">
                <MenuCartIconElement value={cartItems.length > 0 ? cartItems.length : 0}/>
              </Link>
            </li>
          </>
          )}

          {isLoggedIn && userData && userData.role == 'admin' && (
          <>
            <li>
              <Link to={`/dashboard/${userData.role}`} className="menu-profile-icon">
                <FontAwesomeIcon icon={faUserRegular} size="lg"/>
              </Link>
            </li>
            <li>
              <Link to="/" className="menu-logout-link" onClick={handleLogout}>
                <FontAwesomeIcon icon={faArrowRightFromBracket} size="lg" className="menu-logout-icon" />
              </Link>
            </li>
          </>
          )}
        </ul>
      </div>
    </div>
  )
}
export default Navbar;