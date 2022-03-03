https://bitcoin-s.org/docs/oracle/oracle-server


```
curl -s -X GET http://localhost:4000/signatures/

```



fdd868(55400)
96
 30 4254435f70726963655f77696c6c5f62655f75705f61745f323032322d30332d30325430313a31373a32392e3031365a
 ac83a93b89c1b0a1e3ca1cec06f17a7876cf502f9bd5614dfaae8f038d57826b
 0001 4335f257fd4ac7f6f5841057d3a00cecff8c5cdc873644b529bc8cf10ff05ec341508cc3f2ce7ac9620ce6cd210e987f60a8df98026b336f4e8500052522c256
 02 4e6f

fdd86896304254435f70726963655f77696c6c5f62655f75705f61745f323032322d30332d30325430313a31373a32392e3031365aac83a93b89c1b0a1e3ca1cec06f17a7876cf502f9bd5614dfaae8f038d57826b00014335f257fd4ac7f6f5841057d3a00cecff8c5cdc873644b529bc8cf10ff05ec341508cc3f2ce7ac9620ce6cd210e987f60a8df98026b336f4e8500052522c256024e6f



string: a UTF-8 encoded string using NFC for normalization, prefixed by a bigsize value indicating its length in bytes.

[string:event_id]
[x_point:oracle_public_key]
[u16: nb_signatures]
[signature:signature_1]
...
[signature:signature_n]
[string:outcome_1]

ac83a93b89c1b0a1e3ca1cec06f17a7876cf502f9bd5614dfaae8f038d57826b