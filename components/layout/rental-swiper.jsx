import Swiper from "react-id-swiper";
import Link from "next/link";

const SimpleSwiper = ({ list, imgBaseUrl }) => {
  const params = {
    slidesPerView: 3,
    spaceBetween: 30,
    centeredSlides: true,
  };
  return (
    <Swiper {...params}>
      {list &&
        list.map((item) => (
          <div
            key={item.id}
            className="col-2 equipement-list-item d-flex flex-column align-items-center justify-content-center"
          >
            <Link href="/categories/[categoryId]" as={`/categories/${item.id}`}>
              <a>
                <img
                  style={{ width: "120px" }}
                  src={imgBaseUrl + "/" + item.image}
                  alt={item.name}
                />
                <h4>{item.name}</h4>
              </a>
            </Link>
          </div>
        ))}
    </Swiper>
  );
};

export default SimpleSwiper;
