const axios = require("axios");
const options_ticker = {
  method: "POST",
  url: "https://blockchain.info/ticker",
};
const options_oracle = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: "Basic Yml0Y29pbnM6cGFzc3dvcmQ=",
  },
  url: "http://127.0.0.1:9998/",
};

const oracleService = {
  async getPrice() {
    const res = await axios(options_ticker);
    if (res) {
      return res;
    }
  },
  async curlOracle(data) {
    try {
      options_oracle.data = data;
      const res = await axios(options_oracle);
      if (res.status == 200) {
        return res;
      } else {
        console.log(res);
      }
    } catch (err) {
      console.log(err.status);
      console.log(err.response);
    }
  },
};

module.exports = oracleService;
