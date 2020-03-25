const conections = require("../database/conections");

module.exports = {
  async index(req, res) {
    const ong_id = req.headers.autorizacao;
    const incidents = await conections("incidents")
      .where("ong_id", ong_id)
      .select("*");

    return res.json(incidents);
  }
};
