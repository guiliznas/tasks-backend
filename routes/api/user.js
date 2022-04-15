const { Router } = require("express");
const User = require("../../models/User");

const router = Router();

router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    if (!users) throw new Error("No users");
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/", async (req, res) => {
  const newUser = new User(req.body);
  try {
    const user = await newUser.save();
    if (!user) throw new Error("Algo de errado ao tentar salvar o usuário");
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const response = await User.findByIdAndUpdate(id, req.body);
    if (!response) throw new Error("Algo de errado ao tentar editar o usuário");
    const updated = { ...response._doc, ...req.body };
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const removed = await User.findByIdAndDelete(id);
    if (!removed) throw new Error("Algo errado ao remover o usuário");
    res.status(200).json(removed);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
