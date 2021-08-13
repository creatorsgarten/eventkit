import {Client} from '@notionhq/client'

import {Event} from '@eventkit/core'
import {NotionExtension, INotionContext} from '@eventkit/extensions'

export const mockEvent = () =>
  new Event({
    title: 'GraphQL Meetup 10.0',
    type: 'meetup',
    when: ['19 August', '20 August'],
    online: true,
  })

export function mockNotionPlugin() {
  const context: INotionContext = {
    client: new Client({baseUrl: 'mock'}),

    getUsers: async () => [
      {
        id: 'ok',
        type: 'person',
        object: 'user',
        name: 'Phoomparin Mano',
        person: {email: 'poom@hey.com'},
      },
    ],
  }

  const extension = new NotionExtension()
  extension.ctx = context

  return extension
}