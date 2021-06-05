import Booking from "../models/booking";

import ErrorHandler from "../utils/errorHandler";
import catchAsyncErrors from "../middlewares/catchAsyncErrors";

import Moment from "moment";
import { extendMoment } from "moment-range";

const moment = extendMoment(Moment);

// Create New Booking   =>   /api/bookings
export const newBooking = catchAsyncErrors(async (req, res) => {
  const {
    room,
    checkInDate,
    checkOutDate,
    daysOfStay,
    amountPaid,
    paymentInfo,
  } = req.body;

  const booking = await Booking.create({
    room,
    user: req.user._id,
    checkInDate,
    checkOutDate,
    daysOfStay,
    amountPaid,
    paymentInfo,
    paidAt: Date.now(),
  });

  res.status(200).json({
    success: true,
    booking,
  });
});

// Check Booking Availability   =>   /api/bookings/check
export const checkRoomBookingAvailability = catchAsyncErrors(
  async (req, res) => {
    let { roomId, checkInDate, checkOutDate } = req.query;

    checkInDate = new Date(checkInDate);
    checkOutDate = new Date(checkOutDate);

    const bookings = await Booking.find({
      room: roomId,
      $and: [
        {
          checkInDate: {
            $lte: checkOutDate,
          },
        },
        {
          checkOutDate: {
            $gte: checkInDate,
          },
        },
      ],
    });

    const isAvailable = bookings && bookings.length === 0 ? true : false;

    // if (bookings && bookings.length === 0) {
    //   isAvailable = true;
    // } else {
    //   isAvailable = false;
    // }

    res.status(200).json({
      success: true,
      isAvailable,
    });
  }
);

// Check Booked Dates Of A Room   =>   /api/bookings/check-booked-dates
export const checkBookedDatesOfRoom = catchAsyncErrors(async (req, res) => {
  const { roomId } = req.query;

  const bookings = await Booking.find({ room: roomId });

  let bookedDates = [];

  const timeDiffernece = moment().utcOffset() / 60;

  bookings.forEach((booking) => {
    const checkInDate = moment(booking.checkInDate).add(
      timeDiffernece,
      "hours"
    );
    const checkOutDate = moment(booking.checkOutDate).add(
      timeDiffernece,
      "hours"
    );

    const range = moment.range(moment(checkInDate), moment(checkOutDate));

    const dates = Array.from(range.by("day"));
    bookedDates = bookedDates.concat(dates);
  });

  res.status(200).json({
    success: true,
    bookedDates,
  });
});

// Get All Bookings Of Current User   =>   /api/bookings/me
export const myBookings = catchAsyncErrors(async (req, res) => {
  const bookings = await Booking.find({ user: req.user._id })
    .populate({
      path: "room",
      select: "name pricePerNight images",
    })
    .populate({
      path: "user",
      select: "name email",
    });

  res.status(200).json({
    success: true,
    bookings,
  });
});

// Get Booking Details   =>   /api/bookings/:id
export const getBookingDetails = catchAsyncErrors(async (req, res) => {
  const booking = await Booking.findById(req.query.id)
    .populate({
      path: "room",
      select: "name pricePerNight images",
    })
    .populate({
      path: "user",
      select: "name email",
    });

  res.status(200).json({
    success: true,
    booking,
  });
});

// (ADMIN ONLY) Get All Bookings   =>   /api/admin/bookings
export const allAdminBookings = catchAsyncErrors(async (req, res) => {
  const bookings = await Booking.find()
    .populate({
      path: "room",
      select: "name pricePerNight images",
    })
    .populate({
      path: "user",
      select: "name email",
    });

  res.status(200).json({
    success: true,
    bookings,
  });
});

// (ADMIN ONLY) Delete booking   =>   /api/admin/bookings/id
export const deleteBooking = catchAsyncErrors(async (req, res, next) => {
  const booking = await Booking.findById(req.query.id);

  if (!booking)
    return next(new ErrorHandler("Booking not found with this ID", 400));

  await booking.remove();

  res.status(200).json({
    success: true,
  });
});
