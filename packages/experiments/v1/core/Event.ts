import {v4} from 'uuid'
import {Extension} from '@eventkit/core'

import {ExtensionManager} from './ExtensionManager'

import {parseNaturalDate} from '../utils/natural-date'
import {IEvent, EventStatus, ICreateEventInput} from '../@types/IEvent'

export class Event {
  data: IEvent
  extension = new ExtensionManager(this)

  get state() {
    const data = {...this.data}

    for (const ext of this.extension.extensions) {
      ext.id
    }

    return data
  }

  constructor(input: ICreateEventInput) {
    this.data = {
      ...input,
      id: v4(),
      status: EventStatus.Draft,
      when: parseNaturalDate(input.when),
    }
  }

  use = (extension: Extension) => this.extension.use(extension)

  setStatus(status: EventStatus) {
    this.data.status = status
    this.extension.emit(status)
  }

  publish() {
    this.setStatus(EventStatus.Published)
  }
}

export const createEvent = (data: ICreateEventInput): Event => new Event(data)