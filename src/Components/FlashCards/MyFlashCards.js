// this is a MyFlashcard page here rendering the data of users and creating the cards. myflashcard page shows the number of cards created by the users and user can delete cards as well as see the details of cards on the click of view card  button

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import card_logo from "./Images/Gallary.png.gif";
import { MdDelete } from "react-icons/md";
import { deleteGroup } from "../../Redux/Actions/Index";
import './Myflashcard.css'

const MyFlashCards = () => {
  // import useSelector from react-redux and accessing data from reducer
  const flashCard = useSelector((state) => state.flashCardReducers.cards);
  // import useNavigate for navigate the page
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // created a useState for manage  (show more ) button and initializes with 6. when number of cards will be six or more then (show more) button will appear
  const [ShowCards, setShowCards] = useState(6);
  //  this function checking length of cards for (show more) button and set tha initial value of usestate
  const ShowMore = () => {
    setShowCards(flashCard.length);
  };
  //  this function is using for (Show less) button. when we click on show less button this function will set the initial value of useState 6
  const ShowLess = () => {
    setShowCards(6);
  };

  return (
    <>
      {/* when length of card will be zero we show a message => Flashcards Is Not Available. if length of card 1 or more then it will show the cards */}

      {flashCard.length === 0 ? (
        <div className="Create_btn_bg flex flex-col items-center justify-center ">
         
          <div className="Text m-2 font-bold text-xl">
            You Didn't Create A FlashCard
          </div>
          {/* if there is no any flashcards then a button will show which redirects you to the home page (Create flashcard page) */}
          <Link to="/">
            <button
              className=" Create_btn text-center"
            >
              Create From Here
            </button>
          </Link>
        </div>
      ) : null}

{/* ---------------------------------------------------- */}

      <div className="flex flex-wrap space-evenly sm:px-8 md:px-8 lg:px-8 xl:px-8 px-2 ">
        {/* here all the cards will be shown  */}
        {/* we are using slice method for show cards if number of cards is more then 6 it will show only 6 cards until we click on the Show all button */}
        {flashCard.slice(0, ShowCards).map((elem) => {
          return (
            <div
              className="boxs w-[270px] flex hover:scale-105 overflow-hidden my-10 pt-12 "
              key={elem.id}
            >
              <img
                className="Img w-16 h-16 absolute "
                src={elem.uploadimage === null ? card_logo : elem.uploadimage}
                alt="Image_logo
                "
              />

              {/* this is delete button for cards, when we click on the card which we want to delete. it take id and match the cards id */}

              <div className="w-[210px] h-[195px] xl:w-[300px] sm:w-[300px] lg:w-[300px] md:w-[300px] ">
                <MdDelete
                  onClick={() => dispatch(deleteGroup(elem.id))}
                  className="Delete text-[40px] absolute   cursor-pointer"
                />
                <div className="flex flex-col items-center ">
                  {/* showing name of group and group description */}
                  <h5 className="Grp_name mb-2 text-[17px] font-medium  ">
                    {elem.Create_Group}
                  </h5>
                  <span className="Grp_desc my-2 h-12 overflow-hidden text-center">
                    {elem.description}
                  </span>
                  {/* it's shows the number of cards you created */}
                  <span className="Card_No font-bold  text-white"> You've Created {Object.keys(elem.term).length} Cards</span>
                
                  {/* when we click on button (View Cards) it will navigate to particular group detail's card on the basses of card id    */}
                  <button
                    onClick={() => navigate(`/flashcardsdetails/${elem.id}`)}
                    className="Show_btn inline-flex mt-2 items-center px-8 sm:px-12 md:px-12 lg:px-12 xl:px-12 py-2 text-center max-w-xs font-bold  "
                  >
                    Show Card
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* checking length of card and useing ternary operator to show buttons (Show More,Show Less) if 6 cards is available it's show the See all button */}
      {flashCard.length > 6 ? (
        <div className="flex justify-center mr-10">
          {/* if cards length will be more then 6 it will show button (ShowLess) otherwise ShowMore */}
          {ShowCards === flashCard.length ? (
            <button
              onClick={ShowLess}
              className="mb-15 font-bold  cursor-pointer w-24 text-[20px] text-black"
            >
              {" "}
              Show less
            </button>
          ) : (
            <button
              onClick={ShowMore}
              className="mb-15 font-bold  cursor-pointer  text-[20px] text-black "
            >
              {" "}
              Show all FlashCards
            </button>
          )}
        </div>
      ) : null}
    </>
  );
};

export default MyFlashCards;
