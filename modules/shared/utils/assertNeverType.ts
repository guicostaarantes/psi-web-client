const assertNeverType = (x: never) => {
  throw new Error(`Expected never, received ${x}`);
};

export default assertNeverType;
