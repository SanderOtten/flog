import { fromEvent, FunctionEvent } from 'graphcool-lib'
import { GraphQLClient } from 'graphql-request'
import * as bcrypt from 'bcryptjs'

interface Parent {
  id: string
  name: string
  email: string
  password: string
}

interface EventData {
  email: string
  password: string
}

const SALT_ROUNDS = 10

export default async (event: FunctionEvent<EventData>) => {
  console.log(event)

  try {
    const graphcool = fromEvent(event)
    const api = graphcool.api('simple/v1')

    const { email, password } = event.data

    // get parent by email
    const parent: Parent = await getParentByEmail(api, email)
      .then(r => r.Parent)

    // no parent with this email
    if (!parent) {
      return { error: 'Invalid parent credentials!' }
    }

    // check password
    const passwordIsCorrect = await bcrypt.compare(password, parent.password)
    // const passwordIsCorrect = password === parent.password
    if (!passwordIsCorrect) {
      return { error: 'Invalid password credentials!' }
    }

    // generate node token for existing parent node
    const token = await graphcool.generateNodeToken(parent.id, 'Parent')

    return { data: { id: parent.id, name: parent.name, token} }
  } catch (e) {
    console.log(e)
    return { error: 'An unexpected error occured during authentication. ' + e }
  }
}

async function getParentByEmail(api: GraphQLClient, email: string): Promise<{ Parent }> {
  const query = `
    query getParentByEmail($email: String!) {
      Parent(email: $email) {
        id
        name
        password
      }
    }
  `

  const variables = {
    email,
  }

  return api.request<{ Parent }>(query, variables)
}
