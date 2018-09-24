const graphql = require('graphql');
const _ = require('lodash');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull
} = graphql;

const User = require('../models/user');
const Post = require('../models/post');
const Comment = require('../models/comment');

const UserType = require('./types/UserType');
const PostType = require('./types/PostType');
const CommentType = require('./types/CommentType');

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // code to get data
        // return _.find(users, { id: args.id });
        return User.findById(args.id);
      }
    },

    users: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        return User.find({});
      }
    },

    post: {
      type: PostType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Post.findById(args.id);
      }
    },

    posts: {
      type: new GraphQLList(PostType),
      resolve(parent, args) {
        return Post.find({});
      }
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    // addAuthor to database
    addUser: {
      type: UserType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, args) {
        // From the model
        let user = new User({
          name: args.name
        });
        // Check if there are duplicates
        // mutation returns the data saved, this is where you'd save it to redux
        return user.save();
      }
    },
    addPost: {
      type: PostType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        header: { type: new GraphQLNonNull(GraphQLString) },
        text: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, args) {
        const { name, header, text } = args;
        const post = new Post({
          name,
          header,
          text
        });

        return post.save();
      }
    },
    addComment: {
      type: CommentType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        uid: { type: new GraphQLNonNull(GraphQLString) },
        text: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, args) {
        const { name, uid, text } = args;
        const comment = new Comment({
          name,
          uid,
          text
        });

        return comment.save();
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
