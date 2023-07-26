import React, { useState, useRef, useEffect } from 'react'
import ButtonFrom from './button-form'
import MoreIcon from './svg_icons/more_icon'
import ArrowIcon from './svg_icons/arrow_icon'
import Tags from './tags'
import Link from 'next/link'

const MobileWideCard = ({ isCourtCard, facility, court, itemKey, openModal, setClickedId, setClickedIndex, handleDeleteFacilityConfirmation, handleDeleteCourtConfirmation }) => {

    const [isVisible, setIsVisible] = useState(false);

    const hrefLink = !isCourtCard ? "/facility/[facilityId]" : '#';
    const asLink = !isCourtCard ? `/facility/${facility.id}` : '#';

    const popupRef = useRef();

    // useEffect(() => {
    //     function handler(event) {
    //         if (!popupRef.current?.contains(event.target)) {
    //             setIsVisible(false)
    //         }
    //     }
    //     window.addEventListener('click', handler)
    //     return () => window.removeEventListener('click', handler)
    // }, [])

    return (

        <div className='mobile_wideCard_container bg-white mb-3'
            onClick={() => {
                isCourtCard ? openModal() : undefined;
                isCourtCard ? console.log("Card Clicked") : undefined;
                isCourtCard ? setClickedId(court.id) : undefined;
                isCourtCard && setClickedIndex(itemKey);
            }}
        >
            <Link key={itemKey} href={hrefLink} as={asLink}>
                <img src={(facility?.logo ? facility.logo : "/assets/avatar-comp.png") || (court?.images.length > 0 ? court.images[0] : "/assets/avatar-comp.png")}
                    //src='https://images.pexels.com/photos/2277981/pexels-photo-2277981.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500' 
                    style={{
                        width: '100%',
                        height: 240,
                        objectFit: 'cover',
                        borderTopLeftRadius: 16,
                        borderTopRightRadius: 16
                    }}
                />
            </Link>
            <div className='card_detail_section'>
                <div className='d-flex py-3 px-2 mx-1 mt-2 justify-content-between'>
                    <div className='features_container'>
                        {
                            !isCourtCard ? <>
                                <Tags
                                    isDisabled={true}
                                    notForSubmit={true}
                                    className="rounded-pill px-3 p-2 my-lg-0 my-md-0 my-sm-0 my-0 
                                    text-center justify-content-center ml-0"
                                    label={facility?.publicFacility ? 'Public' : 'Private'}
                                    btnStyle={{
                                        background: 'rgba(91, 137, 255, 0.1)',
                                        alignSelf: 'center',
                                        fontSize: 12,
                                        fontWeight: 600,
                                        //margin: 'auto', 
                                        color: '#98B5FF'
                                    }}
                                />

                                <Tags
                                    isDisabled={true}
                                    notForSubmit={true}
                                    className="rounded-pill px-3 p-2 my-lg-0 my-md-0 my-sm-0 my-0 
                                    text-center justify-content-center ml-3"
                                    label={facility?.publicFacility ? 'No Booking' : 'Booking Required'}
                                    btnStyle={{
                                        background: 'rgba(255, 124, 83, 0.1)',
                                        alignSelf: 'center',
                                        fontSize: 12,
                                        fontWeight: 600,
                                        //margin: 'auto', 
                                        color: '#EE2E2A'
                                    }}
                                />
                            </>
                                :
                                court?.features.map(i => (
                                    <Tags
                                        isDisabled={true}
                                        notForSubmit={true}
                                        className="rounded-pill px-3 p-2 my-lg-0 my-md-0 my-sm-0 my-0 
                                        text-center justify-content-center mr-3"
                                        label={i}
                                        btnStyle={{
                                            background: 'rgba(255, 124, 83, 0.1)',
                                            alignSelf: 'center',
                                            fontSize: 12,
                                            fontWeight: 600,
                                            //margin: 'auto', 
                                            color: '#EE2E2A'
                                        }}
                                    />
                                ))
                        }
                        {/* <Tags 
                        isDisabled={true} 
                        notForSubmit={true} 
                        className="rounded-pill px-3 p-2 my-lg-0 my-md-0 my-sm-0 my-0 
                                    text-center justify-content-center ml-0" 
                        label={facility?.publicFacility ? 'Public' : 'Private'}
                        btnStyle={{
                            background: 'rgba(91, 137, 255, 0.1)', 
                            alignSelf: 'center',
                            fontSize: 12,
                            fontWeight: 600, 
                            //margin: 'auto', 
                            color: '#98B5FF'
                        }}
                    />

                    <Tags 
                        isDisabled={true} 
                        notForSubmit={true} 
                        className="rounded-pill px-3 p-2 my-lg-0 my-md-0 my-sm-0 my-0 
                                    text-center justify-content-center ml-3" 
                                    label={facility?.publicFacility ? 'No Booking' : 'Booking Required'}
                        btnStyle={{
                            background: 'rgba(255, 124, 83, 0.1)', 
                            alignSelf: 'center', 
                            fontSize: 12,
                            fontWeight: 600,
                            //margin: 'auto', 
                            color: '#EE2E2A'
                        }}
                    /> */}
                        {/* <ButtonFrom 
                        isDisabled={true} 
                        notForSubmit={true} 
                        className="rounded-pill px-3 p-2 
                                    text-center justify-content-center" 
                        label="Public"
                        btnStyle={{
                            background: 'rgba(255, 124, 83, 0.1)', 
                            alignSelf: 'center', 
                            fontSize: 12,
                            fontWeight: 600, 
                            color: '#EE2E2A'
                        }}
                    />
                    <ButtonFrom 
                        isDisabled={true} 
                        notForSubmit={true} 
                        className="rounded-pill px-3 p-2
                                    text-center justify-content-center ml-2" 
                        label="Parking"
                        btnStyle={{
                            background: 'rgba(255, 124, 83, 0.1)', 
                            alignSelf: 'center', 
                            fontSize: 12,
                            fontWeight: 600,
                            color: '#EE2E2A'
                        }}
                    />
                    <ButtonFrom 
                        isDisabled={true} 
                        notForSubmit={true} 
                        className="rounded-pill px-3 p-2
                                    text-center justify-content-center ml-2" 
                        label="Cool Weather"
                        btnStyle={{
                            background: 'rgba(91, 137, 255, 0.1)', 
                            alignSelf: 'center',
                            fontSize: 12,
                            fontWeight: 600, 
                            color: '#98B5FF'
                        }}
                    /> */}
                    </div>
                    <div className='float-right mr-1 p-3' style={{zIndex: 999}} onClick={() => setIsVisible(!isVisible)}>
                        <MoreIcon />
                    </div>
                    <div className='dropdown__container' style={{ display: isVisible === true ? 'block' : 'none' }}>
                        <div className='dropdown__item' 
                        onClick={() => { isCourtCard && openModal() }}
                        >
                            <div onClick={()=> isCourtCard && setClickedIndex(itemKey)}><p>Edit</p></div>
                        </div>
                        <div className='dropdown__item' onClick={() => !isCourtCard ? handleDeleteFacilityConfirmation(facility.id) : handleDeleteCourtConfirmation(court?.id)}>
                            <p>Delete</p>
                        </div>
                    </div>
                </div>
                <div className={`card_title_section px-3 py-3 ${isCourtCard === true && 'pb-4'}`}>
                    <p className='h6'
                        style={{ fontSize: 16, fontWeight: 700, color: '#2F4858' }}
                    > {isCourtCard ? court?.name : facility?.name} </p>
                    <p className='h5'
                        style={{ color: 'rgba(36, 51, 88, 0.78)', fontSize: 14, fontWeight: 500 }}
                    > {isCourtCard ? (court?.type === 'in' ? 'Indoor' : 'Outdoor') : `Courts(3)`} | {
                        ((isCourtCard && court?.activities?.length!==0 && court?.activities!==null) ? 
                         (court?.activities.map(i => (i))) : 'Any Activity'
                         &&
                         (!isCourtCard && facility?.address)
                        )}
                    </p>

                    {isCourtCard === false || isCourtCard === undefined ?
                        (<button
                            type={"button"}
                            className='border-0 d-flex w-100 mt-4 mb-2 py-3 justify-content-center align-items-center viewCourtBtn'
                            style={{ background: 'rgba(255, 124, 83, 0.1)', color: '#EE2E2A', borderRadius: 16, width: 140 }}
                        >
                            <ButtonFrom
                                notForSubmit={true}
                                id={facility?.id}
                                label="View Courts"
                                btnStyle={{
                                    alignSelf: 'start',
                                    fontSize: 14,
                                    fontWeight: 600,
                                    color: '#EE2E2A'
                                }}
                                className="linkCourtBtn"
                            />
                            <ArrowIcon isMobileCard />
                        </button>)
                        : null
                    }
                </div>
            </div>
        </div >
    )
}

export default MobileWideCard