import supabase from "../config/supabaseClient.js";

/**
 * Signup a new user using Supabase Auth
 */
export const signup = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    // Create user in Supabase Auth
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    // Automatically create a user entry in the database
    const { error: dbError } = await supabase.from("users").insert([
      {
        user_id: data.user.id,
        email,
      },
    ]);

    if (dbError) {
      return res.status(500).json({ message: "Error creating user entry" });
    }

    res
      .status(201)
      .json({ message: "User created successfully", user: data.user });
  } catch (err) {
    console.error("Signup error:", err);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: err.message });
  }
};

/**
 * Login user using Supabase Auth
 */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    // Authenticate user
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    res.status(200).json({
      message: "Login successful",
      session: data.session,
      user: data.user,
    });
  } catch (err) {
    console.error("Login error:", err);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: err.message });
  }
};

/**
 * Logout user
 */
export const logout = async (req, res) => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) {
      return res.status(500).json({ message: error.message });
    }
    res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    console.error("Logout error:", err);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: err.message });
  }
};

export const checkAuth = async (req, res) => {
  try {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error || !user) {
      return res.status(401).json({ authenticated: false });
    }

    res.status(200).json({ authenticated: true, user });
  } catch (err) {
    console.error("Auth check error:", err);
    res.status(401).json({ authenticated: false });
  }
};
