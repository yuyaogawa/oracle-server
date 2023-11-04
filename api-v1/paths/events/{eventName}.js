const oracleService = require("../../services/oracleService");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
module.exports = function () {
  const operations = {
    GET,
  };
  async function GET(req, res, next) {
    let eventName = req.params.eventName;
    //console.log(eventName);
    if (eventName == "latest") {
      const listannouncements = `{"jsonrpc": "1.0", "method": "listannouncements", "params": []}`;
      const announcements = await oracleService.curlOracle(listannouncements);
      eventName = (announcements.data.result.sort().reverse()[0]);
    }
    const getannouncement = `{"jsonrpc": "1.0", "method": "getannouncement", "params": ["${eventName}"]}`;
    const announcement = await oracleService.curlOracle(getannouncement);
    //console.log(announcement.data);
    if (announcement.data.result == null) {
      const error = {
        status: "error",
        message: "This event is not found.",
      };
      return res.status(404).json(error);
    }

    res.status(200).json(announcement.data.result);
  }
  // NOTE: We could also use a YAML string here.
  GET.apiDoc = {
    summary: "Get an event's details",
    operationId: "getEvent",
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
        description: "Return an event's details",
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/Event' },
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
