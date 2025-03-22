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
  const [sessionName, setSessionName] = useState([]);
  const [selectUniversity, setSelectUniversity] = useState("");
  const [selectSession, setSelectSession] = useState("");
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


 

  // Get All University Name
  useEffect(() => {
    axios.get("https://amaderthikana.com/api/usasreepur/university").then((res) => {
      setUniversityName(res.data.data);
    });
  }, []);
  // Get All University Name
  useEffect(() => {
    axios.get("https://amaderthikana.com/api/usasreepur/session_category").then((res) => {
      setSessionName(res.data.data);
    });
  }, []);

  // Get All Union Name
  useEffect(() => {
    axios.get("https://amaderthikana.com/api/usasreepur/batch_category").then((res) => {
      setUnionName(res.data.data);
    });
  }, []);

  const handleBloodGroupChange = (event) => {
    setBloodGroup(event.target.value);
  };

  const handleUniversityNameChange = (event) => {
    setSelectUniversity(event.target.value);
  };
  const handleSessionNameChange = (event) => {
    setSelectSession(event.target.value);
  };

  const handleUnionNameChange = (event) => {
    setSelectUnion(event.target.value);
  };

  const onSubmit = async (data) => {
   
    try {
      setLoadingBtn(true);
      data.bloodGroup = bloodGroup;
      data.universityName = selectUniversity;
      data.unionName = selectUnion;

      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("university_id", selectUniversity);
      formData.append("fb_link", data.fb_link);
      formData.append("committeeunit_id", 78);
      formData.append("category_id", 288);
      formData.append("phone", data.phone);
      formData.append("email", data.email);
      formData.append("blood", data.bloodGroup);
      formData.append("member_password", "Member264@");

      if (data.profile_image[0]) {
        const profile_image = data.profile_image[0];
        formData.append("profile_image", profile_image);
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


      formData.append("session_id", selectSession);
      formData.append("occupation", data.occupation);
      formData.append("about_self", data.about_self);
      formData.append("organization", data.organization);


      formData.append("batch_id", selectUnion);

      formData.append("village", data.village);


      formData.append("affiliation", data.affiliation);



      console.log("form data details: ", formData);

      const response = await axios({
        method: "post",
        url: "https://amaderthikana.com/api/usasreepur/application_memebr",
        data: formData,
        headers: {
          "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
        },
      });
      console.log("response, ", response);
      if (response.data.status === 200) {
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
                            style={{ fontSize: '14px' }}
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
                            E-mail<span className="text-danger">*</span>
                          </Form.Label>
                          <Form.Control
                            size="sm"
                            type="email"
                            className={`${Style.inputField} input`}
                            {...register("email")}
                            placeholder="E-mail"
                            required
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

                      <Col lg={6} md={6} sm={12}>
                        <Form.Group
                          className={`${Style.contact} mb-3`}
                          controlId="exampleForm.ControlInput1"
                        >
                          <Form.Label className={Style.inputLabel}>
                            বিশ্ববিদ্যালয় <span className="text-danger">*</span>
                          </Form.Label>
                          <Form.Select
                            value={selectUniversity}
                            onChange={handleUniversityNameChange}
                            style={{ fontSize: '14px' }}
                            aria-label="Default select example"
                            className={`${Style.inputField} ${Style.formSelect}`}
                          >
                            <option>নির্বাচন করুন</option>
                            {universityName?.map((item) => (
                              <option key={item.id} value={item?.id}>
                                {item?.university_name}
                              </option>
                            ))}
                          </Form.Select>
                        </Form.Group>
                      </Col>


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

                      <Col lg={6} md={6} sm={12}>
                        <Form.Group
                          className={`${Style.contact} mb-3`}
                          controlId="exampleForm.ControlInput1"
                        >
                          <Form.Label className={Style.inputLabel}>
                            সেশন <span className="text-danger">*</span>
                          </Form.Label>
                          <Form.Select
                            value={selectSession}
                            onChange={handleSessionNameChange}
                            style={{ fontSize: '14px' }}
                            aria-label="Default select example"
                            className={`${Style.inputField} ${Style.formSelect}`}
                          >
                            <option>নির্বাচন করুন</option>
                            {sessionName?.map((item) => (
                              <option key={item.id} value={item?.id}>
                                {item?.session_name}
                              </option>
                            ))}
                          </Form.Select>
                        </Form.Group>
                      </Col>



                      <Col lg={6} md={6} sm={12}>
                        <Form.Group
                          className={`${Style.contact} mb-3`}
                          controlId="exampleForm.ControlInput1"
                        >
                          <Form.Label className={Style.inputLabel}>
                            পদবি ও কর্মস্থল
                          </Form.Label>
                          <Form.Control
                            size="sm"
                            type="text"
                            className={`${Style.inputField} input`}
                            {...register("occupation")}
                            placeholder={"পদবি ও কর্মস্থল"}
                          />
                          {errors.custom1 && (
                            <span className="text-danger">
                              {showLevel?.level_custom1} is required
                            </span>
                          )}
                        </Form.Group>
                      </Col>


                      {/* Workplace */}

                      <Col lg={6} md={6} sm={12}>
                        <Form.Group
                          className={`${Style.contact} mb-3`}
                          controlId="exampleForm.ControlInput1"
                        >
                          <Form.Label className={Style.inputLabel}>
                            শখ
                          </Form.Label>
                          <Form.Control
                            size="sm"
                            type="text"
                            className={`${Style.inputField} input`}
                            {...register("about_self")}
                            placeholder={"শখ "}
                          />
                          {errors.about_self && (
                            <span className="text-danger">
                              {showLevel?.about_self} is required
                            </span>
                          )}
                        </Form.Group>
                      </Col>


                      {/* Current Address */}

                      <Col lg={6} md={6} sm={12}>
                        <Form.Group
                          className={`${Style.contact} mb-3`}
                          controlId="exampleForm.ControlInput1"
                        >
                          <Form.Label className={Style.inputLabel}>
                            হলের নাম
                          </Form.Label>
                          <Form.Control
                            size="sm"
                            type="text"
                            className={`${Style.inputField} input`}
                            {...register("organization")}
                            placeholder={"হলের নাম"}
                          />
                          {errors.organization && (
                            <span className="text-danger">
                              {showLevel?.organization} is required
                            </span>
                          )}
                        </Form.Group>
                      </Col>



                      <Col lg={6} md={6} sm={12}>
                        <Form.Group
                          className={`${Style.contact} mb-3`}
                          controlId="exampleForm.ControlInput1"
                        >
                          <Form.Label className={Style.inputLabel}>
                            ইউনিয়ন/পৌরসভা <span className="text-danger">*</span>
                          </Form.Label>
                          <Form.Select
                            value={selectUnion}
                            onChange={handleUnionNameChange}
                            style={{ fontSize: '14px' }}
                            aria-label="Default select example"
                            className={`${Style.inputField} ${Style.formSelect}`}
                          >
                            <option>নির্বাচন করুন</option>
                            {unionName?.map((item) => (
                              <option key={item.id} value={item?.id}>
                                {item?.batch_name}
                              </option>
                            ))}
                          </Form.Select>
                        </Form.Group>
                      </Col>



                      <Col lg={6} md={6} sm={12}>
                        <Form.Group
                          className={`${Style.contact} mb-3`}
                          controlId="exampleForm.ControlInput1"
                        >
                          <Form.Label className={Style.inputLabel}>
                            গ্রামের নাম
                          </Form.Label>
                          <Form.Control
                            size="sm"
                            type="text"
                            className={`${Style.inputField} input`}
                            {...register("village")}
                            placeholder={"গ্রামের নাম"}
                          />
                        </Form.Group>
                      </Col>



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


                      <Col lg={6} md={6} sm={12}>
                        <Form.Group
                          className={`${Style.contact} mb-3`}
                          controlId="exampleForm.ControlInput1"
                        >
                          <Form.Label className={Style.inputLabel}>
                            ঊষা কার্যনির্বাহী কমিটি/শাখা কমিটিতে পদবি (যদি থাকে)
                          </Form.Label>
                          <Form.Control
                            size="sm"
                            type="text"
                            className={`${Style.inputField} input`}
                            {...register("affiliation")}
                            placeholder={"ঊষা কার্যনির্বাহী কমিটি/শাখা কমিটিতে পদবি (যদি থাকে)"}
                          />
                          {errors.affiliation && (
                            <span className="text-danger">
                              {showLevel?.affiliation} is required
                            </span>
                          )}
                        </Form.Group>
                      </Col>

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