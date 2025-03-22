/* eslint-disable @next/next/no-img-element */
import useFetch from "@/hooks/useFetch";
import { baseImgUrl } from "@/utils/imgUrl";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Style from "./advertice.module.css";
import Link from "next/link";
const Advertise = () => {
  const { data, loading } = useFetch("/advertisement_view");
  // console.log(data?.data[0]?.title)

  return (
    <div className="mb-4">
         {/* Notice Title */}
         <div className="headerTitle mt-3">
              <h3 className="headerTitleMain">বিজ্ঞাপন</h3>
            </div>
            {/* Notice Details */}
      <Container className={Style.cardDesign}>
        <Row>
                  {
            data?.data?.map(item => (
              <Col key={item.id} md={3}>
                <Link href={data?.data[0]?.title} target="_blank" >
                  <img
                    src={baseImgUrl + item?.image}
                    alt=""
                    className="img-fluid"
                    style={{ width: '350px', height: '250px' }}
                  />
                </Link>
              </Col>
            ))
          }
        </Row>
      </Container>
    </div>
  );
};

export default Advertise;
