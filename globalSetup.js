module.exports = async () => {
  // this makes test results independent of client node timezone
  process.env.TZ = "America/Lima";
};
