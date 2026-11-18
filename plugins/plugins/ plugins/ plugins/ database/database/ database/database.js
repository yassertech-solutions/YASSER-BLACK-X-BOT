
const fs = require("fs");
const path = require("path");

const usersFile = path.join(__dirname, "users.json");
const groupsFile = path.join(__dirname, "groups.json");

function readFile(file, fallback) {
  try {
    return JSON.parse(fs.readFileSync(file, "utf8"));
  } catch {
    return fallback;
  }
}

function saveFile(file, data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

function addUser(userId) {
  const data = readFile(usersFile, { users: [] });

  if (!data.users.includes(userId)) {
    data.users.push(userId);
    saveFile(usersFile, data);
  }
}

function addGroup(groupId) {
  const data = readFile(groupsFile, { groups: [] });

  if (!data.groups.includes(groupId)) {
    data.groups.push(groupId);
    saveFile(groupsFile, data);
  }
}

function getStats() {
  const users = readFile(usersFile, { users: [] });
  const groups = readFile(groupsFile, { groups: [] });

  return {
    totalUsers: users.users.length,
    totalGroups: groups.groups.length
  };
}

module.exports = {
  addUser,
  addGroup,
  getStats
};
