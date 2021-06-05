import easyinvoice from "easyinvoice";

export const downloadInvoice = async (booking) => {
  const data = {
    documentTitle: "Booking INVOICE",
    currency: "AUD",
    taxNotation: "gst",
    marginTop: 25,
    marginRight: 25,
    marginLeft: 25,
    marginBottom: 25,
    logo: "https://res.cloudinary.com/jonathan-choi27/image/upload/v1622645679/xyzbooking/logo/booking_logo_enzowr.png",
    sender: {
      company: "XYZ Booking Company",
      address: "11 Example Street",
      zip: "",
      city: "Sydney 2000",
      country: "Australia",
    },
    client: {
      company: `${booking.user.name}`,
      address: `${booking.user.email}`,
      zip: "",
      city: `Check In: ${new Date(booking.checkInDate).toLocaleString(
        "en-AU"
      )}`,
      country: `Check In: ${new Date(booking.checkOutDate).toLocaleString(
        "en-AU"
      )}`,
    },
    invoiceNumber: `${booking._id}`,
    invoiceDate: `${new Date(Date.now()).toLocaleString("en-AU")}`,
    products: [
      {
        quantity: `${booking.daysOfStay}`,
        description: `${booking.room.name}`,
        tax: 0,
        price: booking.room.pricePerNight,
      },
    ],
    bottomNotice:
      "This is auto generated Invoice of your booking on XYZ Booking.",
  };

  const result = await easyinvoice.createInvoice(data);
  easyinvoice.download(`invoice_${booking._id}.pdf`, result.pdf);
};
