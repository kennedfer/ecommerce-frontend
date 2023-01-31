import './styles/ToggleButton.css'

const ToggleButton = (props) =>{

    const onClick = (evt) =>{
        const type = evt.target.id;
        const MODE = type==='login'? true : false;
        props.onClick(MODE);
    }

    return(
        <div className="toggle-container">
            <button className={props.login ? "toggle-active":''} id='login' onClick={onClick}>LOGIN</button>
            <button className={!props.login ? "toggle-active":''} id='register' onClick={onClick}>REGISTRAR</button>
        </div>
    );
}

export default ToggleButton;