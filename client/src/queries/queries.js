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

const addPost = gql`
  mutation($name: String!, $heading: String!, $text: String!) {
    addPost(name: $name, heading: $heading, text: $text) {
      id
    }
  }
`;
export {
  getPosts,
  getPost,
  getComment,
  addComment,
  removeComment,
  editComment,
  addPost
};
