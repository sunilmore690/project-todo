module.exports = function(mongoose) {
  const Schema = mongoose.Schema;
  var userSchema = new Schema({
    title: String,
    content: String,
    project: { type: Schema.Types.ObjectId, ref: "projects" },
    createdAt: { type: Date },
    updatedAt: Date
  });

  userSchema.pre("save", function() {
    if (this.isNew) {
      this.createdAt = new Date();
    } else {
      this.updatedAt = new DataCue();
    }
  });
  userSchema.statics = {
    collectionName: "todos",
    routeOption: {
      middleware: ["auth"] //where auth is function which export in middleware.js
    }
  };
  return userSchema;
};
