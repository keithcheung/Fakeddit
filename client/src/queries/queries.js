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

export { getPosts };
