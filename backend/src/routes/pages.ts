import { Router } from "express";

const router = Router();

// GET /api/v1/pages/:slug
router.get("/:slug", (req, res) => {
  const { slug } = req.params;
  const staticPages: Record<string, any> = {
    about: {
      title: "About Mediquick Stays",
      content: "We provide verified, affordable accommodation close to medical facilities in Kenya."
    },
    contact: {
      title: "Contact Us",
      content: "Reach us at nateka@chak.or.ke or call +254 700 000 000."
    },
    blog: {
      title: "Our Blog",
      content: "Stay updated with health and wellness tips from our experts."
    }
  };

  const page = staticPages[slug];
  if (!page) {
    return res.status(404).json({ error: "Page not found" });
  }

  res.json({ ok: true, page });
});

export default router;
