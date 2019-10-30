import { fromEvent, FunctionEvent } from 'graphcool-lib'
import { GraphQLClient } from 'graphql-request'

interface Parent {
  id: string
  name: string
}

export default async (event: FunctionEvent<{}>) => {
  console.log(event)

  try {
    // no logged in parent
    if (!event.context.auth || !event.context.auth.nodeId) {
      return { data: null }
    }

    const parentId = event.context.auth.nodeId
    const graphcool = fromEvent(event)
    const api = graphcool.api('simple/v1')

    // get parent by id
    const parent: Parent = await getParent(api, parentId)
      .then(r => r.Parent)

    // no logged in parent
    if (!parent || !parent.id) {
      return { data: null }
    }

    return { data: { id: parent.id, name: parent.name } }
  } catch (e) {
    console.log(e)
    return { error: 'An unexpected error occured during authentication.' }
  }
}

async function getParent(api: GraphQLClient, id: string): Promise<{ Parent }> {
  const query = `
    query getParent($id: ID!) {
      Parent(id: $id) {
        id
        name
      }
    }
  `

  const variables = {
    id,
//    name
  }

  return api.request<{ Parent }>(query, variables)
}
