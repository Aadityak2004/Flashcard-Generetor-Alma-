import React, { useRef } from "react";
import { Form, Field, Formik, FieldArray, ErrorMessage } from "formik";
import { MdUploadFile } from "react-icons/md";
import { BsPlus } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import { TiDeleteOutline } from "react-icons/ti";
import { TbEdit } from "react-icons/tb";
import { signUpSchema } from "../../schemas";
import { useDispatch } from "react-redux";
import { createGroup } from "../../Redux/Actions/Index";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Createflashcard.css";

const CreateFlashCards = () => {
  // created a constant value for Image validation
  const SUPPORTED_FORMATS = ["image/jpeg", "image/jpg", "image/png"];
  // import useDispatch for dispatch actions
  const dispatch = useDispatch();
  // import useRef for creating reference on an element
  const inputRef = useRef([]);
  inputRef.current = [];
  // created a function to make focus when clicking on edit button
  const addRefs = (el) => {
    if (el && !inputRef.current.includes(el)) {
      inputRef.current.push(el);
    }
  };
  // created a notification to show image validation
  const imgError = (val) => {
    toast.warn(val, {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };
  return (
    <div>
      {/* Adding a component to show a notification */}
      <ToastContainer />
      {/* created initialValues for form  */}
      <Formik
        initialValues={{
          Create_Group: "",
          uploadimage: null,
          description: "",
          term: [
            {
              Enter_Term: "",
              Enter_Definition: "",
              term_uploadimage: "",
            },
          ],
        }}
        // Adding validation
        validationSchema={signUpSchema}
        // created a onSubmit function
        onSubmit={(values, { resetForm }) => {
          // reset form on submit of form
          resetForm({ values: "" });
          // dispatch action ( createGroup )
          dispatch(createGroup(values));
          // Show notification on a create of flashcard
          toast.success("Creating FlashCard For You ", {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: false,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }}
      >
        {({ values, handleChange, handleBlur, setFieldValue }) => (
          <Form>
            <div className="firstblock p-8 my-2 ">
              <div className="flex flex-wrap">
                <div className=" w-80 px-3">
                  {/* it's a input field for create a group name  */}
                  <label
                    className=" tracking-wide text-gray-900 font-bold"
                    htmlFor="Create_Group"
                  >
                    Group Information
                  </label>
                  <Field
                    className="appearance-none block w-full my-3  text-black border rounded py-2 px-3  
                    focus:outline-none focus:bg-white focus:border-black"
                    id="Create_Group"
                    name="Create_Group"
                    type="text"
                    placeholder="Entre Group Name "
                  />
                  {/* it's a component to show error massage of validation */}
                  <ErrorMessage
                    className="text-[#ff0000]"
                    component="span"
                    name="Create_Group"
                  />
                </div>
                <div>
                  {/* it's a image upload button 
                  if image is present it's shows the image preview with delete icon to delete image
                  if image is not present its shows image uploading button */}
                  {values.uploadimage ? (
                    <div className="flex ">
                      {" "}
                      <img
                        className="h-16 mt-2"
                        src={values.uploadimage}
                        alt=""
                      />{" "}
                      <TiDeleteOutline
                        className="text-3xl text-[#ff0000]"
                        onClick={() => setFieldValue("uploadimage", "")}
                      />{" "}
                    </div>
                  ) : (
                    <label
                      htmlFor="uploadimage"
                      className="Upload_image w-44 h-[40px]  cursor-pointer px-3 mx-3 mt-5 py-1 bg-white flex  items-center 
                      justify-center  rounded"
                    >
                      <MdUploadFile className=" text-[5px] text-cyan-700" />

                      <span className="text-cyan-700 font-bold ">
                        Upload Image Here
                      </span>
                    </label>
                  )}
                  {/* it's input field for image upload */}
                  <input
                    onChange={(event) => {
                      //  it's validation on image
                      if (
                        event.target.files[0] &&
                        !SUPPORTED_FORMATS.includes(event.target.files[0].type)
                      ) {
                        imgError("unsupported file format");
                      } else if (
                        event.target.files[0].size >
                        1024 * 1024 * 10
                      ) {
                        imgError("It's very large file to Upload Here");
                      } else if (
                        event.target.files[0].size <=
                        1024 * 1024 * 10
                      ) {
                        const file = event.target.files[0];
                        const reader = new FileReader();
                        reader.readAsDataURL(file);
                        reader.onload = () => {
                          setFieldValue("uploadimage", reader.result);
                        };
                      }
                    }}
                    className="hidden"
                    name="uploadimage"
                    id="uploadimage"
                    type="file"
                  />
                </div>
                <div className="Description my-4 px-3">
                  <label
                    className=" tracking-wide  text-black-500 font-bold "
                    htmlFor="description"
                  >
                    Description
                  </label>
                  {/* it's a input field for Add description */}
                  <Field
                    as="textarea"
                    id="description"
                    name="description"
                    rows="3"
                    className="block my-3 p-2.5 w-5/6 text-base text-black rounded 
                    focus:border-black focus:bg-white  "
                    placeholder="Write Something Here"
                  ></Field>
                  {/* it's a component to show error massage of validation */}
                  <ErrorMessage
                    className="text-[#ff0000]"
                    component="span"
                    name="description"
                  />
                </div>
              </div>
            </div>
            <FieldArray
              name="term"
              render={(arrayHelpers) => (
                <div className="secondblock">
                  {values.term.map((term, index) => (
                    <div key={index} className="my-5 flex flex-wrap">
                      <div className="flex  items-center justify-center h-9 w-9 my-5 mx-5 rounded-full font-bold text-white bg-gray-700 ">
                        {index + 1}
                      </div>
                      <div className=" w-[390px]  my-3 write_terms">
                        <label
                          className=" 
                         tracking-wide  text-black font-bold "
                          htmlFor={`term.${index}.Enter_Term`}
                        >
                          Write Term
                        </label>
                        {/* it's a input field for Term Name */}
                        <input
                          ref={addRefs}
                          className="appearance-none block w-full my-2  text-black  rounded py-2 px-4 focus:border-black"
                          name={`term.${index}.Enter_Term`}
                          id={`term.${index}.Enter_Term`}
                          value={term.Enter_Term}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          type="text"
                          placeholder="Enter Term Name"
                        />
                        {/* it's a component to show error massage of validation */}
                        <ErrorMessage
                          className="text-[#ff0000]"
                          component="span"
                          name={`term.${index}.Enter_Term`}
                        />
                      </div>
                      <div className=" w-[390px] px-5 my-3 write_defination">
                        <label
                          className=" tracking-wide text-black font-bold "
                          htmlFor={`term.${index}.Enter_Definition`}
                        >
                          Write Defination
                        </label>
                        {/* it's a input field for Add Term Definition */}
                        <Field
                          className="appearance-none block w-full my-2  text-black  rounded py-2 px-4  focus:border-black"
                          id={`term.${index}.Enter_Definition`}
                          name={`term.${index}.Enter_Definition`}
                          value={term.Enter_Definition}
                          type="text"
                          placeholder="Enter Term Definition"
                        />
                        {/* it's a component to show error massage of validation */}
                        <ErrorMessage
                          className="text-[#ff0000]"
                          component="span"
                          name={`term.${index}.Enter_Definition`}
                        />
                      </div>
                      <div className="flex">
                        {/* it's a image upload button 
                          if image is present it's shows the image preview with delete icon to delete image 
                          if image is not present its shows image uploading button */}
                        {term.term_uploadimage ? (
                          <div className="flex  ">
                            {" "}
                            <img
                              className="h-16 mt-2  max-w-[12rem]"
                              src={term.term_uploadimage}
                              alt=""
                            />{" "}
                            <TiDeleteOutline
                              className="text-3xl text-[#ff0000]"
                              onClick={() =>
                                setFieldValue(
                                  `term.${index}.term_uploadimage`,
                                  ""
                                )
                              }
                            />{" "}
                          </div>
                        ) : (
                          <label
                            htmlFor={`term.${index}.term_uploadimage`}
                            className="w-44 h-[38px] cursor-pointer px-3 mx-3 mt-8 py-1 bg-white border-black 
                            flex  items-center justify-center  rounded"
                          >
                            <span className="text-cyan-700 font-bold">
                              Select An Image
                            </span>
                          </label>
                        )}
                        {/* it's a component to show error massage of validation */}
                        <ErrorMessage
                          className="text-red-500"
                          component="span"
                          name={`term.${index}.term_uploadimage`}
                        />
                        {/* it's input field for image upload */}
                        <input
                          onChange={(event) => {
                            //  it's validation on image
                            if (
                              event.target.files[0] &&
                              !SUPPORTED_FORMATS.includes(
                                event.target.files[0].type
                              )
                            ) {
                              imgError("unsupported file format");
                            } else if (
                              event.target.files[0].size >
                              1024 * 1024 * 10
                            ) {
                              imgError("image size is very large");
                            } else if (
                              event.target.files[0].size <=
                              1024 * 1024 * 10
                            ) {
                              const file = event.target.files[0];
                              const reader = new FileReader();
                              reader.readAsDataURL(file);
                              reader.onload = () => {
                                setFieldValue(
                                  `term.${index}.term_uploadimage`,
                                  reader.result
                                );
                              };
                            }
                          }}
                          className="hidden"
                          id={`term.${index}.term_uploadimage`}
                          name={`term.${index}.term_uploadimage`}
                          type="file"
                        />
                        <div>
                          {/* it's a delete button to delete a term with a condition 
                            if there is only one term present you can't delete the term */}
                          {values.term.length <= 1 ? (
                            ""
                          ) : (
                            <MdDelete
                              className="text-[1.8em] m-2 cursor-pointer hover:text-red-500"
                              onClick={() => arrayHelpers.remove(index)}
                            />
                          )}
                          {/* it's a edit button to edit a term */}
                          <TbEdit
                            className="text-[1.8em] text-black m-3 cursor-pointer hover:text-white"
                            onClick={() => {
                              inputRef.current[index].focus();
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                  {/* it's a Add more button to add a new term */}
                  <div
                    onClick={() =>
                      arrayHelpers.insert(values.term.length + 1, {
                        Enter_Term: "",
                        Enter_Definition: "",
                        term_uploadimage: "",
                      })
                    }
                    className="my-3 cursor-pointer mb-3 mx-5 text-black font-bold"
                  >
                    <BsPlus className="inline-block" /> Add Terms
                  </div>
                </div>
              )}
            />
            <div className="h-25 flex  items-center justify-center">
              {/* it's a create button to create a flashcard */}
              <button
                type="submit"
                className="bg-black  hover:bg-gray-700 font-bold py-3 px-7 rounded text-white 
                drop-shadow-md"
              >
                Create Card
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateFlashCards;
