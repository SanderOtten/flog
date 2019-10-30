import { fromEvent, FunctionEvent } from 'graphcool-lib'
import { GraphQLClient } from 'graphql-request'
import * as bcrypt from 'bcryptjs'
import * as validator from 'validator'

interface Parent {
  id: string
}

interface EventData {
  email: string
  password: string
  name: string
  dateOfBirth: string
}

const SALT_ROUNDS = 10

export default async (event: FunctionEvent<EventData>) => {
  console.log(event)

  try {
     const graphcool = fromEvent(event)
     const api = graphcool.api('simple/v1')

     const { email, password, name, dateOfBirth } = event.data

     if (!validator.isEmail(email)) {
       return { error: 'Not a valid email' }
     }

     // check if parent exists already
     const parentExists: boolean = await getParent(api, email)
       .then(r => r.Parent !== null)
     if (parentExists) {
       return { error: 'Email already in use' }
     }

     // create password hash
     const salt = bcrypt.genSaltSync(SALT_ROUNDS)
     const hash = await bcrypt.hash(password, SALT_ROUNDS)
     console.log ( 'hash: ' + hash );

     // create new parent
     const parentId = await createParent(api, email, hash, name, dateOfBirth)

     // generate node token for new Parent node
     const token = await graphcool.generateNodeToken(parentId, 'Parent')

     return { data: { id: parentId, token } }
   } catch (e) {
     console.log(e)
     // return { error: 'An unexpected error occured during signup.' }
     return {e}
   }
}

async function getParent(api: GraphQLClient, email: string): Promise<{ Parent }> {
  const query = `
    query getParent($email: String!) {
      Parent(email: $email) {
        id
      }
    }
  `

  const variables = {
    email,
  }

  return api.request<{ Parent }>(query, variables)
}

async function createParent(api: GraphQLClient, email: string, password: string, name: string, dateOfBirth: datetime): Promise<any> {
  const mutation = `
    mutation createParent($email: String!, $password: String!, $name: String!, $dateOfBirth: String!) {
      createParent(
        email: $email,
        password: $password,
        name: $name,
        dateOfBirth: $dateOfBirth
      ) {
        id
      }
    }
  `

  const variables = {
    email,
    password,
    name,
    dateOfBirth
  }

  return api.request<{ createParent: Parent }>(mutation, variables)
    .then(r => r.createParent.id)
}
