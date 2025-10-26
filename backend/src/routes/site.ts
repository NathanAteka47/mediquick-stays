import { Router } from "express";
import { Package } from "../models/Package";

const router = Router();

// seed route (dev) - create sample packages quickly
router.post("/seed", async (req, res, next) => {
  try {
    const packages = [
      { title: "Standard", description: "Comfortable room near hospital", price: 2500 },
      { title: "Standard Plus", description: "Improved room + services", price: 4000 },
      { title: "Platinum", description: "Luxury room + transport", price: 8000 }
    ];
    await Package.deleteMany({});
    const created = await Package.insertMany(packages);
    res.json({ ok: true, created });
  } catch (err) {
    next(err);
  }
});

// GET home data (hero + featured packages)
router.get("/home", async (req, res, next) => {
  try {
    const packages = await Package.find().limit(6).lean();
    res.json({
      hero: {
        title: "Comfort when it matters most",
        subtitle: "Affordable stays near hospitals",
        cta: "/bookings"
      },
      packages
    });
  } catch (err) {
    next(err);
  }
});

export default router;
