// const data = require("./sites.json");
const axios = require("axios");
const sendingMail = require("./Email.js");
const getData = async () => {
  const data = await axios
    .get(
      "https://s3.ap-southeast-1.amazonaws.com/tudotech.in/files/SiteChecker.json"
    )
    .then((res) => res.data);
  //   console.log(data);
  return data;
};

const checking = ({ website_url, mail_id }) => {
  (function checkInterval() {
    axios
      .get(
        `https://site-checker-tudo.herokuapp.com/check?Website=${website_url}`
      )
      .then((result) => {
        const data = result.data;
        // console.log(data);
        if (!data.status) {
          sendingMail(website_url, mail_id, data.message);
            // console.log(website_url, mail_id, data.message);
        } else console.log("what", data);
      });
    setTimeout(checkInterval, 3 * 60 * 1000);
  })();
};

const callingFunction = async () => {
  const data = await getData();
  //   console.log("data", data);
  data.map((items) => {
    checking(items);
  });
};
callingFunction();
