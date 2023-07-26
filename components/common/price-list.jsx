import React, {useState} from 'react'
//import { Checkbox } from 'antd'

// const listExtras = [
//     {
//         id: '1',
//         value: 'Refreshments',
//         price: '$10'
//     },
//     {
//         id: '2',
//         value: 'Pets Allowed',
//         price: '$5'
//     },
//     {
//         id: '3',
//         value: 'Basket Ball Provided',
//         price: '$8'
//     },
// ]

const PriceList = ({ listData, noCheckBox }) => {

  const[checked, setChecked] = useState('');

  const handleCheckBox = (e, idx) => {
    console.log(`checked = ${e.target.checked}`);
    setChecked(idx);
  }

  return (
    <div className='list_container'>
            {
                listData.map((item)=> (
                    <div key={item.id} className='list_items row p-lg-2 pl-md-4 pl-sm-3 pl-2 py-md-2 py-sm-2 py-2 align-items-center'>
                        
                        {!noCheckBox && <div className='col-lg-1 col-md-1 col-sm-1 col-1'>
                            {/* <Checkbox onChange={(e)=> handleCheckBox(e, item.id)} style={{background: '#D81C67', color: '#D81C67'}}/> */}
                            <input 
                                name="checkbox" 
                                type={"button"}
                                className='rounded'
                                style={{
                                    background: checked===item.id ? '#D81C67' : 'transparent', 
                                    color: checked===item.id && '#D81C67', 
                                    width: 16, 
                                    height: 16,
                                    cursor: 'pointer',
                                    border: checked===item.id ? 'none' : '1px solid rgba(36, 51, 88, 0.78)' ,
                                }} 
                                onClick={(e)=> {checked!==item.id ? handleCheckBox(e, item.id) : setChecked('')}}
                            />
                        </div>}
                        <div className={noCheckBox ? 'col-lg-8 col-md-9 col-sm-6 col-xs-6' : 'col-lg-8 col-md-8 col-sm-8 col-8'}>
                            <p 
                                style={{
                                    color: checked===item.id ? '#D81C67' : '#1A1D24', 
                                    fontSize: 16
                                }}> 
                            {item.value} </p>
                        </div>
                        <div 
                            className={
                                noCheckBox ? 'col-lg-3 px-2 col-md-2 col-sm-6 col-xs-6 ml-lg-4 ml-0 ml-sm-0' 
                                : 'col-lg-2 px-2 col-md-2 col-sm-2 col-2 ml-lg-3 ml-0 ml-sm-0'
                            }
                        >
                            <p 
                                className='text-right'
                                style={{
                                    color: checked===item.id ? '#D81C67' : '#1A1D24', 
                                    fontSize: 16,
                                }}> 
                            {item.price} </p>
                        </div>
                    </div>
                ))
            }
    </div>
  )
}

export default PriceList