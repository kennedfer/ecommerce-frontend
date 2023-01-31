import './styles/Toast.css'

export const toast = (msg) =>{
    const toastElement = document.getElementById('toast');
    
    if(toastElement!==null){
        document.getElementById('toast-message').innerHTML = msg;
        const toastProgressClasslist = document.getElementById('toast-progress').classList;
        toastProgressClasslist.add('toast-progress-anim');
        
        toastElement.classList.add('toast-show');
        setTimeout(()=>{
            toastProgressClasslist.remove('toast-progress-anim');
            toastElement.classList.remove('toast-show');
        },2600);
    }
} 
const Toast = (props) =>{

    return (
        <div id="toast" className='toast-wrapper'>
            <div className='toast-container'>
                <div className='toast'>
                    <div className='toast-message'>
                        <div id="toast-message">aaaaaaaaaaaaaaaaaasasaa</div>
                    </div>
                    
                    <div id="toast-progress" className='toast-progress'></div>
                </div>

            </div>
        </div>
    );
}

export default Toast;