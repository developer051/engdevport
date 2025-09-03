import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema(
  {
    // ใช้ originalId เพื่อเก็บ id จาก JSON database เดิม
    originalId: {
      type: String,
      unique: true,
      required: true,
    },
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
    loginName: {
      type: String,
      required: [true, "กรุณากรอกชื่อผู้ใช้"],
      unique: true,
      lowercase: true,
      trim: true,
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
        "Underwriting and Claims",
        "HR",
        "Finance",
        "Legal",
        "Risk Management",
        "Business Development",
        "Project Management",
        "Administration",
        "Other",
      ],
    },
    password: {
      type: String,
      required: [true, "กรุณากรอกรหัสผ่าน"],
    },
    profileImage: {
      type: String,
      default: null,
    },
    messageToRunners: {
      type: String,
      default: "",
    },
    runningExperience: {
      type: [String],
      default: [],
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

// Hash password before saving (เฉพาะ password ใหม่ที่ยังไม่ได้ hash)
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    // ตรวจสอบว่า password ถูก hash แล้วหรือไม่ (bcrypt hash เริ่มต้นด้วย $2b$)
    if (this.password.startsWith('$2b$')) {
      return next(); // ข้าม การ hash ถ้า password ถูก hash แล้ว
    }
    
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
