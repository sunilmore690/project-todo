module.exports = function(mongoose) {
  const Schema = mongoose.Schema;
  var userSchema = new Schema({
    name: String,
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "developer"], default: "developer" },
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
    collectionName: "users",
    routeOption: {
      middleware: ["auth",'authorize'] //where auth is function which export in middleware.js
    }
  };
  return userSchema;
};
