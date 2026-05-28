export const WEDDING_SCHEDULE = {
  preparationStart: "11h30",      // début préparation au gîte (4h avant cérémonie)
  preparationDuration: 4,          // heures
  ceremonyStart: "15h30",          // début cérémonie laïque (si choisie)
  ceremonyEnd: "16h15",            // fin cérémonie
  vinHonneurStart: "16h45",        // début vin d'honneur
  vinHonneurEnd: "18h30",          // fin VH (transition repas)
  dinnerStart: "19h00",            // entrée des mariés en salle

  // Cas alternatif : pas de cérémonie laïque
  preparationStartNoCeremony: "12h00",
  vinHonneurStartNoCeremony: "16h00",
} as const;
