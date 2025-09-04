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
    nickname: {
      type: String,
      default: "",
      trim: true,
      maxlength: [30, "ชื่อเล่นต้องไม่เกิน 30 ตัวอักษร"],
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
        "Actuarial",
        "Agency",
        "Broker",
        "Business Development and Partnership",
        "Business Development and Sales Support",
        "Chief Executive Office",
        "Claim",
        "Communication Organization",
        "Compliance",
        "Customer Service",
        "Executive Assistant",
        "Finance and Accounting",
        "Finance and Investment",
        "Human Resources",
        "Information Technology",
        "Information Technology Division",
        "Internal Audit",
        "Investment",
        "Legal",
        "Limited Brokerage Dealing Underwriting (LBDU)",
        "Management and Corporate Support",
        "Office Management",
        "Operating System Testing",
        "Operations",
        "Policy Owner Service",
        "Processing Group",
        "Product",
        "Purchase",
        "Risk Management",
        "Sales Compensation Management",
        "Sales Support",
        "Support Broker and Wealth",
        "Telemarketing",
        "Telemarketing Management",
        "Training and Channel Development",
        "Underwriting",
        "Underwriting (DMC)",
        "Wealth Management",
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
