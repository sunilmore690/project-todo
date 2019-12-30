module.exports = function(mongoose) {
  const Schema = mongoose.Schema;
  var userSchema = new Schema({
    name: String,
    users: [{ type: Schema.Types.ObjectId, ref: "users" }],
    createdAt: { type: Date },
    createdBy: { type: Schema.Types.ObjectId, ref: "users" },
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
    collectionName: "projects",
    routeOption: {
      middleware: ["auth"] //where auth is function which export in middleware.js
    }
  };
  return userSchema;
};
