import { gql } from 'apollo-boost';

const getPosts = gql`
  {
    posts {
      id
      heading
      text
      upvotes
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
      uid
      comments {
        id
      }
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

export {
    getPosts,
    getPost,
    addPost,
    editPost,
    removePost,
    upvotePost,
    downvotePost,
};
