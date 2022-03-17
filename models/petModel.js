const mongoose = require("mongoose");
const { PET_DOG_BREEDS } = require("../server/utils/types");

const petSchema = mongoose.Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    species: { type: String, required: true },
    breed: {
      type: String,
      enum: PET_DOG_BREEDS,
    },
    age: { type: Number, required: true },
    weight: { type: Number, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Pet", petSchema);
