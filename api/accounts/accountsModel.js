const db = require("../../data/dbConfig.js");

module.exports = {
  get,
  getById,
  insert,
  update,
  remove,
};

function get() {
  return db("accounts");
}

function getById(id) {
  return db("accounts").where({ id }).first();
}

function insert(account) {
  return db("accounts")
    .insert(account)
    .returning("*")
    .then((row) => {
      return getById(row[0].id);
    });
}

function update(id, changes) {
  return db("accounts")
    .where({ id })
    .update(changes)
    .then(() => {
      return getById(id);
    });
}

function remove(id) {
  return db("accounts").where("id", id).del();
}
