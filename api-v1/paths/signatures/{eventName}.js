const oracleService = require("../../services/oracleService");
const tlv = require("../../utils/tlvUtil");
const { PrismaClient } = require("@prisma/client");
const tlvUtil = require("../../utils/tlvUtil");
const prisma = new PrismaClient();
module.exports = function () {
  const operations = {
    GET,
  };
  async function GET(req, res, next) {
    const eventName = req.params.eventName;
    console.log(eventName);
    const getsignatures = `{"jsonrpc": "1.0", "method": "getsignatures", "params": ["${eventName}"]}`;
    const signatures = await oracleService.curlOracle(getsignatures);
    console.log(signatures.data);
    if (signatures.data.result == null) {
      const error = {
        status: "error",
        message: "This event is not found",
      };
      return res.status(404).json(error);
    }
    const signature = await tlvUtil.getSigfromTlv(signatures.data.result);
    const result = {
      signatures: signature
    }
    res.status(200).json(result);
  }
  // NOTE: We could also use a YAML string here.
  GET.apiDoc = {
    summary: "Get signatures",
    operationId: "getSignatures",
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
        description: "Return signatures",
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/Signatures' },
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
