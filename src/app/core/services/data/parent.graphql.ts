import { Parent } from '../../types/types';
import gql from 'graphql-tag'

export const ALL_PARENTS_QUERY = gql`
  query AllParentsQuery {
    AllParents {
      id
      name
      email
      dateOfBirth
      createdAt
    }
  }
`;

export interface AllParentsQueryResponse {
  allParents: Parent[];
  loading: boolean;
}

export const THIS_PARENT_QUERY = gql`
  query ThisParentQuery ($id: ID!) {
    allParents(filter: {
      OR: [{
        id: $id
      }]
    }) {
      id
      name
      email
      dateOfBirth
      createdAt
      children {
        id
        name
        dateOfBirth
        parents {
          id
          name
          email
          dateOfBirth
          createdAt
        }
        posts {
          id
          about {
            name
            dateOfBirth
          }
          author {
            name
            email
            dateOfBirth
          }
          title
          text
          createdAt
          updatedAt
        }
      }
    }
  }
`;

export interface ThisParentQueryResponse {
  allParents: Parent;
  loading: boolean;
}

export const CREATE_PARENT_MUTATION = gql`
  mutation CreateParentMutation($name: String!, $email: String!, $password: String!, $dateOfBirth: String!) {
    signupParent(
      name: $name,
      email: $email,
      password: $password
      dateOfBirth: $dateOfBirth
    ) {
      id
    }

    authenticateParent(
      email: $email,
      password: $password
    ) {
      token
      id
      name
    }
  }
`;

export interface CreateParentMutationResponse {
  loading: boolean;
  createParent: Parent;
  authenticateParent: {
    token: string,
    id?: string,
    name?: string,
    //user?: User
  };
}

export const SIGNIN_PARENT_MUTATION = gql`
  mutation SigninParentMutation($email: String!, $password: String!) {
    authenticateParent(
      email: $email,
      password: $password
    ) {
      token
      id
      name
    }
  }
`;

export interface SigninParentMutationResponse {
  loading: boolean;
  authenticateParent: {
    token: string,
    id?: string,
    name?: string,
  };
}

export const UPDATE_PARENT_MUTATION = gql`
  mutation UpdateParentMutation($id: ID!, $name: String!, $email: String!, $dateOfBirth: String!) {
    updateParent (
      id: $id,
      name: $name,
      email: $email,
      dateOfBirth: $dateOfBirth
    ) {
      id
      name
      email
      dateOfBirth
    }
  }
`;

export interface UpdateParentMutationResponse {
  updateParent: Parent;
  loading: boolean;
}

export const DELETE_PARENT_MUTATION = gql`
  mutation DeleteParentMutation($id: ID!) {
    deleteParent (
      id: $id
    ) {
      id
      name
      email
      dateOfBirth
    }
  }
`;

export interface DeleteParentMutationResponse {
  deleteParent: Parent;
  loading: boolean;
}
