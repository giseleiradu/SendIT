import db from "../db/db";

export default class Parcel {
  static async getAll(req, res) {
    const { rows } = await db.query("SELECT * FROM parcels");
    if (rows.length) {
      return res.status(200).json({
        status: "Successful",
        parcels: rows
      });
    } else {
      return res.json({
        message: "No orders founds"
      });
    }
  }
  static async getById(req, res) {
    const { rows } = await db.query("SELECT * FROM parcels WHERE id=$1", [req.params.parcelId]);
    // const { rows } = await db.query("UPDATE parcels SET status=$1 WHERE id=$2", [req.body.status, req.params.parcelId]);
    if (rows.length) {
      return res.status(200).json({
        status: "Successful",
        parcels: rows[0]
      });
    } else {
      return res.json({
        message: "No orders founds"
      });
    }
  }
  static async createParcel(req, res) {
    if (
      req.body.userid &&
      req.body.weight &&
      req.body.destination &&
      req.body.receiver
    ) {
      const qry = `INSERT INTO
        parcels(userid, receiver, weight, location, destination, price, status)
        VALUES($1, $2, $3, $4, $5, $6, $7) returning *`;

      const parcel = [
        req.body.userid,
        req.body.receiver,
        req.body.weight,
        req.body.location,
        req.body.destination,
        req.body.weight * 100,
        "ordered"
      ];

      try {
        const { rows } = await db.query(qry, parcel);

        if (rows.length > 0) {
          // console.log(rows);
          return res.status(201).json({ newParcel: rows[0] });
        } else {
          return res.status(500).json({ message: "not created!" });
        }
      } catch (e) {
        return res.status(500).json({ message: "Not successfully created!" });
        console.log(e);
      }
    } else {
      return res
        .status(400)
        .json({ message: "Please enter the required information" });
    }
  }
}
