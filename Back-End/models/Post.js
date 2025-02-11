import mongoose from "mongoose";
const BlogPost = mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, default: "Anonymous" },
  tags: { type: [String], default: [] },
  image:{type:String },
  createdAt: { type: Date, default: Date.now },
  createdBy:{type:mongoose.Schema.Types.ObjectId, ref:"users"}
});
export default mongoose.model("BlogPost", BlogPost);
