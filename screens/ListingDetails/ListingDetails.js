import React, { useState } from "react";
import { images } from "../../config/images";
import Layout from "../../components/layout/layout";
import Input from "../../components/common/input";
import Time from "../../components/common/time";
import Googlemapcomp from "../../components/Googlemapcomp/Googlemapcomp";
import { InputNumber, Modal } from "antd";
import ImageLightbox from "../../components/ImageLightbox/ImageLightbox";

const ImagesLists = [
  `${images.ListImg1}`,
  `${images.ListImg2}`,
  `${images.ListImg3}`,
  `${images.ListImg4}`,
  `${images.ListImg4}`,
  `${images.ListImg4}`,
];

const ListingDetails = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [openLightbox, setOpenLightbox] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const ShowAllPhotos = () => {
    setOpenLightbox(true);
  };
  const CloseShowAllPhotos = () => {
    setOpenLightbox(false);
  };

  return (
    <Layout pageTitle="ListingDetails" isHome={true}>
      <div className="ListingDetailsStyles">
        <div className="container">
          <div className="ListingDetails__sec__heading">
            <h5>Nietzsche Ipsum: The birth of tragically Sports Complex</h5>
            <div className="ListingDetails__address">
              <a href="#">Udaipur, Rajasthan, India</a>
            </div>
          </div>
          <div className="ListingDetails__allimgs__block">
            <div className="fullimg__col">
              <img src={images.ListImg1} alt="ListImg1" />
            </div>
            <div className="imglist__col">
              <div className="img">
                <img src={images.ListImg2} alt="ListImg2" />
              </div>
              <div className="img">
                <img src={images.ListImg3} alt="ListImg3" />
              </div>
              <div className="img">
                <img src={images.ListImg4} alt="ListImg4" />
              </div>
              <div className="img">
                <img src={images.ListImg1} alt="ListImg1" />
              </div>

              <div className="show__allimg">
                <a href="#" onClick={ShowAllPhotos}>
                  Show all photos
                </a>
              </div>
              {openLightbox && (
                <ImageLightbox
                  ImagesList={ImagesLists}
                  onCloseRequest={CloseShowAllPhotos}
                />
              )}
            </div>
          </div>
          <div className="ListingDetails__infoblock">
            <div className="ListingDetails__infocol__colleft">
              <div className="ListingDetails__itemlist">
                <ul>
                  <li>
                    <span>6 members</span>
                  </li>
                  <li>
                    <span>2 grounds</span>
                  </li>
                  <li>
                    <span>2 Kits</span>
                  </li>
                </ul>
              </div>
              <div className="ListingDetails__hightlights">
                <div className="hightlights__block">
                  <div className="hightlight__detail__content">
                    <div className="hightlight__title">Entire home</div>
                    <div className="hightlight__destext">
                      You’ll have the serviced apartment to yourself.
                    </div>
                  </div>
                </div>
                <div className="hightlights__block">
                  <div className="hightlight__detail__content">
                    <div className="hightlight__title">
                      Great check-in experience
                    </div>
                    <div className="hightlight__destext">
                      100% of recent guests gave the check-in process a 5-star
                      rating.
                    </div>
                  </div>
                </div>
                <div className="hightlights__block">
                  <div className="hightlight__detail__content">
                    <div className="hightlight__title">Pool</div>
                    <div className="hightlight__destext">
                      Guests often search for this popular amenity
                    </div>
                  </div>
                </div>
                <div className="hightlights__block">
                  <div className="hightlight__detail__content">
                    <div className="hightlight__title">
                      Outstanding hospitality
                    </div>
                    <div className="hightlight__destext">
                      9 recent guests complimented Padma for outstanding
                      hospitality.
                    </div>
                  </div>
                </div>
              </div>
              <div className="ListingDetails__placeoffers">
                <div className="ListingDetails__sec__heading">
                  <h5>What this place offers</h5>
                </div>
                <div className="placeoffers__lists__block">
                  <div className="placeoffers__list">
                    <div className="placeoffers__text">Kitchen</div>
                  </div>
                  <div className="placeoffers__list">
                    <div className="placeoffers__text">Wifi</div>
                  </div>
                  <div className="placeoffers__list">
                    <div className="placeoffers__text">
                      Free parking on premises
                    </div>
                  </div>
                  <div className="placeoffers__list">
                    <div className="placeoffers__text">Pool</div>
                  </div>
                  <div className="placeoffers__list">
                    <div className="placeoffers__text">
                      TV with standard cable/satellite
                    </div>
                  </div>
                  <div className="placeoffers__list">
                    <div className="placeoffers__text">Lift</div>
                  </div>
                  <div className="placeoffers__list">
                    <div className="placeoffers__text">Washing machine</div>
                  </div>
                  <div className="placeoffers__list">
                    <div className="placeoffers__text">
                      Security cameras on property
                    </div>
                  </div>
                  <div className="placeoffers__list">
                    <div className="placeoffers__text">
                      Carbon monoxide alarm
                    </div>
                  </div>
                  <div className="placeoffers__list">
                    <div className="placeoffers__text">Smoke alarm</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="ListingDetails__infocol__colright">
              <div className="availabillty__block">
                <div className="availabillty__username">John Doe</div>
                <div className="availabillty__title__row">
                  <div className="price">₹1,788 / day </div>
                  <div className="reviews">4.73</div>
                </div>
                <form className="form__availabillty">
                  <div className="select__datepicker__dropdown">
                    <Input
                      type="date"
                      className="form-control search-select"
                      name="address"
                      placeholder="Select a date"
                    />
                  </div>
                  <div className="searchbox__timepicker">
                    <Time minStep={15} placeholder="From Time" />
                    <Time minStep={15} placeholder="To Time" />
                  </div>
                  <div className="guests__select">
                    <InputNumber
                      onKeyDown={(event) => {
                        event.preventDefault();
                      }}
                      formatter={(value) =>
                        `Guests ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      }
                      autoFocus={false}
                      className="form-control"
                      defaultValue={3}
                    />
                  </div>
                  <div className="form__actionbtn">
                    <button
                      type="button"
                      value="Book now"
                      className="btn btn-danger w-100"
                      onClick={showModal}
                    >
                      Book now
                    </button>
                    <Modal
                      className="BookNowThankyouModal"
                      title="Thankyou"
                      visible={isModalVisible}
                      footer={null}
                      onCancel={handleCancel}
                      width={600}
                      okButtonProps={{
                        danger: true,
                      }}
                      cancelButtonProps={{
                        danger: true,
                        ghost: true,
                      }}
                    >
                      <div className="bookingInfo">
                        <p>
                          <strong>Booking id:</strong> 10231115
                        </p>
                        <p>
                          <strong>Register Email Address:</strong>{" "}
                          test@gmail.com
                        </p>
                        <p>
                          <strong>Memmber:</strong> 10
                        </p>
                      </div>
                      <div className="qr-code-image">
                        <img src={images.QRCodeImage} alt="qr code" />
                      </div>
                    </Modal>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="ListingDetails__mapblock">
            <div className="ListingDetails__sec__heading">
              <h5>Where you’ll be</h5>
            </div>
            <div className="ListingDetails__Googlemap">
              <Googlemapcomp />
            </div>
            <div className="ListingDetails__rating">
              <span className="rating__star">4.2</span>
              <span className="review__count">(45 reviews)</span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ListingDetails;
