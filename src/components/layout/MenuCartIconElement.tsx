import { FaShoppingCart } from 'react-icons/fa';

const MenuCartIconElement = ({ value }: { value: number }) => {
  return (
    <div className='menu-cart-icon-div'>
      <FaShoppingCart className='menu-cart-icon' />
      <span className='menu-cart-icon-span'>{value}</span>
    </div>
  )
}

export default MenuCartIconElement;