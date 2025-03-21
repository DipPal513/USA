import { BiSearchAlt2 } from "react-icons/bi";
import Style from "./memberSearch.module.css";
import { useState } from "react";
import { useRouter } from "next/router";
import { Button, Form, Modal } from "react-bootstrap";

const MemberSearch = () => {
  const [searchValue, setSearchValue] = useState("");
  const router = useRouter();

  // console.log(searchValue)

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchValue) {
      router.push(
        `/searchMember?searchMember=${encodeURIComponent(searchValue)}`
      );
    }
  };

  return (
    <div className="mt-4 ">
      {/* Search Bar */}
      <form action="" onSubmit={handleSearchSubmit}>
        <div className={Style.searchBox}>
          <input
            className={Style.searchInput}
            type="text"
            name=""
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search"
          />
          <button className={Style.searchButton} href="#">
            <BiSearchAlt2 className=" fw-bold fs-3" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default MemberSearch;
