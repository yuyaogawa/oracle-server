# Oracle server
Oracle server is an interface of bitcoin-s-oracle-server and Bitcoin price (BTC/USD)

### Install
```
git clone {this repo}
cd oracle-server
npm install
```
### Configure

```
cp .env.example .env
```

```
npx prisma migrate reset
npx prisma migrate dev --name init
prisma migrate dev --name added_job_title
```

### Obtain bitcoinscala
https://bitcoin-s.org/docs/oracle/oracle-server
```
docker pull bitcoinscala/bitcoin-s-oracle-server:latest
docker run -d -p 9998:9998 -e BITCOIN_S_ORACLE_RPC_PASSWORD=password bitcoinscala/bitcoin-s-oracle-server:latest
```

You can check if the orcale server is running
```
docker exec -it <container name> /bin/bash
curl --data-binary '{"jsonrpc": "1.0", "method": "getpublickey", "params": []}' -H "Content-Type: application/json" -H "Authorization: Basic Yml0Y29pbnM6cGFzc3dvcmQ=" http://127.0.0.1:9998/
```
Basic Credentials is Base64 encode as following format
```
bitcoins:BITCOIN_S_ORACLE_RPC_PASSWORD
```

### Run
```
npm start
```

### Example
```
curl -s -X GET http://localhost:4000/events
curl -s -X GET http://localhost:4000/events/{eventName}
```

```
curl -s -X GET http://localhost:4000/signatures
```