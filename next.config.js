module.exports = {
  env: {
    MONGODB_ATLAS_URL:
      "mongodb+srv://admin:admin@booking.5inw8.mongodb.net/bookingdatabase?retryWrites=true&w=majority",
    CLOUDINARY_CLOUD_NAME: "jonathan-choi27",
    CLOUDINARY_API_KEY: "216763921464213",
    CLOUDINARY_API_SECRET: "6M6ybv82bHRZ-e4la49RBbWxCRw",

    SMTP_HOST: "smtp.mailtrap.io",
    SMTP_PORT: 2525,
    SMTP_USER: "1c7cc7673750aa",
    SMTP_PASSWORD: "5567637db2b92e",
    SMTP_FROM_NAME: "XYZBooking",
    SMTP_FROM_EMAIL: "no-reply@xyzbooking.com",

    STRIPE_API_KEY:
      "pk_test_51Iy4ndKTy1LMqwBWmRIK4btk4AQa5m6GP9LwYL0Iq871lH8dznzFm7Oo39AuWuXQxqLJWB3auuuuVMZ9i3bnVGiz00uEIhQQlF",
    STRIPE_SECRET_KEY:
      "sk_test_51Iy4ndKTy1LMqwBWnFJg11yDaCdTipixiMWElKJq7ViqJq7A8fm6GvBKnyVoquDusRGRQQk4S3QBelA7QyFoOHrs00nb9rUKhu",
    STRIPE_WEBHOOK_SECRET: "whsec_tYv8nrMZHeK15gyD1yI4MyTfmU2bxbxq",

    NEXTAUTH_URL: "https://xyzbooking.vercel.app",
  },
  images: {
    domains: ["res.cloudinary.com"],
  },
};
