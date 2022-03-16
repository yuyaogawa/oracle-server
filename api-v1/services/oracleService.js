const axios = require("axios");
require("dotenv").config();

const creds = Buffer.from(
  "bitcoins:" + process.env.BITCOIN_S_ORACLE_RPC_PASSWORD
).toString("base64");
const options_ticker = {
  method: "POST",
  url: process.env.TICKER_SERVER,
};
const options_oracle = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: "Basic " + creds,
  },
  url: process.env.BITCOIN_S_ORACLE_SERVER,
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
