import Redis from 'ioredis'
import { Injectable } from '@nestjs/common'
import { RedisPubSub } from 'graphql-redis-subscriptions'

import { InMemoryLiveQueryStore } from '@n1ru4l/in-memory-live-query-store'

import { Topics } from '../@types/topics'

const REDIS_URL = process.env.REDIS_URL

@Injectable()
export class PubSubService {
  redisClient = new Redis(`${REDIS_URL}`)

  pubsub = new RedisPubSub({
    publisher: this.redisClient,
    subscriber: this.redisClient,
  })

  store = new InMemoryLiveQueryStore()

  publish<T extends keyof Topics>(topic: T, payload: Topics[T]) {
    return this.pubsub.publish(topic, { [topic]: payload })
  }

  asyncIterator<T extends keyof Topics>(topic: T) {
    return this.pubsub.asyncIterator(topic)
  }
}
