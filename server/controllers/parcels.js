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
    const { rows } = await db.query("SELECT * FROM parcels WHERE id=$1", [
      req.params.parcelId
    ]);
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

  static async updatePropertyById(req, res) {
    const { rows } = await db.query("SELECT * FROM parcels WHERE id=$1", [
      req.params.parcelId
    ]);
    if (rows[0].status === "Delivered") {
      return res.json({
        message: "Parcel is already delivered"
      });
    } else {
      let property = "id";
      if (req.body.status && req.url.search("status") > 0) {
        property = "status";
      } else if (req.body.destination && req.url.search("destination") > 0) {
        property = "destination";
      } else if (req.body.location && req.url.search("currentLocation") > 0) {
        property = "location";
      } else {
        return res.status(400).json({
          message: "Bad request"
        });
      }
      let keys = Object.keys(req.body);
      const { rowCount } = await db.query(
        `UPDATE parcels SET ${property} =$1 WHERE id=$2`,
        [req.body[keys[0]], req.params.parcelId]
      );
      const { rows } = await db.query("SELECT * FROM parcels WHERE id=$1", [
        req.params.parcelId
      ]);
      if (rowCount > 0) {
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
  }

  static async createParcel(req, res) {
    if (req.body.weight && req.body.destination && req.body.receiver) {
      const qry = `INSERT INTO
        parcels(userid, receiver, weight, location, destination, price, status)
        VALUES($1, $2, $3, $4, $5, $6, $7) returning *`;

      const parcel = [
        req.user.id,
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
          return res.status(201).json({ Parcel: rows[0] });
        }
      } catch (e) {
        return res.status(500).json({ message: "Server under maintainance!" });
      }
    } else {
      return res
        .status(400)
        .json({ message: "Please enter the required information" });
    }
  }
}
