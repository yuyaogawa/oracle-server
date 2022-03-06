const oracleService = require("../services/oracleService");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
module.exports = function () {
  const operations = {
    GET,
  };
  async function GET(req, res, next) {
    const getpublickey = `{"jsonrpc": "1.0", "method": "getpublickey", "params": []}`;
    const publickey = await oracleService.curlOracle(getpublickey);
    console.log(publickey.data);
    if (!publickey.data) {
      const error = {
        status: "error",
        message: "publickey is not found.",
      };
      return res.status(200).json(error);
    }

    res.status(200).json(publickey.data.result);
  }
  // NOTE: We could also use a YAML string here.
  GET.apiDoc = {
    summary: "Get data",
    operationId: "GetData",
    parameters: [],
    responses: {
      200: {
        description: "Return data",
      },
    },
  };
  return operations;
};
