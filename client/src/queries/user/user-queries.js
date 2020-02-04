import { gql } from 'apollo-boost';

const signInUser = gql`
  mutation($username: String!, $password: String!) {
    signInUser(username: $username, password: $password) {
      id
    }
  }
`;

const addUser = gql`
  mutation($username: String!, $password: String!) {
    addUser(username: $username, password: $password) {
      id
    }
  }
`;

const findUserName = gql`
  query($id: ID) {
    user(id: $id) {
      username
    }
  }
`;

export {
    signInUser,
    addUser,
    findUserName
};
