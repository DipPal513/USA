import React, { useState } from "react";
import { Col } from "react-bootstrap";
import Img from "../../lazyLoadImage/Img";
import { baseImgUrl } from "@/utils/imgUrl";
import Style from "./searchCard.module.css";
import { BsFacebook } from "react-icons/bs";
import { BsFillEyeFill } from "react-icons/bs";
import { BsInstagram } from "react-icons/bs";
import SearchModal from "@/components/quickViewModal/searchModal/SearchModal";

const SearchCard = ({ item }) => {
//   console.log(item);

  const [modalShow, setModalShow] = useState(false);

  return (
    <Col lg={4} md={6} sm={12}>
      <div className={Style.cardDesign} data-aos="fade-up">
        {item?.image !== null ? (
          <Img src={baseImgUrl + item?.image} className={Style.cardImg} />
        ) : (
          <Img src="./default.png" className={Style.cardImg} />
        )}

        <h4 className={Style.name}>{item?.name}</h4>
        <p className={Style.text}>
          {item?.category === "Senior"
            ? item?.custom1
            : item?.category === "Executive"
            ? item?.text1
            : item?.university}{" "}
          <br /> {item?.phone}{" "}
        </p>

        <div className={Style.icons}>
          <div className={Style.icon}>
            <a href="https://www.facebook.com/">
              <BsFacebook />
            </a>
          </div>
          <div className={Style.icon} onClick={() => setModalShow(true)}>
            <BsFillEyeFill />
          </div>
          <div className={Style.icon}>
            <a href="https://www.instagram.com/">
              <BsInstagram />
            </a>
          </div>
        </div>

        {/* Modal */}
        <SearchModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          item={item}
        />
      </div>
    </Col>
  );
};

export default SearchCard;
