import React from 'react'
import Input from './input'
import Select from './select'
import ModalCloseBtn from './svg_icons/close_modal_btn'
import ButtonFrom from './button-form'

const Separator = ({flex, top}) => (
    <div
      style={{
        //width: width,
        flex: flex, 
        height: 2, 
        //left: 934, 
        //top: 369, 
        marginTop: top,
        opacity: 0.6, 
        background: 'rgba(152, 181, 255, 0.3)'
      }}
    />
)

const addCourtInputStyles = {
    background: '#F3F7FF', 
    border: '1px solid rgba(152, 181, 255, 0.37)', 
    padding: 16, 
    borderRadius: 8,
    width: '100%'
}

const AddCourt = ({exitModal}) => {
  return (
    <div className='add_court_container p-4'>
        <div className='d-flex w-100 justify-content-between'>
            <p className='secondary h3' style={{fontWeight: 600}}> Add Court </p>
            <ModalCloseBtn onClick={exitModal}/>
            {/* <p className='h4 secondary' style={{cursor: 'pointer'}} onClick={exitModal}> X </p>   */}
        </div>
        <Separator flex={1} top={12}/>
        <div className='row pt-5 justify-content-between'>
            <div className='col-md-6'>
                <p className='input_title secondary-light'> Name </p>
                <Input addCourtInput={addCourtInputStyles}/>
            </div>
            <div className='col-md-6'>
                <p className='input_title secondary-light'> Court Type </p>
                <Select top={8} isAddCourt className='addCourt_select'/>
            </div>
        </div>
        <div className='row pt-2 justify-content-between'>
            <div className='col-md-6'>
                <p className='input_title secondary-light'> Sport </p>
                <Input addCourtInput={addCourtInputStyles}/>
            </div>
            <div className='col-md-6'>
                <p className='input_title secondary-light'> Features </p>
                <Select optionList={[
                    {value: "basketball", label: "Basketball"}, 
                    {value: "football", label: "Football"},
                    {value: "squash", label: "Squash"}, 
                    {value: "cricket", label: "Cricket"}, 
                    {value: "hockey", label: "Hockey"},
                  ]}
                 top={8} isAddCourt className='addCourt_select' isSportSelector={true} placeholder="Choose a sport"/>
            </div>
        </div>
        <div className='row pt-2 justify-content-between'>
            <div className='col-md-6'>
                <p className='input_title secondary-light'> Price </p>
                <Input top={8} addCourtInput={addCourtInputStyles}/>
                <div className='price_units d-flex align-items-center float-right' style={{position: 'relative', bottom: 58, right: 24}}>
                    <div style={{height: 32, width: 1, background: 'rgba(36, 51, 88, 0.12)'}}/>
                    <p style={{color: 'rgba(36, 51, 88, 0.4)', fontSize: 16, fontWeight: 500, paddingLeft: 12}}> / hr </p>
                </div>
            </div>
            <div className='col-md-6 mb-lg-0 mb-md-n4 mb-sm-n4 mt-sm-n4 mt-md-0 mt-lg-0 mt-n4'>
                <p className='input_title secondary-light'> Add Extras </p>
                <Select top={8} isAddCourt className='addCourt_select'/>
            </div>
        </div>
        {/* Add Court Submit Buttons Section */}
        <div className='d-lg-flex d-md-flex d-sm-block d-block float-lg-right float-md-right float-sm-none float-none
                        py-lg-0 py-md-0 py-sm-3 py-4'
        >
            <button 
                type={"button"} 
                id="view_court_btn01"
                className='my-lg-5 my-md-5 my-sm-2 my-3 align-items-center justify-content-center 
                           bg-white'
                style={{
                    background: 'rgba(255, 124, 83, 0.1)',  
                    border: '2px solid #D81C67', 
                    borderRadius: 16, 
                    //padding: '10px 30px',
                    //width: 140
                }}
            >
                <ButtonFrom
                    isDisabled={false}
                    className='align-items-center linkCourtBtn'
                    btnStyle={{
                        color: '#D81C67', 
                        fontSize: 18, 
                        fontWeight: 600, 
                       
                        // border: '2px solid #D81C67', 
                        // borderRadius: 16
                    }}
                    label="Cancel"
                    notForSubmit={false}
                    doSubmit={exitModal}
                />
            </button>
            
            <button 
                type={"button"} 
                id="view_court_btn02"
                className='d-flex border-0 ml-lg-3 ml-md-3 ml-sm-0 ml-0 my-lg-5 my-md-5 my-sm-2 my-3
                           align-items-center justify-content-center'
                style={{
                    background: '#EE2E2A',  
                    //border: '2px solid #D81C67', 
                    borderRadius: 16, 
                    //padding: '10px 60px',
                    //width: 140
                }}
            >
                <ButtonFrom
                    isDisabled={false}
                    className='align-items-center'
                    btnStyle={{
                        color: '#fff', 
                        fontSize: 18, 
                        fontWeight: 600, 
                        //border: '2px solid #D81C67', 
                        borderRadius: 16,
                        
                    }}
                    label="Create"
                    btnTxtStyle={{color: '#fff'}}
                />
            </button>
        </div>
    </div>
  )
}

export default AddCourt