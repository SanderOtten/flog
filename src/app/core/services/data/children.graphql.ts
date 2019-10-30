import { Child } from '../../types/types';
import gql from 'graphql-tag'

export const ALL_CHILDREN_QUERY = gql`
  query AllChildrenQuery {
    allChildren {
      id
      name
      dateOfBirth
      createdAt
      parents {
        id
        name
        email
        dateOfBirth
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
`;

export interface AllChildrenQueryResponse {
  allChildren: Child[];
  loading: boolean;
}

export const THIS_CHILD_QUERY = gql`
  query ThisChildQuery ($id: ID!) {
    allChildren(filter: {
      OR: [{
        id: $id
      }]
    }) {
      id
      name
      createdAt
      parents {
        id
        name
        email
        dateOfBirth
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
`;

export interface ThisChildQueryResponse {
  allChildren: Child;
  loading: boolean;
}

export const CREATE_CHILD_MUTATION = gql`
  mutation CreateChildMutation($name: String!, $dateOfBirth: String!, $parentids: [ID!]) {
    createChild(
      name: $name,
      dateOfBirth: $dateOfBirth,
      parentsIds: $parentids
    ) {
      id
    }
  }
`;

export interface CreateChildMutationResponse {
  loading: boolean;
  createChild: Child;
}

export const UPDATE_CHILD_MUTATION = gql`
  mutation UpdateChildMutation($id: ID!, $name: String!, $dateOfBirth: String!, $parentids: [ID!]) {
    updateChild (
      id: $id,
      name: $name,
      dateOfBirth: $dateOfBirth,
      parentsIds: $parentids
    ) {
      id
      name
      dateOfBirth
    }
  }
`;

export interface UpdateChildMutationResponse {
  updateChild: Child;
  loading: boolean;
}

export const DELETE_CHILD_MUTATION = gql`
  mutation DeleteChildMutation($id: ID!) {
    deleteChild (
      id: $id
    ) {
      id
      name
      dateOfBirth
    }
  }
`;

export interface DeleteChildMutationResponse {
  deleteChild: Child;
  loading: boolean;
}
