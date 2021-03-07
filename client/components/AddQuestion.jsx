import Modal from 'react-modal';
import {useState} from 'react';

const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
  };

  Modal.setAppElement('#questions');


const AddQuestion = () => {
  var subtitle;

  const [modalIsOpen,setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  };

  function afterOpenModal() {
    subtitle.style.color = '#f00';
  };

  function closeModal(){
    setIsOpen(false);
  };

    return (
        <div>
             {/* <button >Open Modal</button>  */}
             <div  className="button"><a onClick={openModal} className="btn btn-dark btn-big">add a question </a></div>
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
 
          <h2 ref={_subtitle => (subtitle = _subtitle)}>Hello</h2>
          <button onClick={closeModal}>close</button>
          <div>I am a modal</div>
          <form>
            <input />
            <button>tab navigation</button>
            <button>stays</button>
            <button>inside</button>
            <button>the modal</button>
          </form>
        </Modal>
        </div>
    )
}

export default AddQuestion
