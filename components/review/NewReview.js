import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

import { toast } from "react-toastify";

import {
  newReview,
  checkReviewAvailability,
  clearErrors,
} from "../../redux/actions/roomActions";
import { NEW_REVIEW_RESET } from "../../redux/constants/roomConstants";

const NewReview = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const { error, success } = useSelector((state) => state.newReview);
  const { reviewAvailable } = useSelector((state) => state.checkReview);

  const { id } = router.query;

  useEffect(() => {
    if (error) {
      toast.error(error.message);
      dispatch(clearErrors());
    }

    if (success) {
      toast.success("Review posted successfully");
      dispatch({ type: NEW_REVIEW_RESET });
    }

    if (id !== undefined) dispatch(checkReviewAvailability(id));
  }, [dispatch, success, error, id]);

  const submitHandler = () => {
    const reviewData = {
      rating,
      comment,
      roomId: id,
    };

    dispatch(newReview(reviewData));
  };

  function setUserRatings() {
    const stars = document.querySelectorAll(".star");

    stars.forEach((star, index) => {
      star.starValue = index + 1;

      ["click", "mouseover", "mouseout"].forEach(function (e) {
        star.addEventListener(e, showRatings);
      });
    });

    function showRatings(e) {
      stars.forEach((star, index) => {
        if (e.type === "click") {
          if (index < this.starValue) {
            star.classList.add("yellow");
            setRating(this.starValue);
          } else {
            star.classList.remove("yellow");
          }
        }

        if (e.type === "mouseover") {
          if (index < this.starValue) {
            star.classList.add("light-blue");
          } else {
            star.classList.remove("light-blue");
          }
        }

        if (e.type === "mouseout") star.classList.remove("light-blue");
      });
    }
  }

  return (
    <>
      {reviewAvailable && (
        <button
          id="review_btn"
          type="button"
          className="btn btn-primary mt-4 mb-5"
          data-toggle="modal"
          data-target="#ratingModal"
          onClick={setUserRatings}
        >
          Submit Review
        </button>
      )}

      <div
        className="modal fade"
        id="ratingModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="ratingModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="ratingModalLabel">
                Submit Review
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body d-block ml-auto mr-auto">
              <ul className="stars">
                <li className="star">
                  <i className="fa fa-star"></i>
                </li>
                <li className="star">
                  <i className="fa fa-star"></i>
                </li>
                <li className="star">
                  <i className="fa fa-star"></i>
                </li>
                <li className="star">
                  <i className="fa fa-star"></i>
                </li>
                <li className="star">
                  <i className="fa fa-star"></i>
                </li>
              </ul>
            </div>
            <div className="modal-body">
              <textarea
                name="review"
                id="review"
                className="form-control"
                value={comment}
                rows="5"
                placeholder="We are interested in your review :)"
                onChange={(e) => setComment(e.target.value)}
              ></textarea>

              <button
                className="btn my-3 float-right review-btn px-4 text-white"
                data-dismiss="modal"
                aria-label="Close"
                onClick={submitHandler}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewReview;
