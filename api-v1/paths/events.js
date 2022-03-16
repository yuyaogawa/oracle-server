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
    //console.log(announcements.data);
    if (!announcements.data) {
      const error = {
        status: "error",
        message: "Event is not found",
      };
      return res.status(404).json(error);
    }

    res.status(200).json(announcements.data.result.sort().reverse());
  }
  // NOTE: We could also use a YAML string here.
  GET.apiDoc = {
    summary: "Lists all event names",
    operationId: "getEvents",
    parameters: [],
    responses: {
      200: {
        description: "Return event names",
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/Events' },
          },
        },
      },
      404: {
        description: "Event is not found",
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/Error' },
          },
        },
      },
    },
  };
  return operations;
};
