import { gql } from 'apollo-boost';

const getPosts = gql`
  {
    posts {
      id
      heading
      text
      upvotes
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
      upvotes
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
  mutation($name: String!, $heading: String!, $text: String!, $uid: ID!) {
    addPost(name: $name, heading: $heading, text: $text, uid: $uid) {
      id
    }
  }
`;

const removePost = gql`
  mutation($id: ID!) {
    removePost(id: $id) {
      id
    }
  }
`;

const editPost = gql`
  mutation($id: ID!, $heading: String!, $text: String!) {
    editPost(id: $id, heading: $heading, text: $text) {
      id
    }
  }
`;

const upvotePost = gql`
  mutation($id: ID!) {
    upvotePost(id: $id) {
      id
      upvotes
    }
  }
`;

const downvotePost = gql`
  mutation($id: ID!) {
    downvotePost(id: $id) {
      id
      upvotes
    }
  }
`;

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

export {
  getPosts,
  getPost,
  getComment,
  addComment,
  removeComment,
  editComment,
  addPost,
  editPost,
  removePost,
  upvotePost,
  downvotePost,
  signInUser,
  addUser
};
