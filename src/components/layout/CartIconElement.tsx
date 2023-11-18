import { FaShoppingCart } from 'react-icons/fa';

const CartIconElement = ({ value }: { value: number }) => {
  return (
    <div className='cart-icon-div'>
      <FaShoppingCart className='cart-icon' />
      <span className='cart-icon-span'>{value}</span>
    </div>
  )
}

export default CartIconElement;