const argon2 = require("argon2");

module.exports = {
  hash(password) {
    return argon2.hash(password);
  },
  verify(hashedPassword, plainPassword) {
    return argon2.verify(hashedPassword, plainPassword);
  },
};
