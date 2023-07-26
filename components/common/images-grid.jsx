import React, { useState } from 'react'
// import photoOne from '../../public/assets/basketball01.png'
// import photoTwo from '../../public/assets/basketball02.png'
// import photoThree from '../../public/assets/basketball03.png'
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

const ImageGrid = ({ facility }) => {

    const [isOpen, setIsOpen] = useState(false)
    const [photoIndex, setPhotoIndex] = useState(0)

    const style = {
        mainImg: {
            width: '100%',
            height: 400,
            borderRadius: 16,
            objectFit: 'cover'
        },
        // sideImg:{
        //     width: '95%',
        //     height: '50%',
        //     borderRadius: 16,
        //     objectFit:'cover'
        // }
    }
    return (
        <div className={facility?.images?.length > 1 ? "image_grid_container" : "image_grid_main"}>
            <div className='d-lg-flex d-md-block d-sm-block d-block'>
                <img
                    src={facility?.images?.length > 0 && facility?.images[0] || 'https://images.pexels.com/photos/2277981/pexels-photo-2277981.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'}
                    style={style.mainImg}
                />
                {facility?.images?.length > 1 &&
                    <div className='side_img_container d-flex flex-lg-column flex-md-row flex-sm-row flex-row 
                            ml-lg-3 ml-md-0 ml-sm-0 ml-0 mt-lg-0 mt-md-3 mt-sm-3 mt-3 mb-lg-0 mb-md-n5 mb-sm-n5 mb-n5'
                    //style={{height: 384, width: '43.6%'}}
                    >
                        {/* { facility?.images?.length <= 2 ?  */}
                        <img
                            src={facility?.images[1]}
                            className='side_first_image'
                            style={{ borderRadius: 16 }}
                        />
                        {/* : */}
                        <img
                            src={facility?.images[2]}
                            className='lastImg side_second_image mt-lg-3 mt-md-0 mt-sm-0 mt-0 ml-lg-0 ml-md-3 ml-sm-3 ml-3'
                            style={{ borderRadius: 16 }}
                        />
                        {/* } */}
                    </div>
                }
                {facility?.images?.length > 3 && <div onClick={() => setIsOpen(true)} className='image_grid_overlay'><p style={{ color: '#FFFFFF', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>+{facility?.images?.length - 2} Images</p></div>}

            </div>
            {/* <div className="col-md-8 col-sm-12 col-12">
            <img 
                src="https://5.imimg.com/data5/GJ/HL/ZW/SELLER-39443605/basketball-court-construction-500x500.jpg"
                style={{width: '100%', height: '100%', overflow: 'hidden', borderRadius: 12}}
            />
        </div>
        <div className={
            //facility?.images === 2 
            "d-flex d-md-block d-lg-block d-sm-flex col-md-4 col-sm-12 col-12 mt-lg-0 mt-md-1 mt-sm-4 mt-3" 
            //: "d-flex d-md-block d-lg-block d-sm-flex col-md-4 col-sm-12 col-12 mt-lg-0 mt-md-1 mt-sm-4 mt-3"
            }
        >
            <div className={'col-md-12 col-sm-12 col-12 pb-lg-5 pb-md-5 pb-sm-0 ml-0 ml-md-1 ml-lg-1 pl-1 pl-lg-0 pl-md-0 pl-sm-2 mr-3'
                //(facility?.images.length === 2
                //&& 'col-md-12 col-sm-12 col-12 pb-lg-5 pb-md-5 pb-sm-0 ml-0 ml-md-1 ml-lg-1 pl-1 pl-lg-0 pl-md-0 pl-sm-2 mr-3')
                //: 'col-md-12 col-sm-6 col-6 pb-lg-5 pb-md-5 pb-sm-0 ml-0 ml-md-1 ml-lg-1 pl-1 pl-lg-0 pl-md-0 pl-sm-2 mr-3')
                
                //||
                //(facility?.images.length === 1 ? 'd-none' : null)
                }
            >
                <img 
                    src="https://5.imimg.com/data5/GJ/HL/ZW/SELLER-39443605/basketball-court-construction-500x500.jpg"
                    style={{width: '100%', height: '100%', overflow: 'hidden', borderRadius: 12}}
                />
            </div>

            <div className='col-md-12 col-sm-6 col-6 pt-md-0 pt-lg-2 pl-2 ml-0 mr-0 img-overlay'>
                <img 
                    src="https://5.imimg.com/data5/GJ/HL/ZW/SELLER-39443605/basketball-court-construction-500x500.jpg"
                    style={{width: '100%', height: '100%', overflow: 'hidden', borderRadius: 12}}
                />
                <div className="overlay text-center h-100 w-75">
                    <p className='text-white m-lg-5 m-md-5 m-sm-4 m-3'>+3 photos</p>
                </div>
            </div>
        </div> */}
            {isOpen && (
                <Lightbox
                    mainSrc={facility?.images[photoIndex]}
                    nextSrc={facility?.images[(photoIndex + 1) % facility?.images?.length]}
                    prevSrc={facility?.images[(photoIndex + facility?.images?.length - 1) % facility?.images?.length]}
                    onCloseRequest={() => setIsOpen(false)}
                    onMovePrevRequest={() => setPhotoIndex((photoIndex + facility?.images?.length - 1) % facility?.images?.length)}
                    onMoveNextRequest={() => setPhotoIndex((photoIndex + 1) % facility?.images?.length)}
                />
            )}
        </div>
    )
}

export default ImageGrid