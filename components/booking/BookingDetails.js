import React, { useEffect } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";

import { toast } from "react-toastify";

import { clearErrors } from "../../redux/actions/roomActions";

const BookingDetails = () => {
  const dispatch = useDispatch();

  const { booking, error } = useSelector((state) => state.bookingDetails);
  const { user } = useSelector((state) => state.loadedUser);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch]);

  const isPaid =
    booking.paymentInfo && booking.paymentInfo.status === "paid" ? true : false;

  return (
    <div className="container">
      <div className="row d-flex justify-content-between">
        <div className="col-12 col-lg-8 mt-5 booking-details">
          {booking && booking.room && booking.user && (
            <>
              <h4 className="mb-4">Booking Information</h4>
              <p>
                <b>Name:</b> {booking.user && booking.user.name}
              </p>
              <p>
                <b>Email:</b> {booking.user && booking.user.email}
              </p>
              <p>
                <b>Check In:</b>{" "}
                {new Date(booking.checkInDate).toLocaleString("en-AU")}
              </p>
              <p>
                <b>Check Out:</b>{" "}
                {new Date(booking.checkOutDate).toLocaleString("en-AU")}
              </p>
              <p>
                <b>Days of Stay:</b> {booking.daysOfStay}
              </p>
              <p>
                <b>Amount:</b> ${booking.amountPaid}
              </p>
              <p>
                <b>Payment Status:</b>{" "}
                <b className={isPaid ? "greenColor" : "redColor"}>
                  {isPaid ? "Paid" : "Not Paid"}
                </b>
              </p>

              {user && user.role === "admin" && (
                <>
                  <p>
                    <b>Stripe Payment ID:</b>{" "}
                    <b className="redColor">{booking.paymentInfo.id}</b>
                  </p>
                </>
              )}

              <p>
                <b>Reference ID: </b> {booking._id}
              </p>

              <hr />

              <h4>Booked Room:</h4>

              <div className="cart-item">
                <div className="row my-4">
                  <div className="col-4 col-lg-2">
                    <Image
                      className="rounded"
                      src={booking.room.images[0].url}
                      alt={booking.room.name}
                      height={100}
                      width={150}
                    />
                  </div>

                  <div className="col-5 col-lg-5">
                    <Link href={`/room/${booking.room._id}`}>
                      {booking.room.name}
                    </Link>
                  </div>

                  <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                    <p>${booking.room.pricePerNight}</p>
                  </div>

                  <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                    <p>{booking.daysOfStay} Day(s)</p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingDetails;
