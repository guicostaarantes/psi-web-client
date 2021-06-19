module.exports = async () => {
  // this makes test results independent of client node timezone
  process.env.TZ = "UTC";
};
