// Database fallback - ใช้ JSON ถ้า MongoDB ไม่พร้อมใช้งาน
import * as jsondb from './jsondb.js';
import * as mongodbService from './mongodbService.js';

// ตรวจสอบว่า MongoDB พร้อมใช้งานหรือไม่
let mongoAvailable = false;

async function checkMongoConnection() {
  try {
    const { default: connectDB } = await import('./mongodb.js');
    await connectDB();
    mongoAvailable = true;
    console.log('✅ MongoDB พร้อมใช้งาน');
    return true;
  } catch (error) {
    mongoAvailable = false;
    console.log('⚠️  MongoDB ไม่พร้อมใช้งาน, ใช้ JSON database แทน');
    return false;
  }
}

// Initialize connection check
let connectionChecked = false;

async function ensureConnection() {
  if (!connectionChecked) {
    await checkMongoConnection();
    connectionChecked = true;
  }
}

// Wrapper functions ที่เลือกใช้ database ตาม availability
export const findUserByLoginName = async (loginName) => {
  await ensureConnection();
  if (mongoAvailable) {
    return await mongodbService.findUserByLoginName(loginName);
  } else {
    return jsondb.findUserByLoginName(loginName);
  }
};

export const findUserById = async (id) => {
  await ensureConnection();
  if (mongoAvailable) {
    return await mongodbService.findUserById(id);
  } else {
    return jsondb.findUserById(id);
  }
};

export const createUser = async (userData) => {
  await ensureConnection();
  if (mongoAvailable) {
    return await mongodbService.createUser(userData);
  } else {
    return await jsondb.createUser(userData);
  }
};

export const updateUser = async (userId, userData) => {
  await ensureConnection();
  if (mongoAvailable) {
    return await mongodbService.updateUser(userId, userData);
  } else {
    return await jsondb.updateUser(userId, userData);
  }
};

export const validatePassword = async (candidatePassword, hashedPassword) => {
  await ensureConnection();
  if (mongoAvailable) {
    return await mongodbService.validatePassword(candidatePassword, hashedPassword);
  } else {
    return await jsondb.validatePassword(candidatePassword, hashedPassword);
  }
};

export const getAllUsers = async (sortBy = 'score', sortOrder = 'desc') => {
  await ensureConnection();
  if (mongoAvailable) {
    return await mongodbService.getAllUsers(sortBy, sortOrder);
  } else {
    return jsondb.getAllUsers(sortBy, sortOrder);
  }
};

export const deleteUser = async (userId) => {
  await ensureConnection();
  if (mongoAvailable) {
    return await mongodbService.deleteUser(userId);
  } else {
    return jsondb.deleteUser(userId);
  }
};

export const updateUserScore = async (userId, additionalScore) => {
  await ensureConnection();
  if (mongoAvailable) {
    return await mongodbService.updateUserScore(userId, additionalScore);
  } else {
    return jsondb.updateUserScore(userId, additionalScore);
  }
};

// ฟังก์ชันสำหรับเช็คสถานะ database
export const getDatabaseStatus = () => {
  return {
    type: mongoAvailable ? 'MongoDB' : 'JSON',
    available: mongoAvailable
  };
};
