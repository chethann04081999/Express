import { User } from "./entity/User"

export const resolvers = {
    Query:{
        users:()=>{
            return User
        }

    },
    Mutation:{

    }

}