const conections = require("../database/conections");

module.exports = {
  async create(req, res) {
    const { title, desc, value } = req.body;
    const ong_id = req.headers.autorizacao;
    //console.log(title, desc, value, ong_id);
    const [id] = await conections("incidents").insert({
      title,
      desc,
      value,
      ong_id
    });
    return res.json({ id });
  },
  async index(req, res) {
    const { page = 1 } = req.query;
    const [count] = await conections("incidents").count();
    const ongs = await conections("incidents")
      .join("ongs", "ongs.id", "=", "incidents.ong_id")
      .limit(5)
      .offset((page - 1) * 5)
      .select([
        "incidents.*",
        "ongs.name",
        "ongs.email",
        "ongs.whats",
        "ongs.cidade",
        "ongs.uf"
      ]);
    res.header("X-Total-Count", count["count(*)"]);
    return res.json(ongs);
  },
  async delete(req, res) {
    const { id } = req.params;
    const ong_id = req.headers.autorizacao;
    //console.log(title, desc, value, ong_id);
    const incident = await conections("incidents")
      .where("id", id)
      .select("ong_id")
      .first();
    if (incident.ong_id !== ong_id) {
      return res.status(401).json({ error: "nao autorizado" });
    }
    await conections("incidents")
      .where("id", id)
      .delete();
    return res.status(204).send();
  }
};
