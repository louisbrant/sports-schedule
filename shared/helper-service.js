
const HelperService = {
  removeObjectProperties: (obj, props) => {
    for (var i = 0; i < props.length; i++) {
      if (obj.hasOwnProperty(props[i])) {
        delete obj[props[i]];
      }
    }
    return obj;
  },
  generateRandomNumber: () => {
    return Math.floor(Math.random() * 101);
  }
}

export default HelperService
