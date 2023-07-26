import React, {useState} from 'react'
import Button from './button'
import RatingsIcon from './svg_icons/ratings'
import TabIcon from './svg_icons/tabs'
import FootballIcon from './svg_icons/football_icon'
import ButtonFrom from './button-form'
import Tags from './tags'
import {Rate} from 'antd';
const tabs = [
    {
        id: '1',
        value: 'Description',
        clicked: true,
        color: '#EE2E2A',
        description: 'This is a description of the facility provided by us.',
        clickedLink: '#details',
    },
    {
        id: '2',
        value: 'Features',
        clicked: false,
        color: '#EE2E2A',
        description: 'These are the various features of the facility provided by us.',
        clickedLink: '#features',
    },
    {
        id: '3',
        value: 'Location',
        clicked: false,
        color: '#EE2E2A',
        description: 'At this location, our amazing facility will be available.',
        clickedLink: '#mapLocation',
    },
    {
        id: '4',
        value: 'Reviews',
        clicked: false,
        color: '#EE2E2A',
        description: 'These are some our reviews by our fantastic customers for the facility provided by us.',
        clickedLink: '#reviews',
    },
]
const features = [
    {
        id: '1',
        value: 'Amenities',
    },
    {
        id: '2',
        value: 'Pets Allowed',
    },
    {
        id: '3',
        value: 'Free Refreshments',
    },
    {
        id: '4',
        value: 'Basketball Provided',
    },
]
const Reviews =()=> {
    const users= [
        {
            id: '1',
            userName: 'User001',
            ratings: 4,
        },
        {
            id: '2',
            userName: 'User002',
            ratings: 5,
        },
        // {
        //     id: '3',
        //     userName: 'User003',
        // },
    ]
    return <div className='col-md-12' id="reviews">
            {
                users.map(user=> (
                    <div key={user.id} className='row justify-content-between align-items-center py-2'>
                        <img className='review_avatar' src='/assets/avatar.png' alt="avatar"/>
                        <div className='d-block'>
                            <p className='secondary' style={{fontSize: 16, fontWeight: 600}}> {user.userName} </p>
                            <Rate disabled defaultValue={user.ratings} style={{color: '#EE2E2A'}}/>
                        </div>
                    </div>
                ))
            }
    </div>
}
const DetailsFeatures = ({facilityName, facilityAddress, facilityFeatures}) => {
  const [showDescriptionFor, setShowDescriptionFor] = useState('1');
  const [clickedTabLink, setClickedTabLink] = useState('');
  return (
    <div className='detail_container'>
        {/* Ratings & Highlights Section */}
        <div className='row px-lg-4 px-md-4 px-sm-4 px-4 pt-5 pb-4 align-items-center'>
            <div className='d-flex align-items-center justify-content-center text-center'>
                <RatingsIcon/>
                <div
                    style={{
                        color: '#D81C67',
                        fontWeight: 'bold',
                        fontSize: 20,
                        display: 'flex',
                        alignSelf: 'center'
                    }}
                > 5 &nbsp;
                    <p
                        style={{
                            color: '#D81C67',
                            opacity: 0.4,
                            fontWeight: 'bold',
                            fontSize: 16,
                            alignSelf: 'center'
                    }}>(255)</p>
                </div>
            </div>
            <Tags
                isDisabled={true}
                notForSubmit={true}
                className="rounded-pill px-3 p-2 my-lg-0 my-md-0 my-sm-0 my-0
                            text-center justify-content-center ml-3"
                            label="New Court"
                btnStyle={{
                    background: 'rgba(255, 124, 83, 0.1)',
                    alignSelf: 'center',
                    fontSize: 12,
                    fontWeight: 600,
                    //margin: 'auto',
                    color: '#EE2E2A'
                }}
            />
            <Tags
                isDisabled={true}
                notForSubmit={true}
                className="rounded-pill px-3 p-2 my-lg-0 my-md-0 my-sm-0 my-0
                            text-center justify-content-center ml-3"
                            label="Top Rated"
                btnStyle={{
                    background: 'rgba(91, 137, 255, 0.1)',
                    alignSelf: 'center',
                    fontSize: 12,
                    fontWeight: 600,
                    //margin: 'auto',
                    color: '#98B5FF'
                }}
            />
            {/* <ButtonFrom
              isDisabled={true}
              notForSubmit={true}
              className="rounded-pill mx-lg-4 mx-md-4 mx-sm-3 mx-2 px-4 py-lg-2 py-sm-3 py-3
                         text-center justify-content-center"
              label="New Court"
              btnStyle={{
                background: 'rgba(255, 124, 83, 0.1)',
                alignSelf: 'center',
                //margin: 'auto',
                color: '#EE2E2A'
              }}
            />
            <ButtonFrom
              isDisabled={true}
              notForSubmit={true}
              className="rounded-pill px-4 py-lg-2 py-sm-3 py-3 my-lg-0 my-md-0 my-sm-2 my-2
                         text-center justify-content-center"
              label="Top Rated"
              btnStyle={{
                background: 'rgba(91, 137, 255, 0.1)',
                alignSelf: 'center',
                //margin: 'auto',
                color: '#98B5FF'
              }}
            /> */}
        </div>
        {/* Facility Title and Location Section */}
        <div className='facility_title_location p-lg-2 p-md-2 p-sm-1 p-2'>
            <p
                className='text-bold secondary h2 font-weight-bold'
                onClick={()=> console.log(showDescriptionFor)}
            > {facilityName} </p>
            <p
                className='mt-n0'
                style={{
                    color: '#000',
                    opacity: 0.6,
                    //marginTop: -10,
                    fontWeight: '500',
                    fontSize: 14
                }}
            > {facilityAddress}  </p>
        </div>
        {/* Facility Detail Tabs */}
        <div className='row px-md-2 px-lg-0 px-sm-3 px-3 pt-5'>
            {/* <div className='col-md-12'> */}
              {
                tabs.map((item)=> (
                    <div key={item.id} style={{cursor: 'pointer'}}
                         onClick={()=> setShowDescriptionFor(item.id)}
                    >
                        <div
                            className='h5 px-lg-4 px-md-3 px-sm-2 px-2'
                            style={{fontWeight: showDescriptionFor===item.id ? '700' : '600'}}
                        >
                            <a  href={item.clickedLink}
                                style={{textDecoration: 'none', color: showDescriptionFor===item.id ? "#EE2E2A" : 'rgba(36, 51, 88, 0.8)'}}
                            >
                                {item.value}
                            </a>
                        </div>
                        {showDescriptionFor===item.id && <TabIcon/>}
                    </div>
                ))
              }
            {/* </div> */}
        </div>
        
        {/* Facility Description */}
        <div
            id="details"
            className='px-2 px-lg-2 px-md-2 px-sm-2 pt-4 pt-sm-1 pt-md-1 pt-lg-0 h5 font-weight-normal text-justify'
            style={{color: 'rgba(36, 51, 88, 0.78)'}}
        >
        {showDescriptionFor !=='4' ? tabs.filter(item=> item.id===showDescriptionFor)[0].description: null}
        {showDescriptionFor !== '4' ?
        <>
        <br/> <br/>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam aliquip ex ea commodo consequat
        </>
        :
        <Reviews/>
        }
        </div>
        {/* Features Section */}
        <div className={showDescriptionFor !== '4' ? 'features_container px-2 py-5' : 'features_container px-2 py-4'} 
             id="features"
        >
            <p className='font-weight-bold fs-6 secondary'> Features </p>
            <div className='row'>
                {/* <div className='col-md-4'> */}
                    {
                        facilityFeatures?.map((item)=> (
                            <div key={item} className='col-md-6 col-sm-6 px-3 py-2 align-items-center'>
                                {/* <div className='col-md-2'> */}
                                    <div className='d-flex align-items-center'>
                                        <FootballIcon/>
                                        <p className='fs-5 mx-2' style={{fontWeight: '500'}}> {item} </p>
                                    </div>
                                {/* </div> */}
                            </div>
                        ))
                    }
                {/* </div> */}
            </div>
        </div>
    </div>
  )
}
export default DetailsFeatures