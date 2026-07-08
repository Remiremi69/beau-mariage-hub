import { auth, defineMcp } from "@lovable.dev/mcp-js";
import listLeadsTool from "./tools/list_leads";
import getLeadTool from "./tools/get_lead";
import updateLeadStatusTool from "./tools/update_lead_status";

// L'issuer OAuth doit être l'hôte Supabase direct, jamais le proxy Lovable Cloud.
const projectRef = import.meta.env.VITE_SUPABASE_PROJECT_ID ?? "project-ref-unset";

export default defineMcp({
  name: "limen-mcp",
  title: "Limen — Domaine de la Croix Rochefort",
  version: "0.1.0",
  instructions:
    "Outils d'administration Limen : consultation et suivi des leads du configurateur de mariage. L'accès est protégé par OAuth ; seuls les administrateurs peuvent lire ou modifier les données (RLS).",
  auth: auth.oauth.issuer({
    issuer: `https://${projectRef}.supabase.co/auth/v1`,
    acceptedAudiences: "authenticated",
  }),
  tools: [listLeadsTool, getLeadTool, updateLeadStatusTool],
});
