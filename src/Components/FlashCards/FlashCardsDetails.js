// this is cards details page
import React, { useEffect } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { TfiBackRight } from "react-icons/tfi";
import { BsCloudDownload } from "react-icons/bs";
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";
import ShareModel from "./ShareModel";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Details_IMG from "./Images/Edit.png.gif";
import { IoIosArrowForward } from "react-icons/io";
import "./FlashCardDetail.css";

const FlashCardsDetails = () => {
  // using useState for adding active class
  const [active, setActive] = useState(0);
  //  it's a function to reassign value to active
  const handleClick = (event) => {
    setActive(event);
  };

  // import useParams hook for catch id of the cards from url
  const { id } = useParams();
  // import useSelector from react-redux and access data from reducer
  const { cards } = useSelector((state) => state.flashCardReducers);
  // using find method  for find card which is selected by the user
  const carddata = cards.find((cards) => cards.id === id);
  // useEffect use for set Enter_Definition & term_uploadimage when carddata change
  useEffect(() => {
    setTermDis(carddata.term[0].Enter_Definition);
    // showing image upload by user if image is not uploaded by user it will be set default image
    setTermImg(
      carddata.term[0].term_uploadimage
        ? carddata.term[0].term_uploadimage
        : Details_IMG
    );
  }, [carddata]);

  // use useState hook to set default image of term_uploadimage if image is not uploaded by user
  const [TermImg, setTermImg] = useState(Details_IMG);
  // use useState hook to set cards image of term_uploadimage
  const [TermDis, setTermDis] = useState("");
  // Setting image and definition on click on next and previous button
  const setCard = (NewIndex) => {
    setTermDis(carddata.term[NewIndex].Enter_Definition);
    setTermImg(
      carddata.term[NewIndex].term_uploadimage
        ? carddata.term[NewIndex].term_uploadimage
        : Details_IMG
    );
  };
  // It's a function for next button
  const nextCard = () => {
    const isLastCard = active === carddata.term.length - 1;
    const NewIndex = isLastCard ? 0 : active + 1;
    setActive(NewIndex);
    setCard(NewIndex);
  };
  // It's a function for previous button
  const prevCard = () => {
    const isFirstSlide = active === 0;
    const NewIndex = isFirstSlide ? carddata.term.length - 1 : active - 1;
    setActive(NewIndex);
    setCard(NewIndex);
  };
  // function for set term image and term definition as well as call the function handelClick
  function displayTermDetails(item, index) {
    setTermImg(item.term_uploadimage ? item.term_uploadimage : Details_IMG);
    setTermDis(item.Enter_Definition);
    handleClick(index);
  }
  // import useNavigate for navigation
  const navigate = useNavigate();
  // using useState for share Button on click share it will be visible
  const [visible, setVisible] = useState(false);
  const onClose = () => {
    setVisible(false);
  };

  return (
    <>
      <div className="pt-3 Main-Box">
        <span className="flex">
          {/* navigate to My Flashcard card page  */}
          <IoMdArrowRoundBack
            onClick={() => navigate(-1)}
            className="text-2xl  m-1 cursor-pointer hover:text-red-600 "
          />
          <span className="font-bold text-xl px-3 ">
            {/* display the name of group */}
            {carddata.Create_Group}
          </span>
        </span>
        <div className="flex flex-wrap pl-11 my-2 pr-4 overflow-hidden ">
          {/* display the description of  group name */}
          {carddata.description}
        </div>
        <div className=" justify-center">
          <div className=" Info_Desc_box   overflow-auto w-64 py-1  my-3  px-3">
            <h1 className="font-bold m-2 ">FlashCard</h1>
            <hr />
            {/* display list of terms and onclick on terms calling the function displayTermDetails and applying active class  */}
            {carddata.term.map((item, index) => {
              return (
                <div
                  key={index}
                  onClick={() => displayTermDetails(item, index)}
                  className="p-2 font-medium "
                >
                  {/* applying active class on the term where you clicked  */}
                  <div className={active === index ? "activeTerm" : undefined}>
                    <IoIosArrowForward className=" icon hidden mr-1" />
                    {item.Enter_Term}
                  </div>
                </div>
              );
            })}
          </div>

          {/* onClick of term it will shows the term image and term description  */}

          {/* This is for Box sizing */}
          <div className="" id="forPrint">
            <div className="FlashCardBox">
              {/* This is for Image sizing */}
              <div className=" h-[270px] flex justify-center items-center w-[240px] sm:w-[240px] md:w-[320px] lg:w-[150px] xl:w-[150px] ">
                {/* This is for Image review */}
                <img src={TermImg} alt="" className="Image" />
              </div>

              <div className="TermDis ">{TermDis}</div>
            </div>

            {/* It's next and previous button to navigate between cards */}
            <div className="flex my-5 justify-center items-center ">
              <MdNavigateBefore
                className="text-5xl cursor-pointer hover:text-[#3366cc]  "
                onClick={prevCard}
              />
              {/* It's showing active cards and number of cards */}
              <span className="ml-7">{active + 1}/</span>
              <span className="mr-7">{carddata.term.length}</span>
              <MdNavigateNext
                className="text-5xl cursor-pointer
              hover:text-[#3366cc] "
                onClick={nextCard}
              />
            </div>
          </div>

          {/* button for share, download, print  */}
          <div className="Share_options">
            <div
              onClick={() => setVisible(true)}
              className="Share  flex cursor-pointer mb-5   hover:scale-105 h-10 p-2 w-[250px]"
            >
              <TfiBackRight className="mx-2 text-2xl " />
              Share FlashCard
            </div>

            <div
              onClick={() => {
                window.print();
              }}
              className="Download flex cursor-pointer mb-5   hover:scale-105 h-10 p-2 w-[250px]"
            >
              <BsCloudDownload className="mx-2 text-2xl " />
              Download FlashCard
            </div>
          </div>
        </div>
      </div>

      <ShareModel onClose={onClose} visible={visible} />
    </>
  );
};

export default FlashCardsDetails;
