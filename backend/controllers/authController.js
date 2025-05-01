import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  const { name, email, password, age, skinType, disease, routine, city, country } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Name, email, and password are required." });
  }

  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(409).json({ message: "User already exists." });

    const passwordHash = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      passwordHash,
      age,
      skinType,
      disease,
      routine,
      city,
      country,
    });

    await user.save();

    // Optionally trigger email verification here

    return res.status(201).json({ message: "User registered successfully." });
  } catch (err) {
    console.error("Signup error:", err.message);
    return res.status(500).json({ message: "Server error." });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: "Email and password are required." });

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid credentials." });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials." });

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    return res.json({ message: "Login successful", token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    console.error("Login error:", err.message);
    return res.status(500).json({ message: "Server error." });
  }
};




// function getRecommendations({ age, gender, skinType, routine, grade, sport, city }) {
//   const recommendations = [];

//   // Define grade-based recommendations
//   const graderecommendations = {
//     A: ["Use SPF 15+ sunscreen", "Stay hydrated"],
//     B: ["Use SPF 30+", "Reapply every 3 hours", "Avoid peak sun (12–3 PM)"],
//     C: ["Use SPF 50+", "Carry hat/sunglasses", "Apply moisturizer"],
//     D: ["Stay in shade", "Use full UV gear", "Carry umbrella", "Avoid outdoor activity"],
//     E: ["Avoid going out", "Consult dermatologist", "Wear UV-protective clothing"]
//   };

//   // Add grade-based recommendations
//   if (graderecommendations[grade]) {
//     recommendations.push(...graderecommendations[grade]);
//   }

//   // Add skin-type-based recommendations
//   if (skinType === "Sensitive") {
//     recommendations.push("Use hypoallergenic sunscreen", "Avoid scented products");
//   } else if (skinType === "Dry") {
//     recommendations.push("Apply moisturizer before sunscreen");
//   } else if (skinType === "Oily") {
//     recommendations.push("Use oil-free sunscreen");
//   }

//   // Add routine-based recommendations
//   if (routine === "Mostly Outdoor") {
//     recommendations.push("Reapply sunscreen frequently", "Carry water bottle");
//   } else if (routine === "Mixed") {
//     recommendations.push("Use sunscreen when going out", "Carry travel-size SPF");
//   }

//   // Add sport-based recommendations
//   if (sport === "Swimming") {
//     recommendations.push("Use water-resistant sunscreen", "Reapply after swimming");
//   } else if (sport === "Running") {
//     recommendations.push("Use sweat-resistant sunscreen", "Wear a breathable cap");
//   }

//   // Gender-based recommendations
//   if (gender === "Female") {
//     recommendations.push("Avoid makeup with SPF during peak sun");
//   }

//   // Age-based recommendations
//   const ageNum = parseInt(age.split("-")[0]);
//   if (ageNum < 15) {
//     recommendations.push("Use child-safe sunscreen");
//   } else if (ageNum > 50) {
//     recommendations.push("Check skin regularly for UV damage");
//   }

//   // Additional recommendation based on city (if available)
//   if (city) {
//     recommendations.push(`Stay updated on the weather in ${city} for UV levels.`);
//   }

//   return recommendations;
// }

export const myshield = async (req, res) => {
  try {
    const userId = req.user.id;
    if (!userId) {
      return res.status(400).json({ message: 'User ID not provided.' });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ user });
  } catch (err) {
    console.error("Error in myshield:", err);
    res.status(500).json({ message: "Internal server error", error: err.message });
  }
};









// const { grade } = req.body;

// if (!grade) {
//   return res.status(400).json({ message: "Grade is required." });
// }

// const user = await User.findById(userId).select('age gender skinType routine sport city');
// if (!user) {
//   return res.status(404).json({ message: "User not found." });
// }

// const { age, gender, skinType, routine, sport, city } = user;

// // Generate recommendations
// const recommendations = getRecommendations({ age, gender, skinType, routine, grade, sport, city });

// return res.json({ recommendations });
//   } catch (err) {
//     console.error("myshield error:", err.message);
//     return res.status(500).json({ message: "Server error." });
//   }
// };
