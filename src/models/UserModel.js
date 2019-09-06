import { BaseModel } from "./BaseModel";

export class UserModel extends BaseModel {
   static resource = 'user';
   constructor(properties) {
       super(properties);
   }
}
