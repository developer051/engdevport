import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "กรุณากรอกชื่อ"],
      trim: true,
      maxlength: [50, "ชื่อต้องไม่เกิน 50 ตัวอักษร"],
    },
    lastName: {
      type: String,
      required: [true, "กรุณากรอกนามสกุล"],
      trim: true,
      maxlength: [50, "นามสกุลต้องไม่เกิน 50 ตัวอักษร"],
    },
    department: {
      type: String,
      required: [true, "กรุณาเลือกแผนก"],
      enum: [
        "Computer Science",
        "Data Science",
        "Artificial Intelligence",
        "Software Engineering",
        "Information Technology",
        "Cybersecurity",
        "Agency",
        "Telemarketing",
        "Marketing",
        "Sales",
        "Customer Service",
        "HR",
        "Finance",
        "Legal",
        "Risk Management",
        "Business Development",
        "Project Management",

        "Other",
      ],
    },
    email: {
      type: String,
      required: [true, "กรุณากรอกอีเมล"],
      unique: true,
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "กรุณากรอกอีเมลให้ถูกต้อง",
      ],
    },
    password: {
      type: String,
      required: [true, "กรุณากรอกรหัสผ่าน"],
      minlength: [6, "รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร"],
    },
    score: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Hash password before saving
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Compare password method
UserSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Get full name
UserSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`;
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
