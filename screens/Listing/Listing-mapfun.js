
import React from "react";
import Listingcardcomp from "../../components/Listingcardcomp/Listingcardcomp";
import { images } from '../../config/images'

const data = {
    ListingData: [
      {
        ListImg: images.ListImg1,
        alt: 'ListImg1',
        ListAddressText: 'Bernie Mullane Sports, Marella Ave, Kellyville NSW 2155',
        ListName: 'Bernie Mullane Sports Complex',
      },
      {
        ListImg: images.ListImg1,
        alt: 'ListImg2',
        ListName: 'Lorem Ipsum',
        ListAddressText:
          'Standard dummy text ever since the 1500s, when an unknown.',
      },
    ],
}

const Listing = () => {
    return (
        <div className="ListingStyles">
            <div className="Listing__title">
                <h3>Stays in Mumbai</h3>
                <div className="red-line"></div>
            </div>
            <div className="Listingcard__block">
                <Listingcardcomp {...data} />
            </div>
        </div>
    );
};

export default Listing;
