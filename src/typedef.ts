import { gql } from "apollo-server-express";

export const typeDefs= gql `
type User {
    id:ID!
    firstName:string!
    lastName:string!
    age:int!
    email:string!
}

type Query{
users:[User!]!
user(id:ID!):User
}

type Mutation {

}
`