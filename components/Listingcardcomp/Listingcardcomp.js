import React from "react";
import { Carousel } from "antd";

import Link from "next/link";

const PrevArrow = (props) => {
  const { className, onClick } = props;
  return <div className={className} onClick={onClick} />;
};

const NextArrow = (props) => {
  const { className, onClick } = props;
  return <div className={className} onClick={onClick} />;
};

const prevnext = {
  prevArrow: <PrevArrow />,
  nextArrow: <NextArrow />,
};

function Listingcardcomp(props) {
  return (
    <div className="ListingcardcompStyles">
      <div className="Listingcardbox">
        <div className="Listingcard__contant d-flex">
          <div className="Listingcard__img">
            <Carousel arrows {...prevnext}>
              {props.imgList.map((img, i) => (
                <div key={i}>
                  <figure>
                    <img src={img} alt="carouselImg" />
                  </figure>
                </div>
              ))}
            </Carousel>
          </div>
          <div className="Listingcard__details d-flex flex-column justify-content-between">
            <div className="d-flex justify-content-between mb-3 Listingcard__Title__row">
              <div className="mr-4">
                <p>{props.ListAddressText}</p>
                <h4>
                  <Link
                    href="/facility/[facilityId]/[facilityName]"
                    as={`/facility/${props.id}/${props.ListName}`}
                  >
                    {props.ListName}
                  </Link>
                </h4>
              </div>
              <button type="button" className="Listingcard__likebtn">
                <img src="/assets/icon_like.svg" />
              </button>
            </div>
            <div className="d-flex align-items-center justify-content-between Listingcard__Bottom__row">
              <div className="Listingcard__rating">
                <span className="rating__star">{props.Listratingcount}</span>
                <span className="review__count">{props.Listreviewcount}</span>
              </div>
              {props.ListPrice !== "N/A" && (
                <div className="ListPrice">
                  <a href="#">{props.ListPrice} /hour</a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Listingcardcomp;
