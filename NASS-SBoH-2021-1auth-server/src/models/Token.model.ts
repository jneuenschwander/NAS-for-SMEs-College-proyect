import mongoose, { Model, Schema } from 'mongoose';
import { IToken } from '../interfaces';
import {tokenType} from '../utils'
import '../config/dotenv';
import bycrypt from 'bcrypt';
/**
 * @category Model
 * @name TokenSchema
 * @description Schema of token restore
 */
const TokenSchema: Schema<IToken> = new Schema({
  email: {type: String, required:true, unique: true},
  hashKey: {type:String},
  createdAt: { type: Date,  default: Date.now }
});
/**
 * @description Index with time to live, after one hour de document will be remove
 */
TokenSchema.index({createdAt: 1},{expireAfterSeconds: 3600});

/**
 * @description Compare the hash with email and date of restore token
 * @param {string} email Email of user
 * @param {Date} iat Date of restore token
 */
TokenSchema.methods.isValidToken = async function (email:string, iat:Date) {
  const token = this;
  console.log(iat);

  const compare = await bycrypt.compare(email+'-'+iat,this.hashKey);
  return compare;
}

const Token: Model<IToken> = mongoose.model('Token', TokenSchema);
export default Token;
