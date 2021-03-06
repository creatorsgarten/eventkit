import { EventStatus, createEvent } from '../../src'

describe('Event Defaults', () => {
  it('should create an event in draft state', () => {
    const event = createEvent({
      title: 'EventKit Meetup',
      type: 'meetup',
      datetime: { start: new Date(), end: new Date() },
    })

    expect(event).toHaveProperty('id')
    expect(event.status).toBe(EventStatus.Draft)
  })
})
