import express from "express";
import { Request, Response } from "express";
import db from "../config/db";
import { OkPacket } from "mysql2";

const router = express.Router();

// Endpoint to insert a new case log
router.post("/caselogs", (req: Request, res: Response) => {
  const { caseNo, caseTitle, partyFiler, caseType, tags } = req.body;

  if (!caseNo || !caseTitle || !partyFiler || !caseType) {
    res.status(400).json({ error: "All fields are required" });
    return;
  }

  const sql = `
      INSERT INTO caselogs (case_no, title, party_filer, case_type, tag, status)
      VALUES (?, ?, ?, ?, ?, 'New')
    `;
  const values = [caseNo, caseTitle, partyFiler, caseType, tags.join(", ")];

  db.query(sql, values, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Database error" });
      return;
    }

    res.status(201).json({ message: "Case log added successfully" });
  });
});

// Fetch distinct tags
router.get("/tags", (req: Request, res: Response) => {
  const sql = "SELECT DISTINCT tag FROM caselogs";

  db.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Database error" });
      return;
    }

    const tags = (results as any[]).map((row) => row.tag);
    res.json(tags);
  });
});

export default router;
