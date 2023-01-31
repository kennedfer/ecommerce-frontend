import './styles/CartProduct.css'
import './styles/CssUtils.css'

const CartProduct = (props) => {
    const onClickRemove = () => {
        props.onRemove(props.index);
    }

    const onClickCheck = (evt) =>{
        const indexs = props.checkoutProductsList;

        if(evt.target.checked){
            props.setTotal(props.checkout+props.total);
            indexs.push(props.id);
            props.setcheckoutProductsList(indexs);
            return;
        }

        props.setTotal(props.checkout-props.total);
        const indexOfRemove = indexs.indexOf(props.id);
        indexs.splice(indexOfRemove,1);
        props.setcheckoutProductsList(indexs);
    }

    return(
        <div id={props.index} className='cart-product-container'>
            <input 
                onClick={onClickCheck} 
                className='cart-product-checkbox' 
                type="checkbox" 
            />

            <div className='cart-product-infos'>
                <span className='cart-product-name' >{props.name}</span>
                <span className='cart-product-price'>${props.price},00 - {props.quantity}x</span>
                <span className='cart-product-total'>Total: ${props.total},00</span>
            </div>

            <button onClick={onClickRemove} className=' clickable fa-solid fa-trash cart-product-remove-button'></button>
        </div>
    );
}

export default CartProduct;