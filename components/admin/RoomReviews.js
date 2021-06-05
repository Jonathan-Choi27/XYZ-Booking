import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { toast } from "react-toastify";
import { MDBDataTable } from "mdbreact";

import {
  getRoomReviews,
  deleteReview,
  clearErrors,
} from "../../redux/actions/roomActions";
import { DELETE_REVIEW_RESET } from "../../redux/constants/roomConstants";

const RoomReviews = () => {
  const dispatch = useDispatch();

  const [roomId, setRoomId] = useState("");

  const { error, reviews } = useSelector((state) => state.roomReviews);
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.review
  );

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      toast.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      toast.success("Review deleted successfully");
      dispatch({ type: DELETE_REVIEW_RESET });
    }
  }, [dispatch, error, deleteError, isDeleted]);

  const setReviews = () => {
    const data = {
      columns: [
        {
          label: "Review ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "Rating",
          field: "rating",
          sort: "asc",
        },
        {
          label: "Comment",
          field: "comment",
          sort: "asc",
        },
        {
          label: "User",
          field: "user",
          sort: "asc",
        },

        {
          label: "Actions",
          field: "actions",
          sort: "asc",
        },
      ],
      rows: [],
    };

    reviews &&
      reviews.forEach((review) => {
        data.rows.push({
          id: review._id,
          rating: review.rating,
          comment: review.comment,
          user: review.name,
          actions: (
            <button
              className="btn btn-danger mx-2"
              onClick={() => deleteReviewHandler(review._id)}
            >
              <i className="fa fa-trash"></i>
            </button>
          ),
        });
      });

    return data;
  };

  const deleteReviewHandler = (id) => {
    dispatch(deleteReview(id, roomId));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(getRoomReviews(roomId));
  };

  return (
    <div className="container container-fluid">
      <div className="row justify-content-center mt-5">
        <div className="col-5">
          <form onSubmit={submitHandler}>
            <div className="form-group">
              <label htmlFor="roomId_field">Enter Room ID</label>
              <input
                type="text"
                id="roomId_field"
                className="form-control"
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="btn update-btn btn-block mt-4 mb-3"
            >
              Search
            </button>
          </form>
        </div>
      </div>
      <hr />
      {reviews && reviews.length > 0 ? (
        <MDBDataTable
          data={setReviews()}
          className="px-3"
          bordered
          striped
          hover
        />
      ) : null}
    </div>
  );
};

export default RoomReviews;
