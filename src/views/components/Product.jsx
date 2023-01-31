import { useNavigate } from 'react-router-dom'
import './styles/Product.css'
import './styles/CssUtils.css'

const Product = (props)=>{
    const navigateTo = useNavigate();

    const onAddToCart = () =>{
        if(!props.logged) return navigateTo('/profile');

        const product = {
            id:props.id,
            name:props.name,
            quantity:1,
            price:props.price
        }

        props.addToCart(product);
    }

    return(
        <div className="product-container">
            <div className='product-bottom-info'>
                <span className='product-name'>{props.name}</span>
                <span className='product-description'>{props.description}</span>
                <span className='product-price'>${props.price},00</span>

                <i onClick={onAddToCart} className='clickable fa-solid fa-cart-plus product-button-add'></i>                
            </div>

            <div className='product-background'>
                <i className=' fa-solid fa-bag-shopping'></i>
            </div>
        </div>
    );
}

export default Product;