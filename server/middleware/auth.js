import jwt from "jsonwebtoken";
import { supabase } from "../config/supabase.js"

export const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Access token required" });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "your-secret-key"
    );

    const { data: user, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", decoded.userId)
      .single();

    if (error || !user) {
      return res
        .status(401)
        .json({ message: "Invalid token or user not found" });
    }

    req.user = { ...user, accessToken: token }; // Attach token string here

    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    res.status(403).json({ message: "Invalid or expired token" });
  }
};

export const requireRole = (requiredRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "Authentication required" });
    }

    const userRole = req.user.role;
    const roles = Array.isArray(requiredRoles)
      ? requiredRoles
      : [requiredRoles];

    if (!roles.includes(userRole)) {
      return res.status(403).json({
        message: `Access denied. Required role: ${roles.join(
          " or "
        )}, your role: ${userRole}`,
      });
    }

    next();
  };
};

export const requireAdmin = requireRole(["admin"]);
export const requireAdminOrEditor = requireRole(["admin", "editor"]);
