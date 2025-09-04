import connectDB from './mongodb';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

// User operations
export const findUserByLoginName = async (loginName) => {
  await connectDB();
  return await User.findOne({ loginName: loginName.toLowerCase() });
};

export const findUserById = async (id) => {
  await connectDB();
  return await User.findOne({ originalId: id });
};

export const findUserByMongoId = async (mongoId) => {
  await connectDB();
  return await User.findById(mongoId);
};

export const createUser = async (userData) => {
  await connectDB();
  
  // Validate required fields
  if (!userData.loginName || !userData.password) {
    throw new Error('กรุณากรอกชื่อผู้ใช้และรหัสผ่าน');
  }
  
  // Check if loginName already exists
  const existingUser = await findUserByLoginName(userData.loginName);
  if (existingUser) {
    throw new Error('ชื่อผู้ใช้นี้มีคนใช้แล้ว');
  }
  
  // Create new user
  const newUser = new User({
    originalId: Date.now().toString() + Math.random().toString(36).substr(2, 9),
    firstName: userData.firstName,
    lastName: userData.lastName,
    nickname: userData.nickname || '',
    loginName: userData.loginName.toLowerCase(),
    department: userData.department,
    password: userData.password, // จะถูก hash โดย pre-save hook (ถ้ายังไม่ได้ hash)
    profileImage: userData.profileImage || null,
    messageToRunners: userData.messageToRunners || '',
    runningExperience: userData.runningExperience || [],
    score: 0,
    isActive: true,
  });
  
  const savedUser = await newUser.save();
  
  // Return user without password
  const userResponse = savedUser.toObject();
  delete userResponse.password;
  return userResponse;
};

export const updateUser = async (userId, userData) => {
  await connectDB();
  
  const user = await findUserById(userId);
  if (!user) {
    return null;
  }
  
  // Update fields
  if (userData.firstName) user.firstName = userData.firstName;
  if (userData.lastName) user.lastName = userData.lastName;
  if (userData.nickname !== undefined) user.nickname = userData.nickname;
  if (userData.loginName) user.loginName = userData.loginName.toLowerCase();
  if (userData.department) user.department = userData.department;
  if (userData.messageToRunners !== undefined) user.messageToRunners = userData.messageToRunners;
  if (userData.runningExperience) user.runningExperience = userData.runningExperience;
  if (userData.profileImage) user.profileImage = userData.profileImage;
  
  // Update password if provided
  if (userData.password) {
    user.password = userData.password; // จะถูก hash โดย pre-save hook
  }
  
  const updatedUser = await user.save();
  
  // Return user without password
  const userResponse = updatedUser.toObject();
  delete userResponse.password;
  return userResponse;
};

export const validatePassword = async (candidatePassword, hashedPassword) => {
  if (!candidatePassword || !hashedPassword) {
    return false;
  }
  return await bcrypt.compare(candidatePassword, hashedPassword);
};

export const getAllUsers = async (sortBy = 'score', sortOrder = 'desc') => {
  await connectDB();
  
  // สร้าง sort object
  const sortOptions = {};
  sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;
  
  const users = await User.find({ isActive: true })
    .select('-password')
    .sort(sortOptions);
    
  return users.map(user => ({
    id: user.originalId,
    firstName: user.firstName,
    lastName: user.lastName,
    nickname: user.nickname,
    loginName: user.loginName,
    department: user.department,
    profileImage: user.profileImage,
    messageToRunners: user.messageToRunners,
    runningExperience: user.runningExperience,
    score: user.score,
    isActive: user.isActive,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt
  }));
};

export const deleteUser = async (userId) => {
  await connectDB();
  const result = await User.findOneAndDelete({ originalId: userId });
  return result;
};

export const updateUserScore = async (userId, additionalScore) => {
  await connectDB();
  
  const user = await findUserById(userId);
  if (!user) {
    throw new Error('ไม่พบผู้ใช้');
  }
  
  // เพิ่มคะแนนใหม่เข้าไปในคะแนนเดิม
  user.score += additionalScore;
  const updatedUser = await user.save();
  
  // Return user without password
  const userResponse = updatedUser.toObject();
  delete userResponse.password;
  return userResponse;
};
