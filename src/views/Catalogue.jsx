import { useState, useEffect } from 'react'
import './styles/Catalogue.css'
import Product from './components/Product'
import axios from 'axios';
import { API_URL } from './variables';
import { useNavigate } from 'react-router-dom';
import { toast } from './components/Toast';

const Catalogue = (props) =>{
  const [state, setState] = useState({
    products:[]
  });

  const navigateTo = useNavigate();

  const addToCart = (product) =>{
    axios.post(API_URL+'/user/'+props.userId+"/cart/add", product).then(
      resp =>{
        if(resp.status == 200)
          toast('Item adicionado ao carrinho');
      }
    );
  }

  const goToProfile = () =>{
    navigateTo('/profile');
  }

  //* ON build
  useEffect(()=>{
    axios.get(API_URL+'/products').then(response=>{

      setState({
        products:response.data,
    });

    });

  },[]);

  return (
    <>
      <div 
      className='top-container'>
        <div 
          className='title'>Roupas
        </div>

        <i 
          onClick={goToProfile} 
          className="user-button fa-solid fa-circle-user">
        </i>

      </div>
      <div className='products-container'>
        {state.products !== undefined ?
        state.products.map(product => 
        <Product 
          id={product._id}
          key={product._id} 
          name={product.name}
          description={product.description}
          price={product.price}
          addToCart={addToCart}
          logged={props.logged}
        />):
        <>Sem produtos por enquanto</>}

      </div>
    </>
  )
}

export default Catalogue
