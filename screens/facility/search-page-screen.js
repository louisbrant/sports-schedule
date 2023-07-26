import { useEffect, useState } from "react";
import FeaturedCard from "../../components/cards/featured-card";
import Layout from "../../components/layout/layout";
import SearchBox from "../../components/search-box";

const SearchPageScreen = ({ facilities }) => {
  const [cardView, setCardView] = useState(false);

  useEffect(() => {
    const list = facilities.map((ele) => {
      return {
        position: [ele.lat, ele.lng],
        title: ele.name,
      };
    });
    setPlaces(list);
  }, []);

  return (
    <Layout pageTitle="facility search" isHome={true}>
      <div className="d-flex w-100">
        <div className="d-flex flex-column w-50">
          <div className="d-flex flex-column w-100">
            <SearchBox isDate={false} isHorizontal={true}></SearchBox>
          </div>
          <div className="d-flex flex-row w-100 pl-4 pt-4 pb-2">
            <i
              onClick={() => setCardView(true)}
              className="fa fa-th mr-2"
              style={{ fontSize: "24px", cursor: "pointer" }}
              aria-hidden="true"
            ></i>
            <i
              onClick={() => setCardView(false)}
              className="fa fa-bars"
              style={{ fontSize: "24px", cursor: "pointer" }}
              aria-hidden="true"
            ></i>
          </div>
          <div className="d-flex flex-column w-100">
            <div className="d-flex flex-wrap p-4">
              {facilities.map((ele, index) => (
                <FeaturedCard
                  key={index}
                  element={ele}
                  isCard={cardView}
                  cardBigWidth="col-xl-6"
                ></FeaturedCard>
              ))}
            </div>
          </div>
        </div>
        <div className="d-flex w-50"></div>
      </div>
    </Layout>
  );
};

export default SearchPageScreen;
