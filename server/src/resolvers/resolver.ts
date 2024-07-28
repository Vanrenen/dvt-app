import { deepmerge } from "deepmerge-ts";;
import { userResolvers } from "./userResolver.js";
import { productResolvers } from "./productResolver.js";
import { cartResolvers } from "./cartResolver.js";

export const resolvers = deepmerge([userResolvers, productResolvers, cartResolvers]);
