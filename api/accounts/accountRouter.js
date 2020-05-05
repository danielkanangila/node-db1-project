const express = require("express");
const Account = require("./accountsModel");

const router = express.Router();

router.get("/accounts", async (req, res) => {
  try {
    const accounts = await Account.get();
    res.status(200).json(accounts);
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "An occurred while trying to retrieve account list." });
  }
});
router.post("/accounts", validateAccount, async (req, res) => {
  try {
    const account = await Account.insert(req.body);
    res.status(201).json(account);
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "An occurred while trying to create account." });
  }
});
router.get("/accounts/:id", validateAccountID, async (req, res) => {
  try {
    res.status(200).json(req.account);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message:
        "An occurred while trying to retrieve account with the specified ID.",
    });
  }
});
router.put(
  "/accounts/:id",
  validateAccountID,
  validateAccount,
  async (req, res) => {
    try {
      const account = await Account.update(req.params.id, req.body);
      res.status(200).json(account);
    } catch (err) {
      console.log(err);
      res
        .status(500)
        .json({ message: "An occurred while trying to update account list." });
    }
  }
);
router.delete("/accounts/:id", validateAccountID, async (req, res) => {
  try {
    await Account.remove(req.params.id);
    res.status(200).json({ id: req.params.id });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "An occurred while trying to delete account list." });
  }
});

// Middleware

async function validateAccountID(req, res, next) {
  try {
    const account = await Account.getById(req.params.id);
    if (!account) {
      res.status(400).json({ message: "Invalid account ID" });
      return false;
    }
    req.account = account;
    next();
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message:
        "An error occurred while trying the retrieve the specified ID in request params.",
    });
  }
}

async function validateAccount(req, res, next) {
  if (!req.body) {
    res.status(400).json({ message: "missing account data." });
    return false;
  }
  if (req.body && !req.body.name) {
    res.status(400).json({ message: "missing required name field." });
    return false;
  }
  if (req.body && !req.body.budget) {
    res.status(400).json({ message: "missing required budget field." });
    return false;
  }
  next();
}

module.exports = router;
