import Link from "next/link";
import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Style from "./headerMenu.module.css";
import { useRouter } from "next/router";
import useFetch from "@/hooks/useFetch";
import { NavDropdown } from "react-bootstrap";
import MemberSearch from "@/components/MemberSearch/MemberSearch";

const HeaderMenu = () => {
  const router = useRouter();
  const [activeItem, setActiveItem] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDropdownSecondOpen, setIsDropdownSecondOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const [isDropdownThirdOpen, setIsDropdownThirdOpen] = useState(false);

  const handleMouseEnter = () => {
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    setIsDropdownOpen(false);
  };
  const handleMouseSecondEnter = () => {
    setIsDropdownSecondOpen(true);
  };

  const handleMouseSecondLeave = () => {
    setIsDropdownSecondOpen(false);
  };

  const handleMouseThirdEnter = () => {
    setIsDropdownThirdOpen(true);
  };

  const handleMouseThirdLeave = () => {
    setIsDropdownThirdOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isDropdownOpen);
  };

  const { data, loading } = useFetch("/home");

  useEffect(() => {
    const { pathname } = router;
    setActiveItem(pathname);
  }, [router]);

  return (
    <Navbar collapseOnSelect expand="lg" className={Style.navbar}>
      <Container>

        <div>
          <div className={Style.menu}>
            <Navbar.Brand className={Style.menuBrand} style={{ color: "#fff" }}>
              Menu
            </Navbar.Brand>
          </div>
      
        {/* hidden search component  */}
          <div className={`${Style.search}`}>
            <MemberSearch></MemberSearch>
          </div>
        </div>
        

        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          onClick={() => setExpanded(!expanded)}
        />
        <Navbar.Collapse
          id="responsive-navbar-nav"
          className={isDropdownOpen ? "show" : ""}
          in={expanded}
        >
          <Nav className={`${Style.nav} me-auto`}>
            <Nav>
              <Link
                href="/"
                className={activeItem === "/" ? Style.active : ""}
                onClick={() => setExpanded(false)}
              >
                হোম
              </Link>
            </Nav>
            <Nav>
              <Link
                href="/application"
                className={activeItem === "/application" ? Style.active : ""}
                onClick={() => setExpanded(false)}
              >
                সদস্য আবেদন
              </Link>
            </Nav>

            <Nav className={`${Style.dropdown} d-flex`}>
              <NavDropdown
                title=" কার্যনির্বাহী কমিটি "
                id="basic-nav-dropdown"
                className={Style.customDropdown}
                show={isDropdownThirdOpen}
                onMouseEnter={handleMouseThirdEnter}
                onMouseLeave={handleMouseThirdLeave}
              >
                {/* <div  style={{backgroundColor: 'red'}}> */}
                <NavDropdown.Item className={`${Style.dropdownItem} py-2 px-3`}>
                  <Link
                    href="/centralPresent"
                    onClick={() => setExpanded(false)}
                  >
                    কেন্দ্রীয় কমিটি
                  </Link>
                </NavDropdown.Item>
                <NavDropdown.Item className={`${Style.dropdownItem} py-2 px-3`}>
                  <Link
                    href="/branchPresent"
                    onClick={() => setExpanded(false)}
                  >
                    শাখা কমিটি
                  </Link>
                </NavDropdown.Item>
                {/* </div> */}
              </NavDropdown>
            </Nav>

            <Nav className={`${Style.dropdown} d-flex`}>
              <NavDropdown
                title=" সদস্যবৃন্দ "
                id="basic-nav-dropdown"
                className={Style.customDropdown}
                show={isDropdownOpen}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                {/* <div  style={{backgroundColor: 'red'}}> */}
                <NavDropdown.Item className={`${Style.dropdownItem} py-2 px-3`}>
                  <Link href="/senior" onClick={() => setExpanded(false)}>
                    সম্মানিত সদস্য
                  </Link>
                </NavDropdown.Item>
                <NavDropdown.Item className={`${Style.dropdownItem} py-2 px-3`}>
                  <Link href="/general" onClick={() => setExpanded(false)}>
                    সাধারণ সদস্য
                  </Link>
                </NavDropdown.Item>

                <NavDropdown.Item className={`${Style.dropdownItem} py-2 px-3`}>
                  <Link href="/passMember" onClick={() => setExpanded(false)}>
                    প্রয়াত সদস্য 
                  </Link>
                </NavDropdown.Item>

                <NavDropdown.Item className={`${Style.dropdownItem} py-2 px-3`}>
                  <Link href="/expre" onClick={() => setExpanded(false)}>
                    সভাপতি ও সাধারণ সম্পাদকের তালিকা{" "}
                  </Link>
                </NavDropdown.Item>
                {/* </div> */}
              </NavDropdown>
            </Nav>
            <Nav>
              <Link
                href="/notice"
                className={activeItem === "/notice" ? Style.active : ""}
                onClick={() => setExpanded(false)}
              >
                নোটিশ
              </Link>
            </Nav>
            <Nav>
              <Link
                href="/history"
                className={activeItem === "/history" ? Style.active : ""}
                onClick={() => setExpanded(false)}
              >
                সংগঠনটির ইতিহাস
              </Link>
            </Nav>

            <Nav className={`${Style.dropdown} d-flex`}>
              <NavDropdown
                title="পূর্ববর্তী কমিটির তালিকা "
                id="basic-nav-dropdown"
                className={Style.customDropdown}
                show={isDropdownSecondOpen}
                onMouseEnter={handleMouseSecondEnter}
                onMouseLeave={handleMouseSecondLeave}
              >
                {/* <div  style={{backgroundColor: 'red'}}> */}
                <NavDropdown.Item className={`${Style.dropdownItem} py-2 px-3`}>
                  <Link href="/central" onClick={() => setExpanded(false)}>
                    কেন্দ্রীয় কমিটি
                  </Link>
                </NavDropdown.Item>
                <NavDropdown.Item className={`${Style.dropdownItem} py-2 px-3`}>
                  <Link href="/branch" onClick={() => setExpanded(false)}>
                    শাখা কমিটি
                  </Link>
                </NavDropdown.Item>
                {/* </div> */}
              </NavDropdown>
            </Nav>

            <Nav>
              <Link
                href="/archive"
                className={activeItem === "/archive" ? Style.active : ""}
                onClick={() => setExpanded(false)}
              >
                আর্কাইভ
              </Link>
            </Nav>
            <Nav>
              <Link
                href="/gallery"
                className={activeItem === "/gallery" ? Style.active : ""}
                onClick={() => setExpanded(false)}
              >
                ফটো গ্যালারি
              </Link>
            </Nav>

            <Nav>
              <Link
                href="/magazine"
                className={activeItem === "/magazine" ? Style.active : ""}
                onClick={() => setExpanded(false)}
              >
                ম্যাগাজিন
              </Link>
            </Nav>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default HeaderMenu;
