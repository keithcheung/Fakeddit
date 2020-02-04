import { gql } from 'apollo-boost';

const getComment = gql`
  query($id: ID) {
    comment(id: $id) {
      text
      uid
      id
      comments {
        id
      }
    }
  }
`;

const addComment = gql`
  mutation($name: String!, $uid: ID!, $text: String!) {
    addComment(name: $name, uid: $uid, text: $text) {
      name
      id
    }
  }
`;

const removeComment = gql`
  mutation($id: ID!) {
    removeComment(id: $id) {
      uid
      id
    }
  }
`;

const editComment = gql`
  mutation($id: ID!, $text: String!) {
    editComment(id: $id, text: $text) {
      text
    }
  }
`;

export {
    getComment,
    addComment,
    removeComment,
    editComment,
};
