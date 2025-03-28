import Head from "next/head";
import useFetch from "@/hooks/useFetch";
import { Col, Container, Row, Table } from "react-bootstrap";
import LoadingSpinner from "@/components/loadingSpinner/LoadingSpinner";
import { BASE_URL, TITLE } from "@/utils/api";
import Img from "@/components/lazyLoadImage/Img";
import { baseImgUrl } from "@/utils/imgUrl";
import Style from "@/styles/expre.module.css";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import { BsFacebook } from "react-icons/bs";
import { BsFillEyeFill } from "react-icons/bs";
import { BsInstagram } from "react-icons/bs";
import QuickViewModal from "@/components/quickViewModal/QuickViewModal";
import SearchModal from "@/components/quickViewModal/searchModal/SearchModal";
import SearchCard from "@/components/cardDesign/SearchCard/SearchCard";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const router = useRouter();

  const { unionId, memberType } = router.query;
  

  useEffect(() => {
    axios
      .get(
        `${BASE_URL}/memberGetByUnion?union_id=${unionId}&member_category=${memberType}`
      )
      .then((response) => {
        setLoading(true);
        // Handle the successful response here
        // console.log(response.data);
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        // Handle errors here
        console.error(error);
      });
  }, [unionId, memberType]);

  // console.log(data);

  return (
    <>
      <Head>
        <title>Union Member View {TITLE}</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="./shreepur.jpeg" />
      </Head>
      <main>
        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            {/* Advisor Details */}
            <Container className="mt-4">
              <Row>
                <div className="headerTitle">
                  <h3 className="headerTitleMain mb-5"> সদস্য অনুসন্ধান </h3>
                </div>

                <Container>
                  <Row>
                    {data?.data?.map((item, idx) => (
                      <SearchCard key={idx} item={item} />
                    ))}
                  </Row>
                </Container>

                {/* {data?.data?.map((item) => (
                  <Col lg={4} md={6} sm={12} key={item?.id}>
                    <div className={Style.cardDesign} data-aos="fade-up">
                      {item?.image !== null ? (
                        <Img
                          src={baseImgUrl + item?.image}
                          className={Style.cardImg}
                        />
                      ) : (
                        <Img src="./default.png" className={Style.cardImg} />
                      )}

                      <h4 className={Style.name}>{item?.name}</h4>
                      <p className={Style.text}>{(item?.category === "Senior") ? item?.custom1 : 
        (item?.category === "Executive") ? item?.text1:item?.university}  <br/> {item?.phone} </p>

                      <div className={Style.icons}>
                        <div className={Style.icon}>
                          <a href="https://www.facebook.com/">
                            <BsFacebook />
                          </a>
                        </div>
                        <div
                          className={Style.icon}
                          onClick={() => setModalShow(true)}
                        >

                        
                         <div className={Style.icon} onClick={() => setModalShow(true)}>
            <BsFillEyeFill />
          </div>

                        </div>
                        <div className={Style.icon}>
                          <a href="https://www.instagram.com/">
                            <BsInstagram />
                          </a>
                        </div>
                      </div>
                    </div>
                 
                       
        <SearchModal  
          show={modalShow}
          onHide={() => setModalShow(false)}
          item={item}>

        </SearchModal>
        
     
      
          

                  </Col>
                ))} */}
              </Row>
            </Container>
          </>
        )}
      </main>
    </>
  );
}
