import express from "express";
import { Request, Response } from "express";
import db from "../config/db";
import { OkPacket } from "mysql2";

const router = express.Router();

// Endpoint to insert a new case log
router.post("/caselogs", (req: Request, res: Response) => {
  const { caseNo, caseTitle, partyFiler, tags } = req.body;

  if (!caseNo || !caseTitle || !partyFiler) {
    res.status(400).json({ error: "All fields are required" });
  }

  const sql =
    "INSERT INTO caselogs (case_no, title, party_filer) VALUES (?, ?, ?)";
  const values = [caseNo, caseTitle, partyFiler, tags ? tags.join(", ") : null];

  db.query(sql, values, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Database error" });
    }

    const okResults = results as OkPacket;

    res
      .status(201)
      .json({ message: "Case log added successfully", id: okResults.insertId });
  });
});

export default router;
