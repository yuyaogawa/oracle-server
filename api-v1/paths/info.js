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
        message: "Publickey is not found",
      };
      return res.status(404).json(error);
    }

    res.status(200).json(publickey.data.result);
  }
  // NOTE: We could also use a YAML string here.
  GET.apiDoc = {
    summary: "Get Oracle's public key",
    operationId: "getOraclePubkey",
    parameters: [],
    responses: {
      200: {
        description: "Return Oracle's public key",
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/OraclePubkey' },
          },
        },
      },
      404: {
        description: "Publickey is not found",
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
