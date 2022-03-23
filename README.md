# Oracle server
Oracle server is an interface of bitcoin-s-oracle-server and Bitcoin price (BTC/USD)

### Prerequisites

- [Node.js](https://nodejs.org/) Version 14 or higher
- [Docker](https://www.docker.com/) Version 20.10 or higher
  - This is needed to run Bitcoin-S-Oracle

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
https://hub.docker.com/r/bitcoinscala/bitcoin-s-oracle-server/tags?page=1&ordering=last_updated
```
docker pull bitcoinscala/bitcoin-s-oracle-server:latest
docker run -d -p 9998:9998 --restart  unless-stopped -e BITCOIN_S_ORACLE_RPC_PASSWORD=password bitcoinscala/bitcoin-s-oracle-server:latest
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

### Cronjob
Cronjob should be set up to execute the following command so that this Oracle server creates an event every X mins. 
```
node cronjob.js
```
To set crontab
```
*/5 * * * * cd /home/ubuntu/oracle-server && /usr/bin/node cronjob.js h >> /home/ubuntu/logs/oracle-server.log 2>&1
```

### Example
```
curl -s -X GET http://localhost:4000/events
curl -s -X GET http://localhost:4000/events/{eventName}
```

```
curl -s -X GET http://localhost:4000/signatures
```
