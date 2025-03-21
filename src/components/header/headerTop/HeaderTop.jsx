/* eslint-disable @next/next/no-img-element */
import useFetch from "@/hooks/useFetch";
import Link from "next/link";
import React from "react";
import { Container } from "react-bootstrap";
import Style from './headerTop.module.css';
import MemberSearch from "@/components/MemberSearch/MemberSearch";

const HeaderTop = () => {
  const { data, loading } = useFetch("/home");
  return (
    <header>
      <Container className="d-flex gap-3 justify-content-between justify-items-center">
        <div className={Style.logo}>
          <Link href="/" className="d-flex align-items-center">
            <img
              src="/usa123.jpg"
              alt=""
              
            />
          </Link>
        </div>


          <div className={`${Style.textA} text-success fs-5 fw-semibold mt-4`}>উদ্যমে উদ্যোগে </div>
        <div className={`${Style.textA} text-success fs-5 fw-semibold mt-4`} >তারুণ্যে দুর্জয় </div>



        <div className={Style.search}>
          <MemberSearch></MemberSearch>
        </div>
      </Container>
    </header>
  );
};

export default HeaderTop;
