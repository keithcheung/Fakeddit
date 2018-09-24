const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql;

const Comment = require('../../models/comment');

const CommentType = new GraphQLObjectType({
  name: 'Comment',
  fields: () => ({
    text: { type: GraphQLString },
    name: { type: GraphQLString },
    uid: { type: GraphQLID },
    id: { type: GraphQLID },
    comments: {
      type: GraphQLList(CommentType),
      resolve(parent, args) {
        // return _.filter(comments, { uid: parent.id });
        return Comment.find({ uid: parent.id });
      }
    }
  })
});

module.exports = CommentType;
