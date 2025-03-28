import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Style from "./footer.module.css";
import { BiSolidEditLocation } from "react-icons/bi";
import { BsFillTelephoneFill } from "react-icons/bs";
import { BsFillEnvelopeFill } from "react-icons/bs";
import { BsArrowRightCircleFill } from "react-icons/bs";
import { BsTwitter, BsFacebook, BsYoutube, BsLinkedin } from "react-icons/bs";
import Link from "next/link";
import useFetch from "@/hooks/useFetch";

const Footer = () => {
  const { data, loading } = useFetch("/home");
  // console.log(data?.admin)
  return (
    <footer className={Style.footer}>
      <Container>
        <Row>
          <Col lg={3} md={6} sm={6}>
            <h4 className={Style.title}>Address</h4>
            <div>
              <ul className={`${Style.footerItems} p-0`}>
                <li
                  className={`${Style.footerItem} d-flex align-items-center p-0 mb-2`}
                >
                  <BiSolidEditLocation className={Style.footerIcon} />
                  <span>{data?.admin?.address}</span>
                </li>
                <li
                  className={`${Style.footerItem} d-flex align-items-center p-0 mb-2`}
                >
                  <BsFillTelephoneFill className={Style.footerIcon} />
                  <span>{data?.admin?.mobile}</span>
                </li>
                <li
                  className={`${Style.footerItem} d-flex align-items-center p-0 mb-2`}
                >
                  <BsFillEnvelopeFill className={Style.footerIcon} />
                  <span>{data?.admin?.email}</span>
                </li>
              </ul>
            </div>
          </Col>
          <Col lg={3} md={6} sm={6}>
            <h4 className={Style.title}>Quick Links</h4>
            <div>
              <ul className={`${Style.footerItems} p-0`}>
                <Link href="/" className={Style.footerLink}>
                  <li
                    className={`${Style.footerItem} d-flex align-items-center p-0 mb-2`}
                  >
                    <BsArrowRightCircleFill className={Style.footerIcon} />
                    <span>About Us</span>
                  </li>
                </Link>
                <Link href="/" className={Style.footerLink}>
                  <li
                    className={`${Style.footerItem} d-flex align-items-center p-0 mb-2`}
                  >
                    <BsArrowRightCircleFill className={Style.footerIcon} />
                    <span>Privacy Policy</span>
                  </li>
                </Link>
                <Link href="/" className={Style.footerLink}>
                  <li
                    className={`${Style.footerItem} d-flex align-items-center p-0 mb-2`}
                  >
                    <BsArrowRightCircleFill className={Style.footerIcon} />
                    <span>Terms & Condition</span>
                  </li>
                </Link>
                  <li
                    className={`${Style.footerItem} d-flex align-items-center p-0 mb-2`}
                  >
                    <BsArrowRightCircleFill className={Style.footerIcon} />
                    <Link style={{textDecoration: "none", color: "#777"}} href="https://laravel.amaderthikana.com/admin/login"  target="_blank">Login</Link>
                  </li>
              </ul>
            </div>
          </Col>
          <Col lg={3} md={6} sm={6}>
            <h4 className={Style.title}>Our Social Networks</h4>
            <div className={Style.footerSocialIcons}>

              <div  className={Style.footerSocialIcon}>
                <BsTwitter />
              </div>

              <Link href={data?.admin.fb_link || "#"}  target="_blank">
              <div  className={Style.footerSocialIcon}>
                <BsFacebook /> 
               
              </div>
              </Link>
                <Link href={data?.admin.youtube_link || "#"}  target="_blank">
              <div  className={Style.footerSocialIcon}>
                <BsYoutube />

              </div>
                </Link>
                <Link href={data?.admin.other_link || "#"}  target="_blank">
              <div  className={Style.footerSocialIcon}>
                <BsLinkedin />

              </div>
                </Link>
            </div>
          </Col>
          <Col lg={3} md={6} sm={6}>
            <h4 className={Style.title}>Developed By</h4>
            <Link href="http://ancovabd.com/" target="_blank">
              <img src="./ancovabr1.png" alt="" className={Style.ancovaLogo} />
            </Link>
             
              <h4 className={Style.help}> সহযোগিতায়  </h4>
              <h5 className={Style.title} > কার্যনির্বাহী কমিটি  ২০২৩-২৪ </h5>

          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
