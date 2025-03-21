import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { FaCertificate, FaUsersCog, FaUsers, FaCheck } from "react-icons/fa";
import CountUp from "react-countup";
import Style from "./homeCountUp.module.css";
import Link from "next/link";

const HomeCountUp = ({ data }) => {
  return (
    <div className={Style.countUpMain}>
      <div className={Style.overlay}></div>
      <Container>
        <Row>
          <Col lg={4} md={6} sm={12} data-aos="zoom-in" className="mb-4">

          <Link className="text-decoration-none" href="/centralPresent">
          <div className={Style.countUp}>
              <FaCertificate className={Style.icon} />
              <h4 className={Style.title}>কার্যনির্বাহী কমিটি</h4>
            <div>
            {
              data?.homecount?.executive > 0 ? 
              <CountUp
              start={0}
              end={data?.homecount?.executive}
              clssName={Style.countUpText}
            />
            :
            <CountUp
            start={0}
            end={20}
            clssName={Style.countUpText}
           
          />
          
             }
          <span className="fs-2 fw-bold">   +</span>
            </div>
            </div>
          </Link>
           
          </Col>
          <Col lg={4} md={6} sm={12} data-aos="zoom-in" className="mb-4">
           <Link className="text-decoration-none" href={'/general'}>
           <div className={Style.countUp}>
              <FaUsersCog className={Style.icon} />
              <h4 className={Style.title}>সাধারণ সদস্য</h4>
              <CountUp
                start={0}
                end={data?.homecount?.general}
                clssName={Style.countUpText}
              />
            </div>
           </Link>
          </Col>
          <Col lg={4} md={6} sm={12} data-aos="zoom-in" className="mb-4">

         <Link className="text-decoration-none" href="/senior">
         <div className={Style.countUp}>
              <FaCheck className={Style.icon} />
              <h4 className={Style.title}>সম্মানিত সদস্য</h4>
              <CountUp
                start={0}
                end={data?.homecount?.senior}
                clssName={Style.countUpText}
              />
            </div>
         </Link>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HomeCountUp;
