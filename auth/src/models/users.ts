import mongoose from "mongoose";
import { Password } from "../services/password";

// Interface describing what attributes we need to create a new User.
interface UserAttrs {
  email: string;
  password: string;
}

// Interface that describe properties that our User document has
// By adding this doc info, we can do "user.email" when we create a
// new user.
interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
}

// Interface that describe what extra methods will be in Mongoose Model
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    // When mongo object is sent in response from server, it calls "toJSON" method of mongo.
    // By default it returns everything we inserted along with __v (version number) and _id (identified for documents).
    // The following will override that function.
    // NOTE: This only applies when response is sent from server. When server is using this object, it will still have _id, __v, etc in it.
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);

// We want to hash our password before storing it into DB
// Do not use "() =>". Following strucutre allows us to access instance's "this"
// Using "this" in "() =>" will override instance "this" with current docuement
// Modified returns true even when we just crated the entry.
userSchema.pre("save", async function (done) {
  if (this.isModified("password")) {
    const hashed = await Password.toHash(this.get("password"));
    this.set("password", hashed);
  }

  done();
});

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

export { User };
