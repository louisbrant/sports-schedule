import Link from "next/link";

const FeaturedCard = ({
  cardBigWidth = "col-xl-3",
  isCard = true,
  element,
}) => {
  const cardBGImage =
    element.images && element.images.length
      ? element.images[0]
      : "/assets/field1.jpg";

  if (isCard) {
    return (
      <Link
        href="/facility/[facilityId]/[facilityName]"
        as={`/facility/${element.id}/${element.publicName}`}
      >
        <a
          className={`p-2 mb-2 featured-card d-flex flex-column col-xl-3 col-lg-6 col-md-6 col-12 ${cardBigWidth}`}
        >
          <div
            style={{
              backgroundImage: "url(" + cardBGImage + ")",
              width: "100%",
            }}
            className="d-flex p-2 card-bg"
          >
            <div className="featured-details col-8">
              <div className="badge d-flex justify-content-start">4.8</div>
              <h3 className="white">{element.name}</h3>
              <h4 className="white">{element.address}</h4>
            </div>
            <div className="m-2 d-flex align-items-end justify-content-end p-2 col"></div>
          </div>
        </a>
      </Link>
    );
  } else {
    return (
      <a
        href={`/r/${element.publicName}`}
        className={"mb-2 featured-tile d-flex flex-row w-100"}
      >
        <div
          style={{
            backgroundImage: "url(" + cardBGImage + ")",
            width: "30%",
            height: "150px",
            borderRadius: "5px 0 0 5px",
            marginLeft: "-1px",
          }}
          className="d-flex p-2 tile-bg"
        ></div>
        <div className="featured-details p-4">
          <h3 className="black">
            {element.name}
            <i className="ml-2 fa fa-check-circle green"></i>
          </h3>
          <h4 className="gray">{element.address}</h4>
        </div>
        <div className="m-2 d-flex align-items-end justify-content-end p-2 col"></div>
      </a>
    );
  }
};

export default FeaturedCard;
