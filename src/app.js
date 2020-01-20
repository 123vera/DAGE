export const dva = {
  namespacePrefixWarning: false,
  config: {
    onError(err) {
      err.preventDefault();
      console.error(err.message);
    },
  },
};
