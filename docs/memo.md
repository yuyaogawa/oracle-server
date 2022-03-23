### Operation
bitcoin-oracle-s only provides API that lists all events.
Oracle data should be deleted on a regular basis. Otherwise, the server will be overloaded to response event list.
```
# Query in bitcoin-oracle-s' database below
$ docker exec -it [container_id] /bin/bash
$ cd /home/bitcoin-s/.bitcoin-s/oracle
$ sqlite3 oracle.sqlite
> delete from events where maturation_time < CAST((julianday('now', '-1 day') - 2440587.5)*86400000 AS INTEGER);
```

To get oracle database
```
docker cp [container_id]:/home/bitcoin-s/.bitcoin-s/oracle/oracle.sqlite ./
```