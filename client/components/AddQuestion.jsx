import Modal from 'react-modal';
import {useState} from 'react';
import axios from 'axios';

const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)',
      display               : 'flex',
      flexDirection         : 'column',
      width:'60%',
      justifyContent: 'center',
      alignItems: 'center'
    }
  };

  Modal.setAppElement('#questions');


const AddQuestion = ({productId}) => {
  var subtitle;
  const [formData, setFormData] = useState({body: "", name:"", email:""})
//   formData.product_id = productId;

  

  const handleChange = (e) => {
    // e.preventDefault()
    const value = e.target.value;
    setFormData({...formData, [e.target.name]: value })
  }
  const [modalIsOpen,setIsOpen] = useState(false);

function submitQuestion() {
    axios.post('http://localhost:3002/questions', formData).then(res => {
        console.log('submitted');
    }).catch(err => console.log(err))
    console.log(formData);
}

  function openModal() {
    setIsOpen(true);
  };

  function afterOpenModal() {
    subtitle.style.color = 'black';
  };

  function closeModal(){
    setIsOpen(false);
  };
console.log(formData);
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
 
          <h2  ref={_subtitle => (subtitle = _subtitle)}>Ask Your Question*</h2>
          <div></div>
          <form>
              <label htmlFor="body">Question*</label>
            <textarea value={formData.body } onChange={handleChange} required className="modal" name="body"  cols="90" rows="10"></textarea>
            <label className="modal" htmlFor="name">Name:</label>
            <input type="text" required name="name" onChange={handleChange} value={formData.name} className="modal" required />
            <label className="modal" htmlFor="email">Email:</label>
            <input type="text" required name="email" onChange={handleChange} value={formData.email} className="modal" required />
            
          </form>
          <div style={{display:'flex', flexDirection:'row'}}>
          <button   onClick={closeModal}>close</button>
          <button onClick={()=>{submitQuestion()}} type='submit'>Submit</button>
          </div>
        </Modal>
        </div>
    )
}

export default AddQuestion
