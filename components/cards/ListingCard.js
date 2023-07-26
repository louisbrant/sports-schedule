import Link from "next/link";
const ListingCard = ({ element, index, width, height, cardHeight, list, searchData }) => {
  const cardBGImage =
    element?.images && element?.images?.length
      ? element?.images[0]
      : "https://images.pexels.com/photos/2277981/pexels-photo-2277981.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";


  console.log("ELEMENT ===", element)

  if(list !== undefined){
    return (
      <Link
        href={{ pathname: "/facility/[facilityId]/[facilityName]", query: { searchData: searchData}}}
        as={`/facility/${list?.id}/${list?.publicName}`}
      >
        <div className="card-container1" style={{ width: width ? width : 375, height: cardHeight ? cardHeight : 'auto'}}>
          <img src={list?.images?.length ? list?.images[0] : "https://images.pexels.com/photos/2277981/pexels-photo-2277981.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"} className="card-image1" alt="Card Image" style={{height: height ? height : 260}} />
          <div className="p-3">
            <h4 className="mt-1 price wine_red pt-1 pb-2" style={{fontWeight: '700'}}>{list?.item?.length > 0 ? '$'+list.item[0].fee+'/hr' : 'N/A'}</h4>
            <h5 className="card-text mb-0 secondary">{list?.name}</h5>
            <h6 className="mt-1 mb-0 card-description">{list?.address}</h6>
          </div>
        </div>
      </Link>
    );
  }else{
    return (
      <Link
        href="/facility/[facilityId]/[facilityName]"
        as={`/facility/${element?.id}/${element?.publicName}`}
      >
        <div className="card-container1" style={{ width: width ? width : 375, height: cardHeight ? cardHeight : 'auto'}}>
          <img src={cardBGImage} className="card-image1" alt="Card Image" style={{height: height ? height : 260}} />
          <div className="p-3">
            <h4 className="mt-1 price wine_red pt-1 pb-2" style={{fontWeight: '700'}}>AUD 50/hr</h4>
            <h5 className="card-text mb-0 secondary">{element?.name}</h5>
            <h6 className="mt-1 mb-0 card-description">{element?.address}</h6>
          </div>
        </div>
      </Link>
    );
  }
};

export default ListingCard;
