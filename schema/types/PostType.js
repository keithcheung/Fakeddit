const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
  GraphQLInt
} = graphql;

const CommentType = require('./CommentType');

const Comment = require('../../models/comment');
// @ PostType
// - id: the id of the post
// - name: the name of the user who posted
// - heading: The Post header
// - text: text of the actual post
// - comments: [CommentType] of this post

const PostType = new GraphQLObjectType({
  name: 'Post',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    heading: { type: GraphQLString },
    date: { type: GraphQLString },
    text: { type: GraphQLString },
    upvotes: { type: GraphQLInt },
    uid: { type: GraphQLID },
    comments: {
      type: new GraphQLList(CommentType),
      resolve(parent, args) {
        // Match comments based on parent id
        // return _.filter(comments, { uid: parent.id });
        return Comment.find({ uid: parent.id });
      }
    }
  })
});

module.exports = PostType;
