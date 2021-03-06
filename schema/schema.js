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
const UserStatus = require('./types/UserStatus');
const PostType = require('./types/PostType');
const CommentType = require('./types/CommentType');
const bcrypt = require('bcrypt');

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
    },

    comment: {
      type: CommentType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Comment.findById(args.id);
      }
    },

    user: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return User.findById(args.id);
      }
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    // addAuthor to database
    addUser: {
      type: UserStatus,
      args: {
        username: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, args) {
        let user = new User({
          username: args.username,
          password: bcrypt.hashSync(args.password, 10)
        });
        debugger;
        return user.save();
      }
    },

    signInUser: {
      type: UserStatus,
      args: {
        username: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) }
      },
      async resolve(parent, args) {
        const user = await User.findOne({ username: args.username });
        if (!user) return null;
        if (bcrypt.compareSync(args.password, user.password)) {
          return user;
        } else {
          return null;
        }
      }
    },

    addPost: {
      type: PostType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        heading: { type: new GraphQLNonNull(GraphQLString) },
        text: { type: new GraphQLNonNull(GraphQLString) },
        uid: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parent, args) {
        const { name, heading, text, uid } = args;
        const post = new Post({
          name,
          heading,
          text,
          uid,
          upvotes: 0
        });

        return post.save();
      }
    },
    addComment: {
      type: CommentType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        uid: { type: new GraphQLNonNull(GraphQLID) },
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
    },

    removeComment: {
      type: CommentType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parent, args) {
        return Comment.findOneAndRemove({ _id: args.id });
      }
    },

    editComment: {
      type: CommentType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        text: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, args) {
        return Comment.findOneAndUpdate({ _id: args.id }, { text: args.text });
      }
    },

    removePost: {
      type: PostType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parent, args) {
        return Post.findOneAndRemove({ _id: args.id });
      }
    },

    editPost: {
      type: PostType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        heading: { type: new GraphQLNonNull(GraphQLString) },
        text: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, args) {
        return Post.findOneAndUpdate(
          { _id: args.id },
          { text: args.text, heading: args.heading }
        );
      }
    },

    upvotePost: {
      type: PostType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parent, args) {
        return Post.findOneAndUpdate(
          { _id: args.id },
          { $inc: { upvotes: 1 } }
        );
      }
    },

    downvotePost: {
      type: PostType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parent, args) {
        return Post.findOneAndUpdate(
          { _id: args.id },
          { $inc: { upvotes: -1 } }
        );
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
