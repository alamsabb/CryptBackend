const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    default: 100,
  },
  referalNumber: {
    type: String,
    default: null,
    required: true,
  },
  walletNumber: {
    //crypto wallet
    type: String,
    unique: true,
    default: () => uuidv4(), // Use a function to generate a new value
  },
  verification: {
    type: String,
    default: "VERIFICATION PENDING",
  },
  transferWalletNumber: {
    type: String,
    required: true,
  },
  roi: {
    type: Number,
    default: 5,
  },
  totalIntrest: {
    type: Number,
    default: 0,
  },
});

// Ensure walletNumber uniqueness before saving
userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isNew) {
    while (true) {
      const existingUser = await mongoose.models.User.findOne({
        walletNumber: user.walletNumber,
      });
      if (!existingUser) break;

      // Regenerate walletNumber if duplicate found
      user.walletNumber = uuidv4();
    }
  }

  next();
});

module.exports = mongoose.model("User", userSchema);
