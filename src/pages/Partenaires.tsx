import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { z } from "zod";

const METIERS = [
  "Traiteur",
  "Photographe",
  "Domaine / Lieu de réception",
  "DJ / Musicien",
  "Wedding Planner",
  "Fleuriste",
  "Autre",
];

const CA_OPTIONS = [
  "Moins de 100k€",
  "100k–300k€",
  "300k–600k€",
  "Plus de 600k€",
];

const formSchema = z.object({
  prenom: z.string().trim().min(1, "Prénom requis").max(80),
  nom: z.string().trim().max(80).optional(),
  email: z.string().trim().email("Email invalide").max(255),
  metier: z.string().min(1, "Sélectionnez votre métier"),
  ca_annuel: z.string().min(1, "Sélectionnez une fourchette"),
  message: z.string().trim().max(1500).optional(),
});

const Partenaires = () => {
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    prenom: "",
    nom: "",
    email: "",
    metier: "",
    ca_annuel: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = formSchema.safeParse(form);
    if (!parsed.success) {
      toast({
        title: "Formulaire incomplet",
        description: parsed.error.issues[0]?.message ?? "Veuillez vérifier les champs.",
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);
    const { error } = await supabase.from("partenaires_leads").insert({
      prenom: parsed.data.prenom,
      nom: parsed.data.nom ?? null,
      email: parsed.data.email,
      metier: parsed.data.metier,
      ca_annuel: parsed.data.ca_annuel,
      message: parsed.data.message ?? null,
      source: "partenaires",
    });
    setSubmitting(false);

    if (error) {
      toast({
        title: "Une erreur est survenue",
        description: "Merci de réessayer dans un instant.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Demande envoyée",
      description: "Nous vous recontactons sous 48h.",
    });
    setForm({ prenom: "", nom: "", email: "", metier: "", ca_annuel: "", message: "" });
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "hsl(var(--nuit))", color: "hsl(var(--lin))" }}>
      <Helmet>
        <title>Limen Partenaires — Accompagnement IA pour prestataires mariage</title>
        <meta
          name="description"
          content="Limen Partenaires accompagne les prestataires du mariage premium dans l'automatisation de leur activité. Premier échange sans engagement."
        />
        <html lang="fr" />
      </Helmet>

      {/* HERO */}
      <section className="px-6 py-32 md:py-40">
        <div className="max-w-4xl mx-auto text-center">
          <h1
            className="font-serif text-4xl md:text-6xl lg:text-7xl leading-tight mb-10"
            style={{ fontFamily: "'Cormorant Garamond', serif", color: "hsl(var(--lin))" }}
          >
            Vous maîtrisez votre métier.
            <br />
            <span style={{ color: "hsl(var(--or))" }}>
              Laissez l'IA maîtriser le reste.
            </span>
          </h1>
          <p
            className="text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed"
            style={{ fontFamily: "'Jost', sans-serif", color: "hsl(var(--lin) / 0.85)" }}
          >
            Limen Partenaires accompagne les prestataires du mariage premium dans
            l'automatisation de leur activité — pour qu'ils passent moins de temps à
            gérer, et plus de temps à créer.
          </p>
          <a
            href="#contact"
            className="inline-block px-10 py-4 text-sm tracking-widest uppercase transition-all duration-300 border"
            style={{
              fontFamily: "'Jost', sans-serif",
              backgroundColor: "hsl(var(--or))",
              color: "hsl(var(--nuit))",
              borderColor: "hsl(var(--or))",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.color = "hsl(var(--or))";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "hsl(var(--or))";
              e.currentTarget.style.color = "hsl(var(--nuit))";
            }}
          >
            Demander un premier échange
          </a>
        </div>
      </section>

      <div className="h-px max-w-2xl mx-auto" style={{ backgroundColor: "hsl(var(--or) / 0.3)" }} />

      {/* SECTION PROBLÈME */}
      <section className="px-6 py-28 md:py-36">
        <div className="max-w-6xl mx-auto">
          <h2
            className="font-serif text-3xl md:text-5xl text-center mb-20"
            style={{ fontFamily: "'Cormorant Garamond', serif", color: "hsl(var(--lin))" }}
          >
            Le quotidien d'un prestataire mariage en 2025
          </h2>

          <div className="grid md:grid-cols-3 gap-12 md:gap-8">
            {[
              {
                titre: "Des leads qui fuitent",
                texte:
                  "Vous répondez à vos demandes entre deux prestations, parfois le lendemain. Pendant ce temps, le couple a déjà signé ailleurs.",
              },
              {
                titre: "Un Instagram en retard",
                texte:
                  "Vous savez que vous devriez publier régulièrement. Vous le faites quand vous avez le temps — c'est-à-dire rarement.",
              },
              {
                titre: "Des relances chronophages",
                texte:
                  "Suivre chaque prospect, relancer au bon moment, ne rien laisser passer — c'est un travail à temps plein que vous faites en plus du vôtre.",
              },
            ].map((bloc) => (
              <div key={bloc.titre} className="text-center md:text-left">
                <div
                  className="w-12 h-px mb-6 mx-auto md:mx-0"
                  style={{ backgroundColor: "hsl(var(--or))" }}
                />
                <h3
                  className="font-serif text-2xl md:text-3xl mb-5"
                  style={{ fontFamily: "'Cormorant Garamond', serif", color: "hsl(var(--lin))" }}
                >
                  {bloc.titre}
                </h3>
                <p
                  className="leading-relaxed"
                  style={{ fontFamily: "'Jost', sans-serif", color: "hsl(var(--lin) / 0.75)" }}
                >
                  {bloc.texte}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="h-px max-w-2xl mx-auto" style={{ backgroundColor: "hsl(var(--or) / 0.3)" }} />

      {/* SECTION PROPOSITION */}
      <section className="px-6 py-28 md:py-36">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-20">
            <h2
              className="font-serif text-3xl md:text-5xl mb-6"
              style={{ fontFamily: "'Cormorant Garamond', serif", color: "hsl(var(--lin))" }}
            >
              Limen Partenaires
            </h2>
            <p
              className="text-lg italic"
              style={{ fontFamily: "'Jost', sans-serif", color: "hsl(var(--or))" }}
            >
              Un accompagnement mensuel, progressif, construit pour le secteur du mariage.
            </p>
          </div>

          <div className="space-y-20">
            {[
              {
                num: "01",
                phase: "Phase 1 — Lancement",
                periode: "mois 1-2",
                prix: "à partir de 800 €/mois",
                titre: "Aucun lead sans réponse",
                description:
                  "Mise en place des automatisations entrantes : réponse automatique qualifiée, séquence de relance à J+1, J+3, J+7. Votre pipeline tourne sans que vous y touchiez.",
              },
              {
                num: "02",
                phase: "Phase 2 — Optimisation",
                periode: "mois 3-4",
                prix: "1 500 €/mois",
                titre: "Comprendre pour décider mieux",
                description:
                  "Analyse de vos taux de conversion par source et par période. Identification de vos dates sous-valorisées. Recommandations pricing basées sur la demande réelle.",
              },
              {
                num: "03",
                phase: "Phase 3 — Partenariat",
                periode: "mois 5+",
                prix: "2 000–2 500 €/mois",
                titre: "L'IA comme fonction permanente",
                description:
                  "Session mensuelle avec votre équipe pour ancrer les usages, ajuster les outils, et rester à la pointe. Nous devenons une fonction dans votre entreprise, pas un prestataire de plus.",
              },
            ].map((p, i, arr) => (
              <div key={p.num}>
                <div className="grid md:grid-cols-[120px_1fr] gap-8 md:gap-12 items-start">
                  <div
                    className="font-serif text-5xl md:text-6xl"
                    style={{ fontFamily: "'Cormorant Garamond', serif", color: "hsl(var(--or))" }}
                  >
                    {p.num}
                  </div>
                  <div>
                    <p
                      className="text-xs tracking-widest uppercase mb-3"
                      style={{ fontFamily: "'Jost', sans-serif", color: "hsl(var(--or))" }}
                    >
                      {p.phase} · {p.periode}
                    </p>
                    <h3
                      className="font-serif text-3xl md:text-4xl mb-4"
                      style={{ fontFamily: "'Cormorant Garamond', serif", color: "hsl(var(--lin))" }}
                    >
                      {p.titre}
                    </h3>
                    <p
                      className="leading-relaxed mb-5"
                      style={{ fontFamily: "'Jost', sans-serif", color: "hsl(var(--lin) / 0.8)" }}
                    >
                      {p.description}
                    </p>
                    <p
                      className="text-sm tracking-wider"
                      style={{ fontFamily: "'Jost', sans-serif", color: "hsl(var(--or))" }}
                    >
                      {p.prix}
                    </p>
                  </div>
                </div>
                {i < arr.length - 1 && (
                  <div
                    className="h-px max-w-md mx-auto mt-20"
                    style={{ backgroundColor: "hsl(var(--or) / 0.25)" }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="h-px max-w-2xl mx-auto" style={{ backgroundColor: "hsl(var(--or) / 0.3)" }} />

      {/* SECTION LÉGITIMITÉ */}
      <section className="px-6 py-28 md:py-36">
        <div className="max-w-3xl mx-auto text-center">
          <h2
            className="font-serif text-3xl md:text-5xl mb-12 leading-tight"
            style={{ fontFamily: "'Cormorant Garamond', serif", color: "hsl(var(--lin))" }}
          >
            Nous construisons des mariages.
            <br />
            <span style={{ color: "hsl(var(--or))" }}>Pas seulement des outils.</span>
          </h2>
          <div
            className="space-y-6 text-lg leading-relaxed"
            style={{ fontFamily: "'Jost', sans-serif", color: "hsl(var(--lin) / 0.85)" }}
          >
            <p>
              Limen conçoit et orchestre des mariages all-inclusive en Beaujolais. Nous
              connaissons vos contraintes de l'intérieur — les délais impossibles, les
              couples exigeants, les fournisseurs à coordonner.
            </p>
            <p style={{ color: "hsl(var(--or))" }} className="italic">
              Ce que nous construisons pour vous, nous l'utilisons nous-mêmes.
            </p>
          </div>
          {/* Photo terrain à intégrer */}
        </div>
      </section>

      <div className="h-px max-w-2xl mx-auto" style={{ backgroundColor: "hsl(var(--or) / 0.3)" }} />

      {/* SECTION FAQ */}
      <section className="px-6 py-28 md:py-36">
        <div className="max-w-3xl mx-auto">
          <h2
            className="font-serif text-3xl md:text-5xl text-center mb-16"
            style={{ fontFamily: "'Cormorant Garamond', serif", color: "hsl(var(--lin))" }}
          >
            Questions fréquentes
          </h2>

          <Accordion type="single" collapsible className="w-full">
            {[
              {
                q: "Est-ce que je dois avoir des outils IA en place pour commencer ?",
                a: "Non. Nous partons de votre situation actuelle — même si c'est WhatsApp et Excel — et nous construisons progressivement avec ce qui existe déjà chez vous.",
              },
              {
                q: "Combien de temps avant de voir des résultats ?",
                a: "Les automatisations du Bloc 1 sont opérationnelles dans les deux premières semaines. Vous verrez l'impact sur vos temps de réponse dès le premier mois.",
              },
              {
                q: "Est-ce que c'est adapté à ma taille d'entreprise ?",
                a: "Limen Partenaires s'adresse aux prestataires du mariage premium avec un CA supérieur à 150 000 €/an — photographes, traiteurs, domaines, wedding planners, DJ, fleuristes.",
              },
            ].map((item, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="border-b-0"
                style={{ borderBottom: "1px solid hsl(var(--or) / 0.25)" }}
              >
                <AccordionTrigger
                  className="text-left text-lg md:text-xl py-6 hover:no-underline"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    color: "hsl(var(--lin))",
                  }}
                >
                  {item.q}
                </AccordionTrigger>
                <AccordionContent
                  className="text-base leading-relaxed pb-6"
                  style={{
                    fontFamily: "'Jost', sans-serif",
                    color: "hsl(var(--lin) / 0.75)",
                  }}
                >
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <div className="h-px max-w-2xl mx-auto" style={{ backgroundColor: "hsl(var(--or) / 0.3)" }} />

      {/* FORMULAIRE */}
      <section id="contact" className="px-6 py-28 md:py-36">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-14">
            <h2
              className="font-serif text-3xl md:text-5xl mb-6"
              style={{ fontFamily: "'Cormorant Garamond', serif", color: "hsl(var(--lin))" }}
            >
              Parlons de votre activité
            </h2>
            <p
              className="text-base md:text-lg leading-relaxed"
              style={{ fontFamily: "'Jost', sans-serif", color: "hsl(var(--lin) / 0.8)" }}
            >
              Premier échange sans engagement — 30 minutes pour comprendre où vous en êtes
              et ce qui peut changer.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <FormField
                label="Prénom"
                name="prenom"
                value={form.prenom}
                onChange={handleChange}
                required
              />
              <FormField
                label="Nom"
                name="nom"
                value={form.nom}
                onChange={handleChange}
              />
            </div>

            <FormSelect
              label="Métier"
              name="metier"
              value={form.metier}
              onChange={handleChange}
              options={METIERS}
              required
            />

            <FormField
              label="Email professionnel"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
            />

            <FormSelect
              label="Chiffre d'affaires annuel estimé"
              name="ca_annuel"
              value={form.ca_annuel}
              onChange={handleChange}
              options={CA_OPTIONS}
              required
            />

            <div>
              <label
                className="block text-xs tracking-widest uppercase mb-2"
                style={{ fontFamily: "'Jost', sans-serif", color: "hsl(var(--or))" }}
              >
                Ce que vous aimeriez automatiser en priorité
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={4}
                maxLength={1500}
                className="w-full bg-transparent border px-4 py-3 outline-none resize-none focus:border-opacity-100 transition-colors"
                style={{
                  fontFamily: "'Jost', sans-serif",
                  color: "hsl(var(--lin))",
                  borderColor: "hsl(var(--or) / 0.4)",
                  borderRadius: 0,
                }}
              />
            </div>

            <div className="text-center pt-6">
              <button
                type="submit"
                disabled={submitting}
                className="inline-block px-12 py-4 text-sm tracking-widest uppercase transition-all duration-300 border disabled:opacity-50"
                style={{
                  fontFamily: "'Jost', sans-serif",
                  backgroundColor: "hsl(var(--or))",
                  color: "hsl(var(--nuit))",
                  borderColor: "hsl(var(--or))",
                  borderRadius: 0,
                }}
              >
                {submitting ? "Envoi en cours…" : "Envoyer ma demande"}
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

const FormField = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}) => (
  <div>
    <label
      className="block text-xs tracking-widest uppercase mb-2"
      style={{ fontFamily: "'Jost', sans-serif", color: "hsl(var(--or))" }}
    >
      {label}
      {required && " *"}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      maxLength={255}
      className="w-full bg-transparent border px-4 py-3 outline-none transition-colors"
      style={{
        fontFamily: "'Jost', sans-serif",
        color: "hsl(var(--lin))",
        borderColor: "hsl(var(--or) / 0.4)",
        borderRadius: 0,
      }}
    />
  </div>
);

const FormSelect = ({
  label,
  name,
  value,
  onChange,
  options,
  required,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
  required?: boolean;
}) => (
  <div>
    <label
      className="block text-xs tracking-widest uppercase mb-2"
      style={{ fontFamily: "'Jost', sans-serif", color: "hsl(var(--or))" }}
    >
      {label}
      {required && " *"}
    </label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      className="w-full bg-transparent border px-4 py-3 outline-none transition-colors appearance-none"
      style={{
        fontFamily: "'Jost', sans-serif",
        color: value ? "hsl(var(--lin))" : "hsl(var(--lin) / 0.5)",
        borderColor: "hsl(var(--or) / 0.4)",
        borderRadius: 0,
        backgroundImage:
          "url(\"data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23C8A96E' stroke-width='1.5'%3e%3cpath d='m6 9 6 6 6-6'/%3e%3c/svg%3e\")",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "right 0.75rem center",
        backgroundSize: "1.25rem",
        paddingRight: "2.5rem",
      }}
    >
      <option value="" style={{ backgroundColor: "hsl(var(--nuit))" }}>
        — Sélectionner —
      </option>
      {options.map((opt) => (
        <option key={opt} value={opt} style={{ backgroundColor: "hsl(var(--nuit))" }}>
          {opt}
        </option>
      ))}
    </select>
  </div>
);

export default Partenaires;
