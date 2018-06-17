import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLFloat,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull
} from 'graphql';

import Db from './db';

const Product = new GraphQLObjectType({
  name: 'Product',
  description: 'This represents a Product',
  fields: () => {
    return {
      id: {
        type: GraphQLInt,
        resolve (product) {
          return product.id;
        }
      },
      price: {
        type: GraphQLFloat,
        resolve (product) {
          return product.price;
        }
      },
      name: {
        type: GraphQLString,
        resolve (product) {
          return product.name;
        }
      },
      description: {
        type: GraphQLString,
        resolve (product) {
          return product.description;
        }
      },
      imageUrl: {
        type: GraphQLString,
        resolve (product) {
          return product.imageUrl;
        }
      }
    };
  }
});





const Query = new GraphQLObjectType({
  name: 'Query',
  description: 'Root query object',
  fields: () => {
    return {
      products: {
        type: new GraphQLList(Product),
        resolve (root, args) {
          return Db.models.product.findAll({ where: args });
        }
      }
    };
  }
});

const Mutation = new GraphQLObjectType({
  name: 'Mutations',
  description: 'Functions to set stuff',
  fields () {
    return {
      addProduct: {
        type: Product,
        args: {
          price :{
            type: GraphQLFloat
          },
          name: {
            type: GraphQLString
          },
          description: {
            type: GraphQLString
          },
          imageUrl: {
            type: GraphQLString
          }
        },
        resolve (source, args) {
          return Db.models.product.create({
            price: args.price,
            name: args.name,
            description: args.description,
            imageUrl: args.imageUrl
          });
        }
      }
    };
  }
});

const Schema = new GraphQLSchema({
  query: Query,
  mutation: Mutation
});

export default Schema;
