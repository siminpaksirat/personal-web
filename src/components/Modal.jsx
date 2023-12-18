import React from 'react';
import './Modal.css';
import { useEffect} from 'react';

const Modal = ({ open, children , onClose})=> {



    if(!open) return null;

    const collectChildren = () => {
        return React.Children.map(children, (child, index) => {
          // You can modify or wrap each child as needed
          return <div key={index} className={`child${index}`}>{child}</div>;
        });
      };




    return(
<>
            <div className='backdrop' onClick={onClose}></div>
        <div className='bigmodal'>
            <button className='close-button' onClick={onClose}>X</button>
            {collectChildren()}
        </div>
        </>

    )


}


export default Modal
