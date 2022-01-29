const data = require("./sites.json");
const axios = require("axios");
const sendingMail = require("./Email.js");

const checking = ({ website_url, mail_id }) => {
  setInterval(() => {
    axios
      .get(`http://localhost:5000/check?Website=${website_url}`)
      .then((result) => {
        const data = result.data;
        if (!data.status) {
          sendingMail(mail_id);
        } else console.log(data);
      });
  }, 10000);
};

const callingFunction = () => {
  data.map((items) => {
    checking(items);
  });
};
callingFunction();
