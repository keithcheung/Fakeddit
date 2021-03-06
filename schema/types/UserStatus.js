const graphql = require('graphql');
const { GraphQLObjectType, GraphQLID } = graphql;

// @ UserType
// - name: username
// - id: id of the user
// - posts: [PostType], posts made by this user
const UserStatus = new GraphQLObjectType({
  name: 'UserStatus',
  fields: () => ({
    id: { type: GraphQLID }
  })
});

module.exports = UserStatus;
