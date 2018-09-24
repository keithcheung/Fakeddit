import { gql } from 'apollo-boost';

const getPosts = gql`
  {
    posts {
      id
      text
    }
  }
`;

export { getPosts };
