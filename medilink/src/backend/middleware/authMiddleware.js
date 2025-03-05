import supabase from "../config/supabaseClient.js";

export const authenticateUser = async (req, res, next) => {
  try {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error || !user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    req.user = user; // Attach user to request
    next();
  } catch (err) {
    console.error("Authentication error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};