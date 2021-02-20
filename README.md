## Introduction

This repository contains an example for a streaming application implemented in [Apache Flink](https://flink.apache.org/).

There are 3 components of this application: 
1. **Producer**: produces streaming data and publishes it to the stream
1. **Streaming**: [Apache Kafka](https://kafka.apache.org/) stream
1. **Consumer**: consumes the Kafka stream and executes the business logic in Apache Flink

## Producer
The producer uses the freely available [Coinbase websocket](https://docs.pro.coinbase.com/#overview34) data to retrieve real-time Bitcoin trading market data.
I chose this dataset because it is freely available, no registration/API key needed and the API limits are acceptable for testing purposes.
The producer subscribes to level 2 real-time market data using the Coinbase websocket API, and publishes all messages received to the Streaming component.

## Streaming

The streaming component is an Apache Kafka stream, with very basic configuration.


## Consumer

The consumer is an Apache Flink application implemented in Java. Currently the logic is very simple: it counts the number of transactions every 15 seconds and prints it out to the console.

## Execute

### Prerequisites

Make sure you have `docker` and `docker-compose` installed on your system.

### Execute the application

```
$ git clone https://github.com/nagyf/coinbase-kafka-flink-streaming.git
$ cd coinbase-kafka-flink-streaming
$ docker-compose up
```
