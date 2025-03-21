import Head from "next/head";
import useFetch from "@/hooks/useFetch";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import Style from "@/styles/Application.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL } from "@/utils/api";
import Swal from "sweetalert2";

export default function Application() {
  const [bloodGroup, setBloodGroup] = useState("");
  const [loadingBtn, setLoadingBtn] = useState(false);
  // Lavel State
  const [showLevel, setShowLevel] = useState({});
  // University State
  const [universityName, setUniversityName] = useState([]);
  const [selectUniversity, setSelectUniversity] = useState("");
  // Union State
  const [unionName, setUnionName] = useState([]);
  const [selectUnion, setSelectUnion] = useState("");
  // Error Message
  const [errorMessage, setErrorMessage] = useState({});

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Admin Label
  useEffect(() => {
    axios.get(BASE_URL + "/admin_view").then((res) => {
      setShowLevel(res.data.admin);
    });
  }, []);
  console.log(showLevel)

  // Get All University Name
  useEffect(() => {
    axios.get(BASE_URL + "/university_view").then((res) => {
      setUniversityName(res.data.data);
    });
  }, []);

  // Get All Union Name
  useEffect(() => {
    axios.get(BASE_URL + "/union_view").then((res) => {
      setUnionName(res.data.data);
    });
  }, []);

  const handleBloodGroupChange = (event) => {
    setBloodGroup(event.target.value);
  };

  const handleUniversityNameChange = (event) => {
    setSelectUniversity(event.target.value);
  };

  const handleUnionNameChange = (event) => {
    setSelectUnion(event.target.value);
  };

  const onSubmit = async (data) => {
     console.log(data)
    try {
      setLoadingBtn(true);
      data.bloodGroup = bloodGroup;
      data.universityName = selectUniversity;
      data.unionName = selectUnion;

      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("fb_link", data.fb_link);


      formData.append("phone", data.phone);
      if(data.email){
          formData.append("email", data.email);
        }

        
      if(data.bloodGroup){
        formData.append("blood", data.bloodGroup);
      }
      

      if (data.profile_image[0]) {
        const profile_image = data.profile_image[0];
        formData.append("image", profile_image);
      }

      if (showLevel?.level_university) {
        if (!selectUniversity) {
          toast.error("Please Select University");
          setLoadingBtn(false);
          return;
        }
        if (
          selectUniversity === "নির্বাচন করুন" ||
          selectUniversity === ""
        ) {
          toast.error("Please Select University");
          setLoadingBtn(false);
          return;
        }
        formData.append("university", data.universityName);
      }

      if (showLevel?.level_department) {
        formData.append("department", data.department);
      }

      if (showLevel?.level_custom2) {
        formData.append("custom2", data.custom2);
      }

      if (showLevel?.level_custom1) {
        if(data.custom1){
          formData.append("custom1", data.custom1);
        }
      }

      if (showLevel?.level_workplace) {
        if(data.workplace){
          formData.append("workplace", data.workplace);
        }
      }

      if (showLevel?.level_current_address) {
        if(data.current_address){
          formData.append("current_address", data.current_address);
        }
      }

      if (showLevel?.level_union) {
        if (!selectUnion) {
          toast.error("Please Select Union");
          setLoadingBtn(false);
          return;
        }
        if (selectUnion === "নির্বাচন করুন" || selectUnion === "") {
          toast.error("Please Select Union");
          setLoadingBtn(false);
          return;
        }
        formData.append("address_union", data.unionName);
      }

      if (showLevel?.level_permanent_address) {
        if(data.permanent_address){
          formData.append("permanent_address", data.permanent_address);
        }
      }

      if (showLevel?.level_custom3) {
        formData.append("custom3", data.custom3);
      }

      if (showLevel?.level_custom4) {
        formData.append("custom4", data.custom4);
      }

      const response = await axios({
        method: "post",
        url: BASE_URL + "/application",
        data: formData,
        headers: {
          "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
        },
      });
      console.log("response, ", response);
      if (response.status === 200) {
        Swal.fire("Congratulations!", "Registration Successful.", "success");
        setErrorMessage({});
        toast.success("Registration Successful");
        setLoadingBtn(false);
        // router.push("/");
        reset();
      } else {
        setErrorMessage({});
        toast.error("Something went wrong");
        setLoadingBtn(false);
      }
    } catch (error) {
      if (error.response.status === 402) {
        console.log("error", error.response.data.message);
        setErrorMessage(error.response.data.message);
        setLoadingBtn(false);
      } else if (
        error.response.status === 403 ||
        error.response.status === 479 ||
        error.response.status === 456
      ) {
        setLoadingBtn(false);
        setErrorMessage({});
        toast.error(error.response.data.message);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error:", error.message);
      }

      setLoadingBtn(false);
    }
  };

  return (
    <>
      <Head>
        <title>Application::SHREEPUR</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="./shreepur.jpeg" />
      </Head>
      <main>
        <>
          {/* Alumni Details */}
          <Container className="mt-4 mb-5">
            <Row>
              <Col lg={8} md={10} sm={12} className="mx-auto">
                <div className={Style.application}>
                  <div className="headerTitle mb-3">
                    <h3 class="headerTitleMain">সদস্য আবেদন ফরম</h3>
                  </div>
                  <Form onSubmit={handleSubmit(onSubmit)}>
                    <Row>
                      {/* Name */}
                      <Col lg={6} md={6} sm={12}>
                        <Form.Group
                          className={`${Style.contact} mb-3`}
                          controlId="exampleForm.ControlInput1"
                        >
                          <Form.Label className={Style.inputLabel}>
                            নাম <span className="text-danger">*</span>
                          </Form.Label>
                          <Form.Control
                            size="sm"
                            type="text"
                            className={Style.inputField}
                            {...register("name", { required: true })}
                            placeholder="নাম"
                          />
                          {errors.name && (
                            <span className="text-danger">
                              Name is required
                            </span>
                          )}
                        </Form.Group>
                      </Col>

                      {/* Blood Group */}
                      <Col lg={6} md={6} sm={12}>
                        <Form.Group
                          className={`${Style.contact} mb-3`}
                          controlId="exampleForm.ControlInput1"
                        >
                          <Form.Label className={Style.inputLabel}>
                            রক্তের গ্রুপ 
                          </Form.Label>
                          <Form.Select
                            value={bloodGroup}
                            onChange={handleBloodGroupChange}
                            style={{fontSize: '14px'}}
                            aria-label="Default select example"
                            className={`${Style.inputField} ${Style.formSelect}`}
                          >
                            <option>নির্বাচন করুন</option>
                            <option value="A+">A+</option>
                            <option value="B+">B+</option>
                            <option value="AB+">AB+</option>
                            <option value="O+">O+</option>
                            <option value="A-">A-</option>
                            <option value="B-">B-</option>
                            <option value="AB-">AB-</option>
                            <option value="O-">O-</option>
                          </Form.Select>
                        </Form.Group>
                      </Col>

                      {/* Phone Number */}
                      <Col lg={6} md={6} sm={12}>
                        <Form.Group
                          className={`${Style.institute} mb-3`}
                          controlId="exampleForm.ControlInput1"
                        >
                          <Form.Label className={Style.inputLabel}>
                            Phone Number(In English) <span className="text-danger">*</span>
                          </Form.Label>
                          <Form.Control
                            size="sm"
                            type="text"
                            className={Style.inputField}
                            {...register("phone", { required: true })}
                            placeholder="Phone Number(In English)"
                          />
                          {errors.phone && (
                            <span className="text-danger">
                              Phone Number is required
                            </span>
                          )}
                        </Form.Group>
                      </Col>

                      {/* Email */}
                      <Col lg={6} md={6} sm={12}>
                        <Form.Group
                          className={`${Style.contact} mb-3`}
                          controlId="exampleForm.ControlInput1"
                        >
                          <Form.Label className={Style.inputLabel}>
                            E-mail
                          </Form.Label>
                          <Form.Control
                            size="sm"
                            type="email"
                            className={`${Style.inputField} input`}
                            {...register("email")}
                            placeholder="E-mail"
                          />
                        </Form.Group>
                      </Col>

                      {/* Profile Imagge */}
                      <Col lg={6} md={6} sm={12}>
                        <Form.Group
                          className={`${Style.institute} mb-3`}
                          controlId="exampleForm.ControlInput1"
                        >
                          <Form.Label className={Style.inputLabel}>
                            প্রোফাইল ছবি
                          </Form.Label>
                          <Form.Control
                            size="sm"
                            type="file"
                            className={`${Style.inputField} input`}
                            {...register("profile_image")}
                          />
                        </Form.Group>
                      </Col>

                      {/* University */}
                      {showLevel?.level_university && (
                        <Col lg={6} md={6} sm={12}>
                          <Form.Group
                            className={`${Style.contact} mb-3`}
                            controlId="exampleForm.ControlInput1"
                          >
                            <Form.Label className={Style.inputLabel}>
                              {showLevel?.level_university} <span className="text-danger">*</span>
                            </Form.Label>
                            <Form.Select
                              value={selectUniversity}
                              onChange={handleUniversityNameChange}
                              style={{fontSize: '14px'}}
                              aria-label="Default select example"
                              className={`${Style.inputField} ${Style.formSelect}`}
                            >
                              <option>নির্বাচন করুন</option>
                              {universityName?.map((item) => (
                                <option key={item.id} value={item?.dureg}>
                                  {item?.dureg}
                                </option>
                              ))}
                            </Form.Select>
                          </Form.Group>
                        </Col>
                      )}

                      {/* Department */}
                      {showLevel?.level_department && (
                        <Col lg={6} md={6} sm={12}>
                          <Form.Group
                            className={`${Style.contact} mb-3`}
                            controlId="exampleForm.ControlInput1"
                          >
                            <Form.Label className={Style.inputLabel}>
                              {showLevel?.level_department} <span className="text-danger">*</span>
                            </Form.Label>
                            <Form.Control
                              size="sm"
                              type="text"
                              className={`${Style.inputField} input`}
                              {...register("department", {
                                required: true,
                              })}
                              placeholder={showLevel?.level_department}
                            />
                            {errors.department && (
                              <span className="text-danger">
                                {showLevel?.level_department} is required
                              </span>
                            )}
                          </Form.Group>
                        </Col>
                      )}

                      {/* Custom2 */}
                      {showLevel?.level_custom2 && (
                        <Col lg={6} md={6} sm={12}>
                          <Form.Group
                            className={`${Style.contact} mb-3`}
                            controlId="exampleForm.ControlInput1"
                          >
                            <Form.Label className={Style.inputLabel}>
                              {showLevel?.level_custom2} <span className="text-danger">*</span>
                            </Form.Label>
                            <Form.Control
                              size="sm"
                              type="text"
                              className={`${Style.inputField} input`}
                              {...register("custom2", {
                                required: true,
                              })}
                              placeholder={showLevel?.level_custom2}
                            />
                            {errors.custom2 && (
                              <span className="text-danger">
                                {showLevel?.level_custom2} is required
                              </span>
                            )}
                          </Form.Group>
                        </Col>
                      )}

                      {/* Custom1 */}
                      {showLevel?.level_custom1 && (
                        <Col lg={6} md={6} sm={12}>
                          <Form.Group
                            className={`${Style.contact} mb-3`}
                            controlId="exampleForm.ControlInput1"
                          >
                            <Form.Label className={Style.inputLabel}>
                              {showLevel?.level_custom1}
                            </Form.Label>
                            <Form.Control
                              size="sm"
                              type="text"
                              className={`${Style.inputField} input`}
                              {...register("custom1")}
                              placeholder={showLevel?.level_custom1}
                            />
                            {errors.custom1 && (
                              <span className="text-danger">
                                {showLevel?.level_custom1} is required
                              </span>
                            )}
                          </Form.Group>
                        </Col>
                      )}

                      {/* Workplace */}
                      {showLevel?.level_workplace && (
                        <Col lg={6} md={6} sm={12}>
                          <Form.Group
                            className={`${Style.contact} mb-3`}
                            controlId="exampleForm.ControlInput1"
                          >
                            <Form.Label className={Style.inputLabel}>
                              {showLevel?.level_workplace}
                            </Form.Label>
                            <Form.Control
                              size="sm"
                              type="text"
                              className={`${Style.inputField} input`}
                              {...register("workplace")}
                              placeholder={showLevel?.level_workplace}
                            />
                            {errors.workplace && (
                              <span className="text-danger">
                                {showLevel?.level_workplace} is required
                              </span>
                            )}
                          </Form.Group>
                        </Col>
                      )}

                      {/* Current Address */}
                      {showLevel?.level_current_address && (
                        <Col lg={6} md={6} sm={12}>
                          <Form.Group
                            className={`${Style.contact} mb-3`}
                            controlId="exampleForm.ControlInput1"
                          >
                            <Form.Label className={Style.inputLabel}>
                              {showLevel?.level_current_address}
                            </Form.Label>
                            <Form.Control
                              size="sm"
                              type="text"
                              className={`${Style.inputField} input`}
                              {...register("current_address")}
                              placeholder={showLevel?.level_current_address}
                            />
                            {errors.current_address && (
                              <span className="text-danger">
                                {showLevel?.level_current_address} is required
                              </span>
                            )}
                          </Form.Group>
                        </Col>
                      )}

                      {/* Union */}
                      {showLevel?.level_union && (
                        <Col lg={6} md={6} sm={12}>
                          <Form.Group
                            className={`${Style.contact} mb-3`}
                            controlId="exampleForm.ControlInput1"
                          >
                            <Form.Label className={Style.inputLabel}>
                              {showLevel?.level_union} <span className="text-danger">*</span>
                            </Form.Label>
                            <Form.Select
                              value={selectUnion}
                              onChange={handleUnionNameChange}
                              style={{fontSize: '14px'}}
                              aria-label="Default select example"
                              className={`${Style.inputField} ${Style.formSelect}`}
                            >
                              <option>নির্বাচন করুন</option>
                              {unionName?.map((item) => (
                                <option key={item.id} value={item?.id}>
                                  {item?.dureg}
                                </option>
                              ))}
                            </Form.Select>
                          </Form.Group>
                        </Col>
                      )}

                      {/* Permanent Address */}
                      {showLevel?.level_permanent_address && (
                        <Col lg={6} md={6} sm={12}>
                          <Form.Group
                            className={`${Style.contact} mb-3`}
                            controlId="exampleForm.ControlInput1"
                          >
                            <Form.Label className={Style.inputLabel}>
                              {showLevel?.level_permanent_address}
                            </Form.Label>
                            <Form.Control
                              size="sm"
                              type="text"
                              className={`${Style.inputField} input`}
                              {...register("permanent_address")}
                              placeholder={showLevel?.level_permanent_address}
                            />
                          </Form.Group>
                        </Col>
                      )}


                      {/* facebook link  */}
                      <Col lg={6} md={6} sm={12}>
                          <Form.Group
                            className={`${Style.contact} mb-3`}
                            controlId="exampleForm.ControlInput1"
                          >
                            <Form.Label className={Style.inputLabel}>
                              ফেসবুক লিংক

                              {/* {showLevel?.level_permanent_address} */}
                            </Form.Label>
                            <Form.Control
                              size="sm"
                              type="text"
                              className={`${Style.inputField} input`}
                              {...register("fb_link")}
                              placeholder={"ফেসবুক লিংক দিন "}
                            />
                          </Form.Group>
                        </Col>

                      {/* Custom3 */}
                      {showLevel?.level_custom3 && (
                        <Col lg={6} md={6} sm={12}>
                          <Form.Group
                            className={`${Style.contact} mb-3`}
                            controlId="exampleForm.ControlInput1"
                          >
                            <Form.Label className={Style.inputLabel}>
                              {showLevel?.level_custom3}
                            </Form.Label>
                            <Form.Control
                              size="sm"
                              type="text"
                              className={`${Style.inputField} input`}
                              {...register("custom3")}
                              placeholder={showLevel?.level_custom3}
                            />
                            {errors.custom3 && (
                              <span className="text-danger">
                                {showLevel?.level_custom3} is required
                              </span>
                            )}
                          </Form.Group>
                        </Col>
                      )}

                      {/* Custom4 */}
                      {showLevel?.level_custom4 && (
                        <Col lg={6} md={6} sm={12}>
                          <Form.Group
                            className={`${Style.contact} mb-3`}
                            controlId="exampleForm.ControlInput1"
                          >
                            <Form.Label className={Style.inputLabel}>
                              {showLevel?.level_custom4}
                            </Form.Label>
                            <Form.Control
                              size="sm"
                              type="text"
                              className={`${Style.inputField} input`}
                              {...register("custom4")}
                              placeholder={showLevel?.level_custom4}
                            />
                            {errors.custom4 && (
                              <span className="text-danger">
                                {showLevel?.level_custom4} is required
                              </span>
                            )}
                          </Form.Group>
                        </Col>
                      )}
                    </Row>

                    {errorMessage && (
                      <>
                        <ul>
                          {Object.entries(errorMessage).map(
                            ([key, value], index) => (
                              <li key={index}>
                                {Array.isArray(value) ? ( // Check if the property is an array
                                  <ul>
                                    {value.map((item, itemIndex) => (
                                      <li
                                        className="text-danger"
                                        key={itemIndex}
                                      >
                                        {item}
                                      </li>
                                    ))}
                                  </ul>
                                ) : (
                                  value // Render as is for non-array properties
                                )}
                              </li>
                            )
                          )}
                        </ul>
                      </>
                    )}

                    {/* Submit Button */}
                    <div className="d-flex justify-content-center">
                      <Button
                        type="submit"
                        disabled={loadingBtn}
                        className={Style.submit}
                      >
                        {loadingBtn ? "Processing..." : "Submit"}
                      </Button>
                    </div>
                  </Form>
                </div>
              </Col>
            </Row>
          </Container>
        </>
      </main>
    </>
  );
}