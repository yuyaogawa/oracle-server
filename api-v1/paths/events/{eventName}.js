const oracleService = require("../../services/oracleService");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
module.exports = function () {
  const operations = {
    GET,
  };
  async function GET(req, res, next) {
    const eventName = req.params.eventName;
    console.log(eventName);
    const getannouncement = `{"jsonrpc": "1.0", "method": "getannouncement", "params": ["${eventName}"]}`;
    const announcement = await oracleService.curlOracle(getannouncement);
    console.log(announcement.data);
    if (announcement.data.result == null) {
      const error = {
        status: "error",
        message: "This event is not found.",
      };
      return res.status(200).json(error);
    }

    res.status(200).json(announcement.data.result);
  }
  // NOTE: We could also use a YAML string here.
  GET.apiDoc = {
    summary: "Get data",
    operationId: "GetData",
    parameters: [
      {
        in: "path",
        name: "eventName",
        required: true,
        schema: { $ref: "#/components/schemas/eventName" },
      },
    ],
    responses: {
      200: {
        description: "Return data",
      },
    },
  };
  return operations;
};
