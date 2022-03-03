### Install
```
```

### Setup 
```
npx prisma migrate reset
npx prisma migrate dev --name init
prisma migrate dev --name added_job_title
```

### Obtain bitcoinscala
```
docker pull bitcoinscala/bitcoin-s-oracle-server:latest
docker run -d -p 9998:9998 -e BITCOIN_S_ORACLE_RPC_PASSWORD=password bitcoinscala/bitcoin-s-oracle-server:latest
```

You can check if the orcale server is running
```
docker exec -it <container name> /bin/bash
curl --data-binary '{"jsonrpc": "1.0", "method": "getpublickey", "params": []}' -H "Content-Type: application/json" -H "Authorization: Basic Your_Credentials" http://127.0.0.1:9998/
```
Basic Credentials is Base64 encode as following format
```
bitcoins:BITCOIN_S_ORACLE_RPC_PASSWORD
```


https://bitcoin-s.org/docs/oracle/oracle-server

```
curl -s -X GET http://localhost:4000/events/

```

```
curl -s -X GET http://localhost:4000/signatures/

```