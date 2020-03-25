const conections = require("../database/conections");
const crypto = require("crypto");

module.exports = {
  async create(req, res) {
    const { name, email, whats, cidade, uf } = req.body;

    const id = crypto.randomBytes(4).toString("HEX");
    await conections("ongs").insert({ id, name, email, whats, cidade, uf });
    console.log(id);
    return res.json({ id });
  },
  async index(req, res) {
    const ongs = await conections("ongs").select("*");

    return res.json(ongs);
  }
};
