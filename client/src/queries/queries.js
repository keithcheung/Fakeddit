import { gql } from 'apollo-boost';

const getPosts = gql`
  {
    posts {
      id
      heading
      name
    }
  }
`;

const getPost = gql`
  query($id: ID) {
    post(id: $id) {
      heading
      name
      text
      comments {
        id
      }
    }
  }
`;

const getComment = gql`
  query($id: ID) {
    comment(id: $id) {
      text
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

export { getPosts, getPost, getComment, addComment };
