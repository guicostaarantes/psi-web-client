module.exports = async () => {
  // this makes test results independent of client node timezone
  process.env.TZ = "America/Lima";

  process.env.NEXT_PUBLIC_PSI_STATIC_URI = "https://www.google.com/static";
};
