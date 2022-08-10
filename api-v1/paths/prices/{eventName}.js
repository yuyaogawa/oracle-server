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

    const prices = await prisma.oracle.findMany({
      where: { eventName: eventName },
    });

    console.log(prices);
    if (prices.length < 1) {
      const error = {
        status: "error",
        message: "This event is not found.",
      };
      return res.status(404).json(error);
    }

    res.status(200).json(prices);
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
