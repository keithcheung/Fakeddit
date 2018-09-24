const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql;

const PostType = require('./PostType');

const Post = require('../../models/post');
// @ UserType
// - name: username
// - id: id of the user
// - posts: [PostType], posts made by this user
const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    posts: {
      type: new GraphQLList(PostType),
      resolve(parent, args) {
        // Matches posts based on username
        // return _.filter(posts, { name: parent.name });
        console.log(parent.name);
        return Post.find({ name: parent.name });
      }
    }
  })
});

module.exports = UserType;
