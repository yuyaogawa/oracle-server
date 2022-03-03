const tlv = require("lightning-tlv");
const BigSize = tlv.BigSize;

// TLV in DLC is described the link below
// https://github.com/discreetlogcontracts/dlcspecs/blob/master/Messaging.md

const tlvUtil = {
  async getSigfromTlv(tlvStream) {
    const s = Buffer.from(tlvStream, "hex");
    let serialization = s;

    // Type (55400)
    let bigSize = BigSize.parse(serialization);
    let bigintValue = bigSize.value;
    let regularValue = Number(bigintValue);
    let length = bigSize.length; // the parser knows where the BigSize portion ends

    // Length of data
    serialization = s.slice(length);
    console.log(serialization);
    bigSize = BigSize.parse(serialization);
    bigintValue = bigSize.value;
    regularValue = Number(bigintValue);
    length = bigSize.length;

    // Length of contract id(string)
    serialization = serialization.slice(length);
    console.log(serialization);
    bigSize = BigSize.parse(serialization);
    bigintValue = bigSize.value;
    regularValue = Number(bigintValue);
    length = bigSize.length;

    serialization = serialization.slice(regularValue + length + 32 + 2);
    const signature = serialization.toString("hex").substring(0, 128);
    //console.log(signature);

    return signature;
  },
};

module.exports = tlvUtil;
