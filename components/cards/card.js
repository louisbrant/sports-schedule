const Card = ({ imageSource, price, title, description, right }) => {
  return (
    <div className="card-container" style={{right: right ? right+'rem' : '7rem'}}>
      <img
        src={imageSource}
        className="card-image"
        alt="Card Image"
      />
      <div className="p-3">
        <h4 className="mt-1 price wine_red pt-1 pb-2" style={{fontWeight: 'bold'}}>{price}</h4>
        <h5 className="card-text mb-0 secondary">{title}</h5>
        <h6 className="mt-1 mb-0 card-description">{description}</h6>
      </div>
    </div>
  );
};

export default Card;
