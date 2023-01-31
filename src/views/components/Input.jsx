import './styles/Input.css'

const Input = (props) =>{
    const handleInput = (evt) =>{
        props.handler(props.property,evt.target.value)
    }

    return(
        <div className='input-container'>
            <span>{props.label}</span>
            <input onChange={handleInput} type={props.type} placeholder={props.ph} />
        </div>
    );
}

export default Input;