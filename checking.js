const data = require("./sites.json");
const axios = require("axios");
const checking = (url) => {
  setInterval(() => {
    axios
      .get(`http://localhost:5000/check?Website=${url}`)
      .then((result) => console.log(result.data));
  }, 10000);
};

const callingFunction = () => {
  data.map((items) => {
    checking(items.website_url);
  });
};
callingFunction();
