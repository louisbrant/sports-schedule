import { useState, useEffect } from "react";
import Typed from "react-typed";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";

import Button from "../../components/common/button";
import Card from "../../components/cards/card";
import Layout from "../../components/layout/layout";
import FeaturedCard from "../../components/cards/featured-card";
import PlanCard from "../../components/cards/plan-card";
import SearchBox from "../../components/search-box";

import { getSports } from "../../store/sport/actions";
import { getFacilities } from "../../store/facility/actions";
import ListingCard from "../../components/cards/ListingCard";

const Home = () => {
  const dispatch = useDispatch();

  const [width, setWidth] = useState(13)

  const { sports, facilities } = useSelector((state) => ({
    sports: state.sport.sports,
    facilities: state.facility.facilities,
  }));

  const categories = [
    {
      name: sports[0]?.name,
      sports_id: sports[0]?.sports_id,
      icon: <img src={'/assets/icons/basketball.svg'} />,
      title: "Soccer/Football",
    },
    {
      name: sports[1]?.name,
      sports_id: sports[1]?.sports_id,
      icon: <img src={'/assets/icons/basketball.svg'} />,
      title: "Futsal",
    },
    {
      name: sports[2]?.name,
      sports_id: sports[2]?.sports_id,
      icon: <img src={'/assets/icons/cricketball.svg'} />,
      title: "Cricket",
    },
    {
      name: sports[3]?.name,
      sports_id: sports[3]?.sports_id,
      icon: <img src={'/assets/icons/solidball.svg'} />,
      title: "BasketBall",
    },
    {
      name: sports[4]?.name,
      sports_id: sports[4]?.sports_id,
      icon: <img src={'/assets/icons/volleyball.svg'} />,
      title: "NetBall",
    },
    {
      name: sports[5]?.name,
      sports_id: sports[5]?.sports_id,
      icon: <img src={'/assets/icons/tennisball.svg'} />,
      title: "Sqaush",
    },
  ];

  useEffect(() => {
    dispatch(getSports()); // get sports
    dispatch(getFacilities()); // get facilities
  }, []);

  useEffect(() => {
    screen.width > 1600 ? setWidth(26) : setWidth(13)
  }, [])

  return (
    <Layout pageTitle="home" isHome={true} footerAtHome lineColor="white">
      <main className="d-flex flex-column">
        <div className="container">
          <div className="slider pt-5 bg-white text-white d-lg-flex flex-lg-column align-items-center" style={{ marginTop: 100 }}>
            <div className="d-flex justify-content-between">
              <div className="hero__section px-2" >
                <div className="">
                  <div className="mb-3">
                    <h1 className="title">
                      Find The <br /> Sport You Like
                    </h1>
                  </div>
                  <div className="mb-3">
                    <p className="description grey">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                      do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam aliquip ex ea commodo
                      consequat.
                    </p>
                  </div>
                </div>
                <div className="my-5 d-flex">
                  <Button label="Get Started" onClick={undefined} />
                  <Button
                    label="Our Listings"
                    onClick={undefined}
                    primary={false}
                  />
                </div>
                <div className="mb-3 mt-5 pt-lg-5 pt-md-0 pt-sm-0 pt-xs-0 d-flex align-items-center statics statsId" id="statsId" style={{ justifyContent: 'space-between', width: '90%' }}>
                  <div className="mr-3 d-flex align-items-center statics__rented" style={{ justifyContent: 'space-between', width: '44%', flexWrap: 'wrap' }}>
                    <h1 className="title secondary mb-0" style={{ fontSize: 54 }}>2.5k</h1>
                    <h6 className="description grey pt-0 mb-0">
                      Fields out <br /> Rented
                    </h6>
                  </div>
                  <div className="mr-3 d-flex align-items-center statics__rented" style={{ justifyContent: 'space-between', width: '45%', flexWrap: 'wrap' }}>
                    <h1 className="title secondary mb-0" style={{ fontSize: 54 }}>4.5k</h1>
                    <h6 className="description grey pt-0 mb-0">
                      Satisfied
                      <br />
                      Customers
                    </h6>
                  </div>
                </div>
              </div>
              <div className="mapsicle pt-5">
                <div className="ml-5 pl-5 mt-5">
                  <Card
                    imageSource="https://webroo-images.s3.ap-southeast-2.amazonaws.com/1645357254819-5aae46511225bcb25e8b45e0.jpeg"
                    price="$200/hr"
                    title="My Football Facility"
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt"
                    right={width}
                  />
                </div>
              </div>
            </div>

            <div className="slider__contant shadow -mt-5" >
              {/* main search box */}
              <div className="search__box__block">
                <SearchBox />
              </div>
            </div>

          </div>
        </div>
        <main className="main__block category__block">
          <div
            className="py-5 px-3 row w-100 ml-auto mr-auto"
            style={{
              background: "rgba(152, 181, 255, 0.06)",
            }}
          >
            <div className="container d-flex">
              {categories.map((category) => {
                return (
                  <Link
                    key={category.name}
                    href="/listing/[listingType]"
                    as={`/listing/${encodeURIComponent(
                      JSON.stringify({
                        selectedSports: category.name,
                        sportId: category.sports_id,
                      })
                    )}`}
                  >
                    <div className="col-md-2 pointer">
                      <h1 className="text-danger mb-3 text-center">
                        {category.icon}
                      </h1>
                      <div className="text-dark text-bold text-center">
                        {category.title}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </main>
      </main>



      <div className="custom__graphic">
        <img src={'/assets/icons/graphic1.png'} />
      </div>

      <main className="main__block handpicked__listing">
        <div className="container">
          <div className="listing-card-heading">
            <h3 className="secondary">Hand picked listings</h3>
            {/* <div className="red-line"></div> */}
            <h4 className="grey">
              A selection of Listings Verified For Quality
            </h4>
          </div>
          <div className="mt-5 d-flex flex-wrap justify-content-start justify-content-xl-center align-items-start">
            {/* <ListingCard />
            <ListingCard />
            <ListingCard />
            <ListingCard /> */}
            {facilities?.map((ele, index) => {
              if (index <= 3)
                return <ListingCard key={index} index={index} element={ele} cardHeight={365} height={220} />
              // return <ListingCard key={index} index={index} element={ele} />;
            })}
          </div>
        </div>
      </main>

      <main className="main__block contactus__banner">
        <div className="d-flex flex-row justify-content-between align-items-center">
          <div className="w-50" id="listing__cardd">
            <div className="listing-card-heading">
              <h3 className="secondary p-4 pl-5 py-5">
                List your fields with us and increase you ROI
              </h3>
              {/* <div className="red-line"></div> */}
              <h4 className="grey p-4 pl-5 py-5 mt-4 mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam aliquip ex ea commodo consequat.
              </h4>
            </div>
            <div className="ml-lg-5 text-md-center text-lg-left">
              <Button label="Contact Us" onClick={undefined} />
            </div>
          </div>
          <div className="listing_img_card">
            <Card
              imageSource="https://webroo-images.s3.ap-southeast-2.amazonaws.com/1645357254819-5aae46511225bcb25e8b45e0.jpeg"
              price="$200/hr"
              title="My Football Facility"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt"
              right={12}
            />
          </div>
        </div>
      </main>

      <div className="custom__graphic1">
        <img src={'/assets/icons/graphic2.png'} />
      </div>

      <div className="custom__graphic">
        <img src={'/assets/icons/graphic1.png'} />
      </div>

      <main className="main__block handpicked__listing">
        <div className="container">
          <div className="listing-card-heading">
            <h3 className="secondary">New listings</h3>
            {/* <div className="red-line"></div> */}
            <h4 className="grey">A selection of new Listings</h4>
          </div>
          <div className="mt-5 d-flex flex-wrap justify-content-start justify-content-xl-center align-items-start">
            {/* <ListingCard />
            <ListingCard />
            <ListingCard />
            <ListingCard /> */}
            {facilities?.map((ele, index) => {
              if (index <= 3)
                return <ListingCard key={index} index={index} element={ele} cardHeight={365} height={220} />
            })}
          </div>
        </div>
      </main>

      <main className="main__block joinus__block">
        <div className="container">
          <div className="join__container">
            <h3 className="secondary">Join Us Today</h3>
            <h4 className="grey">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam aliquip ex ea commodo consequat. </h4>
            <div className="mt-5">
              <Button label="Get Started" onClick={undefined} />
            </div>
          </div>
        </div>
      </main>

      <main className="main__block bg-light-gray d-none">
        <div className="d-flex flex-column justify-content-center align-items-center">
          <h3>Plan The Vacation of Your Dreams</h3>
          <div className="red-line"></div>
          <h4 className="gray">
            Explore some of the best tips from around the world from our
            partners and friends. Discover some of the most popular listings!
          </h4>
        </div>
        <div className="d-flex flex-wrap p-2 container justify-content-center align-items-center">
          <PlanCard></PlanCard>
          <PlanCard></PlanCard>
          <PlanCard></PlanCard>
        </div>
      </main>
      <main className="red-section d-none">
        <h2 className="white">Explorer Top-Rated Homes Nearby</h2>
      </main>
    </Layout>
  );
};

export default Home;
