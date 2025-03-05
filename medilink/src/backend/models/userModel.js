import supabase from "../config/supabaseClient.js";

const UserModel = {
  async findByUsername(username) {
    const { data } = await supabase
      .from("users")
      .select("id")
      .eq("Username", username)
      .single();
    return data;
  },

  async createUser(username, hashedPassword) {
    const { error } = await supabase
      .from("users")
      .insert([{ username: username, password: hashedPassword }]);
    return error;
  },

  async findByCredentials(username) {
    const { data } = await supabase
      .from("users")
      .select("id, password")
      .eq("username", username)
      .single();
    return data;
  },
};

export default UserModel;
