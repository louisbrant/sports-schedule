import React, { useState } from 'react'
import Modal from 'react-modal'
//import {Modal as AntModal} from 'antd'
import ModalButton from './svg_icons/modal_button';
import DetailForm from './detail-form';
import CloseIcon from './svg_icons/close_icon'

const DetailModal = ({availableSports, courtData}) => {

  const customStyles = {
    content: {
      //width: window.innerWidth > 640 ? '80%' : '60%',
      height: '70%',
      width: '95%',
      padding: 8,
      top: '10%',
      left: 10,
      overflowX: 'hidden',
      //position: 'relative',
      //top: window.innerWidth > 640 ? '20%' : '10%',
      //left: window.innerWidth > 640 ? '10%' : '8%',
      //right: 'auto',
      //bottom: 'auto',
      //marginRight: '-20%',
      border: 0,
      borderRadius: 12,
      boxShadow: '1px 2px 16px 4px rgba(26,26,26,0.1)',
      background: '#f9fbff',
      
      //transform: 'translate(-50%, -50%)',
    },
  };

  const [modalVisible, setModalVisible] = useState(false);

  const handleModal = () => {
    setModalVisible(!modalVisible);
    console.log("Modal Opened")
  }

  const closeModal = () => {
    setModalVisible(false);
  }

  return (
    <div className='mobile_form_container'>
      <div className='rounded-circle'>
        {/* <Button 
          isDisabled={false} 
          notForSubmit={false} 
          className="py-3 text-white text-center justify-content-center" 
          label="Book Now"
          btnStyle={{
            background: '#EE2E2A', 
          }}
          doSubmit={handleModal}
        /> */}
        {
          !modalVisible &&
          <ModalButton onClick={handleModal} />
          // <CloseIcon onClick={closeModal}/>
        }
      </div>
      {/* <button 
            type={"button"} 
            className='text-block text-center rounded-circle font-weight-bold float-right' 
            style={{background: '#EE2E2A', border: 0, color: '#fff', top: 0}} 
            onClick={closeModal}
          > <p className='h4 p-2 text-white'>X</p> </button> */}
 
        <Modal 
        isOpen={modalVisible} 
        onRequestClose={closeModal} portalClassName='modal_dimension' style={customStyles}>
          {/* <p 
            className='h4 text-white font-weight-bold position-fixed rounded-circle'
            id= 'close_modal_btn'
            style={{right: 34, top: 52, padding: '0.2rem 0.6rem', background: '#EE2E2A'}}
            onClick={closeModal}
          >X</p> */}
          <svg id= 'close_modal_btn' 
               xmlns="http://www.w3.org/2000/svg" 
               width={20} 
               height={20} 
               //viewBox="0 0 20 20" 
               fill="#EE2E2A"
               onClick={closeModal}
          >
            <path fillRule="evenodd" 
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" 
                  clipRule="evenodd" 
            />
          </svg>
          <DetailForm formInModal={true} availableSports={availableSports} courtData={courtData}/>
        </Modal> 
        {/* <AntModal visible={modalVisible} onOk={()=> setModalVisible(false)} onCancel={()=> setModalVisible(false)} footer={null}>
        <p 
            className='h4 text-white font-weight-bold position-fixed rounded-circle'
            id= 'close_modal_btn'
            style={{right: 34, top: 52, padding: '0.2rem 0.6rem', background: '#EE2E2A'}}
            onClick={closeModal}
          >X</p>
          <DetailForm formInModal={true} availableSports={availableSports} courtData={courtData}/>
        </AntModal> */}
      
    </div>
  )
}

export default DetailModal