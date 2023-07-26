import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import ButtonFrom from './button-form'
import MoreIcon from './svg_icons/more_icon'
import ArrowIcon from './svg_icons/arrow_icon'
import Tags from './tags'

const WideCard = ({ isCourtCard, facility, court, itemKey, openModal, setClickedId, setClickedIndex, handleDeleteFacilityConfirmation, handleDeleteCourtConfirmation }) => {

    const [isVisible, setIsVisible] = useState(false);
    //console.log(facility);
    console.log(court);

    const popupRef = useRef();

    useEffect(() => {
        function handler(event) {
            if(!popupRef.current?.contains(event.target)) {
                setIsVisible(false)
            }
        }
        window.addEventListener('click', handler)
        return () => window.removeEventListener('click', handler)
    }, [])

    const hrefLink = !isCourtCard ? "/facility/[facilityId]" : '';
    const asLink = !isCourtCard ? `/facility/${facility.id}` : '';

    return (
        <div ref={popupRef} style={{cursor: 'none'}}
        >
            <div key={itemKey} className='d-flex wide_card bg-white mb-3' style={{ maxHeight: 140, height: 135, boxShadow: '6px 6px 20px rgba(216, 28, 103, 0.09)', cursor: 'pointer' }}>
                <div className='col-md-1 p-0'>
                    <img src={(facility?.logo ? facility.logo : "/assets/avatar-comp.png") || (court?.images.length > 0 ? court.images[0] : "/assets/avatar-comp.png")}
                        //src='https://images.pexels.com/photos/2277981/pexels-photo-2277981.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500' 
                        style={{ width: '150%', height: '100%', objectFit: 'cover', borderTopLeftRadius: 16, borderBottomLeftRadius: 16, aspectRatio: '1:1' }}
                    />
                </div>
                <div className='col-md-11'>
                    {/* Card Title and Location Section */}
                    <div className='d-flex justify-content-between'>
                        <Link href={hrefLink} as={asLink} >
                            <div className='d-block w-50 pt-lg-4 pt-md-4 px-lg-4 px-md-2 mx-5 align-items-center' onClick={() => {isCourtCard && openModal(); isCourtCard && setClickedId(court.id); isCourtCard && setClickedIndex(itemKey)}}>
                                <p className='h6 text-left' style={{ fontSize: 16, fontWeight: 700, color: '#2F4858' }}> {isCourtCard ? court?.name : facility?.name} </p>
                                <p
                                    className='h5 text-left'
                                    style={{ color: 'rgba(36, 51, 88, 0.78)', fontSize: 14, fontWeight: 500 }}
                                > {isCourtCard ? (court?.type === 'in' ? 'Indoor' : 'Outdoor') : `Courts(3)`} | {
                                  ((isCourtCard && court?.activities?.length!==0 && court?.activities!==null) ? 
                                   (court?.activities.map(i => (i))) : 'Any Activity'
                                   &&
                                   (!isCourtCard && facility?.address)
                                  )} 
                                </p>
                                <div className='pt-3 px-3'>
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
                            className="rounded-pill px-3 p-2 my-lg-0 my-md-0 my-sm-0 my-0 
                                        text-center justify-content-center" 
                            label="Public"
                            btnStyle={{
                                background: 'rgba(255, 124, 83, 0.1)', 
                                alignSelf: 'center', 
                                fontSize: 12,
                                fontWeight: 600,
                                //margin: 'auto', 
                                color: '#EE2E2A'
                            }}
                        />
                        <ButtonFrom 
                            isDisabled={true} 
                            notForSubmit={true} 
                            className="rounded-pill px-3 p-2 my-lg-0 my-md-0 my-sm-0 my-0 
                                        text-center justify-content-center ml-3" 
                            label="Parking"
                            btnStyle={{
                                background: 'rgba(255, 124, 83, 0.1)', 
                                alignSelf: 'center', 
                                fontSize: 12,
                                fontWeight: 600,
                                //margin: 'auto', 
                                color: '#EE2E2A'
                            }}
                        />
                        <ButtonFrom 
                            isDisabled={true} 
                            notForSubmit={true} 
                            className="rounded-pill px-3 p-2 my-lg-0 my-md-0 my-sm-0 my-0 
                                        text-center justify-content-center ml-3" 
                            label="Cool Weather"
                            btnStyle={{
                                background: 'rgba(91, 137, 255, 0.1)', 
                                alignSelf: 'center',
                                fontSize: 12,
                                fontWeight: 600, 
                                //margin: 'auto', 
                                color: '#98B5FF'
                            }}
                        /> */}
                                </div>
                            </div>
                        </Link>
                        <div className='w-25 float-right justify-content-center view_court_section'
                             style={{ position: 'relative', left: 108 }}
                             onClick={() => setIsVisible(!isVisible)}
                        >

                            {/* dropdown */}
                            <div className="dropdown round-border rounded-lg bg-babyblue mr-4">

                                <div>
                                    <MoreIcon isInWideCard={true} />
                                </div>

                                <div className='dropdown__container' style={{ display: isVisible === true ? 'block' : 'none' }}>
                                    {
                                        isCourtCard ? 
                                        <div className='dropdown__item' onClick={openModal}>
                                            <div onClick={()=> isCourtCard && setClickedIndex(itemKey)}><p>Edit</p></div>
                                        </div>
                                        :
                                        <Link href={hrefLink} as={asLink}>
                                            <div className='dropdown__item'>
                                                <p>Edit</p>
                                            </div>
                                        </Link>
                                    }
                                    
                                    <div className='dropdown__item' onClick={() => !isCourtCard ? handleDeleteFacilityConfirmation(facility.id) : handleDeleteCourtConfirmation(court?.id)}>
                                        <p>Delete</p>
                                    </div>
                                </div>

                            </div>
                            {isCourtCard === false || isCourtCard === undefined ?
                                (<Link href='/facility/[facilityId]/courts' as={`/facility/${facility.id}/courts`}>
                                    <div
                                        type={"button"}
                                        id="view_court_btn"
                                        className='border-0 d-flex pl-4 mt-5 pr-1 ml-n2 py-lg-3 py-md-3 py-sm-2 py-2 
                                align-items-center viewCourtBtn'
                                        style={{ background: 'rgba(255, 124, 83, 0.1)', color: '#EE2E2A', borderRadius: 16, width: 140 }}
                                    >
                                        <ButtonFrom
                                            isDisabled={true}
                                            notForSubmit={true}
                                            id={facility?.id}
                                            label="View Courts"
                                            btnStyle={{
                                                alignSelf: 'start',
                                                fontSize: 14,
                                                fontWeight: 600,
                                                position: 'relative',
                                                left: -5,
                                                //margin: 'auto', 
                                                color: '#EE2E2A'
                                            }}
                                            className="linkCourtBtn"
                                        />
                                        <ArrowIcon />
                                    </div>
                                </Link>)
                                :
                                null
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WideCard