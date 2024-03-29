const oracleService = require("./api-v1/services/oracleService");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {

  let current_price = await oracleService.getPrice();
  current_price = current_price.data.last;
  console.log(current_price);

  const current = new Date();
  const x_minutes_from_now = current.getTime() + 300000; //300sec(5mins)
  const outcomes = '"Yes", "No"';
  const maturationtime = new Date(x_minutes_from_now).toISOString(); //in ISO 8601 format
  const eventName = `BTC_price_will_be_up_at_${maturationtime}_[${current_price}]` // + maturationtime;
  let outcome = "";

  const createenumannouncement = `{"jsonrpc": "1.0", "id": "curltest", "method": "createenumannouncement", "params": ["${eventName}", "${maturationtime}", [${outcomes}]]}`;
  const getannouncement = `{"jsonrpc": "1.0", "id": "curltest", "method": "getannouncement", "params": ["${eventName}"]}`;

  const res1 = await oracleService.curlOracle(createenumannouncement);
  //console.log(res1);
  const res2 = await oracleService.curlOracle(getannouncement);
  //console.log(res2);

  const max = await prisma.oracle.aggregate({
    _max: { id: true },
  });

  // FIXME: databases in oracle-server and bitcoin-s-oracle have to be same recode
  let last_price = 0;
  if (max._max.id > 0) {
    last_price = await prisma.oracle.findUnique({
      where: { id: max._max.id },
    });
  }

  console.log(last_price);
  if (parseInt(last_price.strikePrice) < current_price) {
    console.log("Yes");
    const outcome = "Yes";
    const signenum = `{"jsonrpc": "1.0", "id": "curltest", "method": "signenum", "params": ["${last_price.eventName}", "${outcome}"]}`;
    const res3 = await oracleService.curlOracle(signenum);
    if (res3.data.result) {
      console.log(res3.data.result);
    }
  } else if (parseInt(last_price.strikePrice) >= current_price) {
    console.log("No");
    const outcome = "No";
    const signenum = `{"jsonrpc": "1.0", "id": "curltest", "method": "signenum", "params": ["${last_price.eventName}", "${outcome}"]}`;
    const res3 = await oracleService.curlOracle(signenum);
    if (res3.data.result) {
      console.log(res3.data.result);
    }
  }

  try {
    if (max._max.id > 0) {
      const update = await prisma.oracle.update({
        where: { id: max._max.id },
        data: { closedPrice: current_price.toString() },
      });
    }
    const create = await prisma.oracle.create({
      data: { strikePrice: current_price.toString(),
              eventName: eventName },
    });
  } catch (err) {
    console.log(err);
  }
}

main();
