import React from 'react'
import { Row, Col } from 'antd'
// import './Listingcardcomp.scss'

function Listingcardcomp(props) {
  return (
    <div className="ListingcardcompStyles">
      <Row
        gutter={[
          { xs: 10, sm: 10, md: 10 },
          { xs: 20, sm: 20, md: 20 },
        ]}
      >
        {props.ListingData.map((listing) => {
          return (
            <Col xs={24}>
              <div className="Listingcardbox">
                <div className="Listingcardelement">
                  <figure className={`Listingcard__user`}>
                    <img
                      src={listing.ListImg}
                      alt={listing.alt}
                    />
                  </figure>
                  <div className="Listingcardname">
                    <p>{listing.ListAddressText}</p>
                    <h4>{listing.ListName}</h4>
                  </div>
                </div>
              </div>
            </Col>
          )
        })}
      </Row>
    </div>
  )
}

export default Listingcardcomp
