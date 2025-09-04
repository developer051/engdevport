import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';

const DB_PATH = path.join(process.cwd(), 'data');
const USERS_FILE = path.join(DB_PATH, 'users.json');

// Ensure data directory exists
if (!fs.existsSync(DB_PATH)) {
  fs.mkdirSync(DB_PATH, { recursive: true });
}

// Initialize users file if it doesn't exist
if (!fs.existsSync(USERS_FILE)) {
  fs.writeFileSync(USERS_FILE, JSON.stringify([], null, 2));
}

// Helper functions
const readUsers = () => {
  try {
    const data = fs.readFileSync(USERS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading users file:', error);
    return [];
  }
};

const writeUsers = (users) => {
  try {
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
    return true;
  } catch (error) {
    console.error('Error writing users file:', error);
    return false;
  }
};

// User operations
export const findUserByLoginName = (loginName) => {
  const users = readUsers();
  return users.find(user => user.loginName && user.loginName.toLowerCase() === loginName.toLowerCase());
};

export const findUserById = (id) => {
  const users = readUsers();
  return users.find(user => user.id === id);
};

export const createUser = async (userData) => {
  const users = readUsers();
  
  // Validate required fields
  if (!userData.loginName || !userData.password) {
    throw new Error('กรุณากรอกชื่อผู้ใช้และรหัสผ่าน');
  }
  
  // Check if loginName already exists
  const existingUserByLoginName = findUserByLoginName(userData.loginName);
  if (existingUserByLoginName) {
    throw new Error('ชื่อผู้ใช้นี้มีคนใช้แล้ว');
  }
  
  // Hash password
  const salt = await bcrypt.genSalt(12);
  const hashedPassword = await bcrypt.hash(userData.password, salt);
  
  // Create new user
  const newUser = {
    id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
    firstName: userData.firstName,
    lastName: userData.lastName,
    nickname: userData.nickname || '',
    loginName: userData.loginName.toLowerCase(),
    department: userData.department,
    password: hashedPassword,
    profileImage: userData.profileImage || null,
    messageToRunners: userData.messageToRunners || '',
    runningExperience: userData.runningExperience || [],
    score: 0,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  users.push(newUser);
  
  if (writeUsers(users)) {
    // Return user without password
    const { password, ...userWithoutPassword } = newUser;
    return userWithoutPassword;
  } else {
    throw new Error('เกิดข้อผิดพลาดในการบันทึกข้อมูล');
  }
};

export const validatePassword = async (candidatePassword, hashedPassword) => {
  if (!candidatePassword || !hashedPassword) {
    return false;
  }
  return await bcrypt.compare(candidatePassword, hashedPassword);
};

export const getAllUsers = (sortBy = 'score', order = 'desc') => {
  const users = readUsers();
  
  // Remove passwords and sort, filter out users without loginName
  const usersWithoutPasswords = users
    .filter(user => user.isActive && user.loginName)
    .map(({ password, ...user }) => user)
    .sort((a, b) => {
      if (order === 'desc') {
        return b[sortBy] - a[sortBy] || new Date(a.createdAt) - new Date(b.createdAt);
      } else {
        return a[sortBy] - b[sortBy] || new Date(a.createdAt) - new Date(b.createdAt);
      }
    });
  
  return usersWithoutPasswords;
};

export const updateUserScore = (userId, additionalScore) => {
  const users = readUsers();
  const userIndex = users.findIndex(user => user.id === userId);
  
  if (userIndex === -1) {
    throw new Error('ไม่พบผู้ใช้');
  }
  
  // เพิ่มคะแนนใหม่เข้าไปในคะแนนเดิม
  users[userIndex].score += additionalScore;
  users[userIndex].updatedAt = new Date().toISOString();
  
  if (writeUsers(users)) {
    const { password, ...userWithoutPassword } = users[userIndex];
    return userWithoutPassword;
  } else {
    throw new Error('เกิดข้อผิดพลาดในการอัปเดตคะแนน');
  }
};

export const updateUser = (userId, userData) => {
  const users = readUsers();
  const userIndex = users.findIndex(user => user.id === userId);
  
  if (userIndex === -1) {
    return null;
  }
  
  // Update user data
  users[userIndex] = {
    ...users[userIndex],
    firstName: userData.firstName,
    lastName: userData.lastName,
    nickname: userData.nickname || '',
    loginName: userData.loginName.toLowerCase(),
    department: userData.department,
    messageToRunners: userData.messageToRunners || '',
    runningExperience: userData.runningExperience || [],
    updatedAt: new Date().toISOString()
  };
  
  // Update password if provided
  if (userData.password) {
    users[userIndex].password = userData.password;
  }
  
  // Update profile image if provided
  if (userData.profileImage) {
    users[userIndex].profileImage = userData.profileImage;
  }
  
  if (writeUsers(users)) {
    const { password, ...userWithoutPassword } = users[userIndex];
    return userWithoutPassword;
  } else {
    throw new Error('เกิดข้อผิดพลาดในการอัปเดตข้อมูล');
  }
};

export const deleteUser = (userId) => {
  const users = readUsers();
  const userIndex = users.findIndex(user => user.id === userId);
  
  if (userIndex === -1) {
    return false;
  }
  
  // Soft delete - mark as inactive
  users[userIndex].isActive = false;
  users[userIndex].updatedAt = new Date().toISOString();
  
  return writeUsers(users);
};
