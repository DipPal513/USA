import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Img from "../lazyLoadImage/Img";
import { baseImgUrl } from "@/utils/imgUrl";
import Style from "./quickViewModal.module.css";
import Table from "react-bootstrap/Table";

const QuickViewModal = (props) => {
  // console.log(props)
  
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter" className={Style.title}>
          Member Details
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex flex-column align-items-center">
          <div className="mb-3">
            <Img
              src={baseImgUrl + props?.item?.image}
              className={Style.cardImg}
            />
          </div>
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>নাম</th>
                <td colSpan={2}>{props?.item?.name}</td>
              </tr>
            </thead>
            <tbody>
             
              <tr>
                <th className="py-2 px-1">পদবি ও কর্মস্থল </th>
                <td colSpan={2}>{props?.item?.custom1}</td>
              </tr>
             
            
              <tr>
                <th className="py-2 px-1">ব্লাড গ্রুপ</th>
                <td colSpan={2}>{props?.item?.blood}</td>
              </tr>
              <tr>
                <th className="py-2 px-1">ফোন নাম্বার</th>
                <td colSpan={2}>{props?.item?.phone}</td>
              </tr>
              <tr>
                <th className="py-2 px-1">ই-মেইল</th>
                <td colSpan={2}>{props?.item?.email}</td>
              </tr>
              <tr>
                <th className="py-2 px-1"> শখ </th>
                <td colSpan={2}>{props?.item?.workplace}</td>
              </tr>

              <tr>
                <th className="py-2 px-1"> বিশ্ববিদ্যালয়   </th>
                <td colSpan={2}>{props?.item?.university}</td>
              </tr>  

              <tr>
                <th className="py-2 px-1"> বিভাগ/সাবজেক্ট    </th>
                <td colSpan={2}>{props?.item?.department}</td>
              </tr> 

              <tr>
                <th className="py-2 px-1">  সেশন  </th>
                <td colSpan={2}>{props?.item?.custom2}</td>
              </tr> 
                 
              <tr>
                <th className="py-2 px-1"> হলের  নাম  </th>
                <td colSpan={2}>{props?.item?.current_address}</td>
              </tr>  

               <tr>
                <th className="py-2 px-1"> ইউনিয়ন  / পৌরসভা </th>
                <td colSpan={2}>{props?.item?.dureg}</td>
              </tr>  

              <tr>
                <th className="py-2 px-1"> গ্রামের নাম   </th>
                <td colSpan={2}>{props?.item?.permanent_address}</td>
              </tr> 


              <tr>
                <th className="py-2 px-1"> ঊষা কার্যনির্বাহী কমিটি/শাখা কমিটিতে পদবি (যদি থাকে)  </th>
                <td colSpan={2}>{props?.item?.custom3}</td>
              </tr> 

             

            </tbody>
          </Table>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default QuickViewModal;
