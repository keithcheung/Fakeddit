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

// const getComment = gql`
//   query($id: ID) {
//     comment
//   }
// `;
export { getPosts, getPost };
