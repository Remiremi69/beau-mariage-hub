import { ConfigurateurState } from "@/components/configurateur/pricingTypes";
import { WEDDING_SCHEDULE } from "@/lib/wedding-schedule";

export type TimelineMoment = {
  horaire: string;
  titre: string;
  copy: string;
  condition: boolean;
};

export const buildTimeline = (state: ConfigurateurState): TimelineMoment[] => {
  const hasCeremony = state.ceremonieLaique;
  const prepStart = hasCeremony
    ? WEDDING_SCHEDULE.preparationStart
    : WEDDING_SCHEDULE.preparationStartNoCeremony;
  const vhStart = hasCeremony
    ? WEDDING_SCHEDULE.vinHonneurStart
    : WEDDING_SCHEDULE.vinHonneurStartNoCeremony;

  const platCopy: Record<string, string> = {
    rumsteak: "Cœur de rumsteak sauce vigneronne. Le terroir dans l'assiette.",
    "saint-jacques": "Quenelle Saint-Jacques mousseline. Finesse lyonnaise.",
    "poulet-morilles": "Poulet fermier crème de morilles. Rondeur, élégance.",
    "saumon-laque": "Pavé de saumon laqué japonais. Voyage dans l'assiette.",
  };

  const dessertCopy: Record<string, string> = {
    "royal-chocolat": "Royal chocolat feuillantine. Trois textures, un seul vertige.",
    "tarte-tatin": "Tarte tatin caramel, crème de Bresse. La générosité française.",
    fraisier: "Fraisier mascarpone citron vert basilic. La fraîcheur dans la nuit.",
  };

  return [
    {
      horaire: prepStart,
      titre: "Le matin commence",
      copy: "Vous arrivez au gîte. Café, fauteuils, miroirs, la lumière qu'il faut. Le silence des grandes journées.",
      condition: state.preparation?.lieuGite ?? false,
    },
    {
      horaire: "12h30",
      titre: "Le photographe est là",
      copy: "Loïc commence à documenter. Aucune pose dirigée — il capture ce qui se passe vraiment.",
      condition: state.preparation?.photographePrep ?? false,
    },
    {
      horaire: "13h00",
      titre: "La maquilleuse",
      copy: "Premiers gestes. Le visage qu'on connaît, en plus lumineuse.",
      condition: state.preparation?.maquilleuse ?? false,
    },
    {
      horaire: "13h30",
      titre: "La coiffeuse",
      copy: "Le geste qui pose la silhouette du jour.",
      condition: state.preparation?.coiffeuse ?? false,
    },
    {
      horaire: "15h00",
      titre: "Les invités arrivent",
      copy: "Le domaine s'anime. Cocktails de bienvenue, dernières embrassades avant le grand moment.",
      condition: true,
    },
    {
      horaire: WEDDING_SCHEDULE.ceremonyStart,
      titre: "La cérémonie laïque",
      copy: state.violonisteOption
        ? "Le violon d'Alexandre ouvre. Vous descendez. Tout commence."
        : "Vous descendez. Tout commence.",
      condition: hasCeremony,
    },
    {
      horaire: WEDDING_SCHEDULE.ceremonyEnd,
      titre: "Le premier baiser de mariés",
      copy: "Félicitations, embrassades, photo de groupe immédiate.",
      condition: hasCeremony,
    },
    {
      horaire: vhStart,
      titre: "Le vin d'honneur",
      copy:
        state.repas === "menu1"
          ? "Crémant de Bourgogne, kir au choix, 8 pièces lyonnaises. J&J au service."
          : "Punch citron vert, gingembre, coriandre. 8 pièces signature. J&J au service.",
      condition: true,
    },
    {
      horaire: "17h45",
      titre: "Les photos de couple",
      copy: "Loïc vous vole 30 minutes. Golden hour sur le Beaujolais. La séquence qui restera.",
      condition: true,
    },
    {
      horaire: WEDDING_SCHEDULE.dinnerStart,
      titre: "L'entrée des mariés en salle",
      copy: "Standing ovation. Vous traversez vos invités. Le repas peut commencer.",
      condition: true,
    },
    {
      horaire: "19h30",
      titre: "Le plat principal",
      copy: (state.repasPlat && platCopy[state.repasPlat]) || "Votre plat principal.",
      condition: true,
    },
    {
      horaire: "21h30",
      titre: "Le dessert",
      copy: (state.repasDessert && dessertCopy[state.repasDessert]) || "Votre dessert.",
      condition: true,
    },
    {
      horaire: "22h30",
      titre: "L'ouverture du bal",
      copy: "Votre première danse. Le DJ prend le relais. La nuit commence vraiment.",
      condition: true,
    },
    {
      horaire: "23h30",
      titre: "Le bar de nuit ouvre",
      copy: "Bouteilles disposées, verres prêts. Les invités se servent. La fête reste fluide.",
      condition: true,
    },
    {
      horaire: "23h30",
      titre: "Le service bar prend position",
      copy: "Un serveur J&J derrière le bar pour 2 heures. Cocktails servis, rythme tenu.",
      condition: state.options.includes("service-bar-2h"),
    },
    {
      horaire: "01h00",
      titre: "La soupe à l'oignon",
      copy: "Le rituel qui marque la nuit. Bouillon doré, croûtons, fromage. La salle ralentit. Les conversations deviennent vraies.",
      condition: state.options.includes("soupe-oignon"),
    },
    {
      horaire: "04h00",
      titre: "La fin",
      copy: "Vous êtes mariés. Vous l'avez vécu. Le silence revient sur le domaine.",
      condition: true,
    },
  ].filter((m) => m.condition);
};
