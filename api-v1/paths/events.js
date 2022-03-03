const oracleService = require("../services/oracleService");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
module.exports = function () {
  const operations = {
    GET,
  };
  async function GET(req, res, next) {
    const listannouncements = `{"jsonrpc": "1.0", "method": "listannouncements", "params": []}`;
    const announcements = await oracleService.curlOracle(listannouncements);
    console.log(announcements.data);
    if (!announcements.data) {
      const error = {
        status: "error",
        message: "This hashX is not found.",
      };
      return res.status(200).json(error);
    }

    res.status(200).json(announcements.data.result);
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
