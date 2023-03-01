import ReactDOM from 'react-dom';
import  Form  from '../form/Form'
import './modal.css';

const Backdrop = props => {
  return <div className='facebook__signup-backdrop' />;
};

const portalElement = document.getElementById('overlays');

const Modal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(<Backdrop />, portalElement)}
      {ReactDOM.createPortal(
        <Form onSubmit={props.onSubmit} className='facebook__signup-overlayform'>{props.children}</Form>,
        portalElement
      )}
    </>
  );
};

export default Modal;