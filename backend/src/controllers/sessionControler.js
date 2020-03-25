const conections = require("../database/conections");

module.exports = {
  async create(req, res) {
    const { id } = req.body;
    const ong = await conections("ongs")
      .where("id", id)
      .select("name")
      .first();
    if (!ong) return res.status(400).json({ error: "ong nao encontrada" });
    return res.json(ong);
  }
};
