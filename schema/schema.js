const graphql = require('graphql');
const _ = require('lodash');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLList
} = graphql;

var users = [
  { name: 'keithcheung', id: '1' },
  { name: 'jdizzle', id: '2' },
  { name: 'ironman', id: '3' }
];

var posts = [
  {
    name: 'keithcheung',
    heading: 'What it takes',
    text: 'A lot of work',
    date: Date.now(),
    id: '4'
  },
  {
    name: 'keithcheung',
    heading: 'Where to go',
    date: Date.now(),
    text: 'Cali or bust',
    id: '5'
  },
  {
    name: 'jdizzle',
    heading: 'What to do?',
    date: Date.now(),
    text: 'Sleep or cook :)',
    id: '6'
  }
];

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
        return _.filter(posts, { name: parent.name });
      }
    }
  })
});

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
    comments: {
      type: new GraphQLList(CommentType),
      resolve(parent, args) {
        // Match comments based on parent id
        return _.filter(comments, { uid: parent.id });
      }
    }
  })
});

// @ CommentType
// - id: the id of THIS comment
// - uid: the id of the comment/post this refers to
// - name: the name of the user who posted this comment
// - text: text of the actual comment
// - comments: [CommentType] of this comment
var comments = [
  { id: '7', uid: '4', name: 'jdizzle', text: 'What the heck' },
  { id: '8', uid: '7', name: 'keithcheung', text: 'What?' }
];
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
        return _.filter(comments, { uid: parent.id });
      }
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // code to get data
        return _.find(users, { id: args.id });
      }
    },

    users: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        return users;
      }
    },

    post: {
      type: PostType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(posts, { id: args.id });
      }
    },

    posts: {
      type: new GraphQLList(PostType),
      resolve(parent, args) {
        return posts;
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
