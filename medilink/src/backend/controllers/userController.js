import multer from 'multer';
import supabase from "../config/supabaseClient.js";

// Configure Multer storage
 const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Ensure this directory exists
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

export const getUsername = async (req, res) => {
  try {
    // Fetch the authenticated user's session
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error || !user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Fetch the username from the database
    const { data, error: dbError } = await supabase
      .from("users")
      .select("username")
      .eq("user_id", user.id)
      .single();

    if (dbError) {
      console.error("Error fetching username:", dbError);
      return res.status(500).json({ message: "Error retrieving username" });
    }

    res.status(200).json({ username: data.username });
  } catch (err) {
    console.error("Unexpected error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getRecords = async (req, res) => {
  try {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error || !user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { data, error: dbError } = await supabase
      .from("medical_records")
      .select("*")
      .eq("user_id", user.id);

    if (dbError) {
      console.error("Error fetching medical records:", dbError);
      return res.status(500).json({ message: "Error retrieving records" });
    }

    console.log("Records API Response:", data); // Debugging line

    res.status(200).json(data); // Ensure data is returned as an array
  } catch (err) {
    console.error("Unexpected error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const profile = async (req, res) => {
  try {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error || !user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { username, name, date_of_birth, address, phone_number } = req.body;

    if (!username) {
      return res.status(400).json({ message: "Username is required" });
    }

    // Insert the username and user_id into the users table
    const { error: insertError } = await supabase.from("users").upsert([
      {
        user_id: user.id,
        username,
      },
    ]);

    if (insertError) {
      console.error("Error inserting username:", insertError);
      return res.status(500).json({ message: "Error saving username" });
    }

    // Insert additional data into the patients table
    const { error: patientError } = await supabase.from("patients").upsert([
      {
        user_id: user.id,
        name,
        email: user.email,
        date_of_birth,
        address,
        phone_number,
      },
    ]);

    if (patientError) {
      console.error("Error inserting patient data:", patientError);
      return res.status(500).json({ message: "Error saving patient data" });
    }

    res.status(201).json({ message: "Profile completed successfully" });
  } catch (err) {
    console.error("Unexpected error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getSharedRecords = async (req, res) => {
  try {
    const { shareId } = req.params;

    // Fetch records associated with the share ID
    const { data, error: dbError } = await supabase
      .from("shared_records")
      .select("medical_records")
      .eq("share_id", shareId)
      .single();

    if (dbError) {
      console.error("Error fetching shared records:", dbError);
      return res
        .status(500)
        .json({ message: "Error retrieving shared records" });
    }

    if (!data) {
      return res.status(404).json({ message: "Shared records not found" });
    }

    // Generate PDF here (you'll need to implement this part)
    // For now, we'll just return the data
    res.status(200).json(data.medical_records);
  } catch (err) {
    console.error("Unexpected error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getPatientProfile = async (req, res) => {
  try {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error || !user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Fetch the name from the patients table
    const { data, error: dbError } = await supabase
      .from("patients")
      .select("name, email, date_of_birth, address, phone_number")
      .eq("user_id", user.id)
      .single();

    if (dbError) {
      console.error("Error fetching patient profile:", dbError);
      return res.status(500).json({ message: "Error retrieving patient profile" });
    }

    res.status(200).json(data);
  } catch (err) {
    console.error("Unexpected error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const createShareableLink = async (req, res) => {
  try {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error || !user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Generate a unique share ID
    const shareId = crypto.randomUUID();

    // Get user's medical records
    const { data: records, error: recordsError } = await supabase
      .from("medical_records")
      .select("*")
      .eq("user_id", user.id);

    if (recordsError) {
      console.error("Error fetching medical records:", recordsError);
      return res.status(500).json({ message: "Error retrieving records" });
    }

    // Store the share link with the records
    const { error: shareError } = await supabase.from("shared_records").insert([
      {
        share_id: shareId,
        user_id: user.id,
        medical_records: records,
        created_at: new Date().toISOString(),
      },
    ]);

    if (shareError) {
      console.error("Error creating share link:", shareError);
      return res.status(500).json({ message: "Error creating share link" });
    }

    res.status(200).json({ shareId });
  } catch (err) {
    console.error("Unexpected error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const uploadFile = async (req, res) => {
  try {
    const { user } = req;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Upload file to Supabase Storage
    const { data, error: uploadError } = await supabase.storage
      .from('user-uploads')
      .upload(`${user.id}/${Date.now()}-${file.originalname}`, file.buffer, {
        cacheControl: '3600',
        upsert: false,
        contentType: file.mimetype,
        metadata: { user_id: user.id },
      });

    if (uploadError) {
      console.error("Error uploading file to Supabase:", uploadError);
      return res.status(500).json({ message: "Error uploading file" });
    }

    // Save file metadata to your medical_records table
    const fileData = {
      user_id: user.id,
      record_type: 'File Upload',
      record_details: file.originalname,
      file_name: data.Key, // Ensure this matches the column name
      created_date: new Date(),
    };

    const { error: dbError } = await supabase.from('medical_records').insert([fileData]);

    if (dbError) {
      console.error("Error saving file data:", dbError);
      return res.status(500).json({ message: "Error saving file data" });
    }

    res.status(200).json({ message: "File uploaded successfully", fileData });
  } catch (err) {
    console.error("File upload error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getFiles = async (req, res) => {
  try {
    const { user } = req;

    // Fetch file metadata from the database
    const { data: files, error } = await supabase
      .from('medical_records')
      .select('file_name, original_name')
      .eq('user_id', user.id);

    if (error) {
      console.error("Error fetching file metadata:", error);
      return res.status(500).json({ message: "Error fetching file metadata" });
    }

    // Generate signed URLs for each file
    const signedUrls = await Promise.all(
      files.map(async (file) => {
        const { signedURL, error } = await supabase.storage
          .from('user-uploads')
          .createSignedUrl(file.file_name, 60); // URL valid for 60 seconds

        if (error) {
          console.error("Error creating signed URL:", error);
          return null;
        }

        return { ...file, url: signedURL };
      })
    );

    res.status(200).json(signedUrls.filter(url => url !== null));
  } catch (err) {
    console.error("Error fetching files:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};