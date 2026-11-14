export interface Internship {
  id: string;
  is_paid: boolean | null; // true or false only if the document explicitly mentions pay, a stipend, or “indemnité”; otherwise null
  pre_embauche: boolean; // Pre-employment opportunity
  titre: string; // The subject or role title
  nb_stagiaires: number; // The number of interns wanted
  duree: string; // The internship duration (e.g. “6 mois”)
  description: string; // A short description in the model’s own words
  technologies: string[]; // Technologies, languages, frameworks, and tools
  niveau_etude: "Ingénieur" | "Master 2" | "Bac+5" | "Bac+4" | "Ingénieur / Bac+5";
  localisation: string; // City, country, or office
  mission_principale: string; // The intern’s main mission in one or two sentences
  posted_date?: string;
  department?: string;
}

export interface Company {
  id: string;
  name: string;
  logoText: string;
  logoBg: string;
  workplace_type: "Remote" | "Hybrid" | "On site";
  location: string;
  tagline: string;
  internships: Internship[];
}

export const MOCK_COMPANIES: Company[] = [
  {
    id: "datadog",
    name: "Datadog",
    logoText: "DD",
    logoBg: "#632CA6",
    workplace_type: "Hybrid",
    location: "Paris, France",
    tagline: "Cloud monitoring & security platform",
    internships: [
      {
        id: "dd-01",
        titre: "PFE - Distributed Systems & Real-time Metrics Pipeline",
        is_paid: true, // Explicitly paid (stipend indicated)
        pre_embauche: true,
        nb_stagiaires: 2,
        duree: "6 mois",
        niveau_etude: "Ingénieur / Bac+5",
        localisation: "Paris (75009), France",
        mission_principale:
          "Concevoir et optimiser un module d'ingestion de flux de métriques haute vélocité en minimisant la latence et l'allocation mémoire à large échelle.",
        description:
          "Rejoignez l'équipe Core Pipeline pour travailler sur l'ingestion massive d'événements télémétriques. Vous participerez aux benchmarks de performance et à l'implémentation de structures de données sans verrou.",
        technologies: ["Go", "Kafka", "Kubernetes", "gRPC", "Prometheus"],
        posted_date: "Il y a 2 jours",
        department: "Core Engineering",
      },
      {
        id: "dd-02",
        titre: "PFE - Full-stack Observability Dashboard & Time-series Visualizer",
        is_paid: true,
        pre_embauche: true,
        nb_stagiaires: 1,
        duree: "6 mois",
        niveau_etude: "Bac+5",
        localisation: "Paris / Remote partiel",
        mission_principale:
          "Développer de nouveaux composants d'analyse visuelle de séries temporelles interactives et intégrer les alertes intelligentes dans la console principale.",
        description:
          "Ce stage se concentre sur l'expérience développeur et la réactivité du frontend des tableaux de bord. Vous collaborerez avec l'équipe UX pour créer des visualisations fluides sur de très grands volumes de points.",
        technologies: ["TypeScript", "React", "D3.js", "WebAssembly", "Tailwind CSS"],
        posted_date: "Il y a 4 jours",
        department: "Frontend Experience",
      },
    ],
  },
  {
    id: "doctolib",
    name: "Doctolib",
    logoText: "DL",
    logoBg: "#0596DE",
    workplace_type: "Hybrid",
    location: "Levallois-Perret, France",
    tagline: "Next-gen healthcare booking and teleconsultation",
    internships: [
      {
        id: "dl-01",
        titre: "PFE - AI Clinical Assistant & Structured Note Generation",
        is_paid: true,
        pre_embauche: true,
        nb_stagiaires: 1,
        duree: "6 mois",
        niveau_etude: "Ingénieur",
        localisation: "Levallois-Perret, France",
        mission_principale:
          "Développer et évaluer des modèles d'IA générative et de NLP pour transcrire et synthétiser les consultations médicales en dossiers structurés sécurisés.",
        description:
          "Au sein de l'équipe Doctolib AI, vous explorerez l'application des LLMs sécurisés pour assister les praticiens lors des consultations quotidiennes tout en garantissant une stricte conformité RGPD/HDS.",
        technologies: ["Python", "PyTorch", "HuggingFace", "FastAPI", "PostgreSQL"],
        posted_date: "Il y a 3 jours",
        department: "AI & Innovation Lab",
      },
      {
        id: "dl-02",
        titre: "PFE - Microservices Architecture & Patient Scheduling Engine",
        is_paid: true,
        pre_embauche: false,
        nb_stagiaires: 2,
        duree: "6 mois",
        niveau_etude: "Ingénieur / Bac+5",
        localisation: "Levallois-Perret, France",
        mission_principale:
          "Optimiser l'algorithme de calcul des créneaux de consultation en temps réel face à des millions de requêtes concurrentes.",
        description:
          "Vous intégrerez l'équipe Booking Engine afin d'extraire des fonctionnalités modulaires du monolithe vers des services autonomes à haute disponibilité.",
        technologies: ["Ruby on Rails", "Node.js", "Redis", "PostgreSQL", "Docker"],
        posted_date: "Il y a 1 semaine",
        department: "Core Backend",
      },
    ],
  },
  {
    id: "instadeep",
    name: "InstaDeep",
    logoText: "ID",
    logoBg: "#10B981",
    workplace_type: "On site",
    location: "Tunis, Tunisie",
    tagline: "Decision-Making AI and Deep Reinforcement Learning",
    internships: [
      {
        id: "id-01",
        titre: "PFE - Multi-Agent Reinforcement Learning for Logistics Routing",
        is_paid: true, // Indemnité de stage mensuelle
        pre_embauche: true,
        nb_stagiaires: 2,
        duree: "6 mois",
        niveau_etude: "Ingénieur",
        localisation: "Tunis (Les Berges du Lac), Tunisie",
        mission_principale:
          "Modéliser des environnements de transport complexes et entraîner des agents RL coopératifs pour optimiser les plannings de flotte ferroviaire et maritime.",
        description:
          "Vous travaillerez en étroite synergie avec nos chercheurs à Tunis et Londres pour concevoir des simulateurs custom et implémenter des architectures MARL état de l'art.",
        technologies: ["Python", "JAX", "Ray / RLlib", "PyTorch", "Git"],
        posted_date: "Il y a 1 jour",
        department: "Operational Research & AI",
      },
      {
        id: "id-02",
        titre: "PFE - Deep Learning for Structural Biology & Protein Design",
        is_paid: true,
        pre_embauche: true,
        nb_stagiaires: 1,
        duree: "6 mois",
        niveau_etude: "Master 2",
        localisation: "Tunis, Tunisie",
        mission_principale:
          "Contribuer au développement de réseaux de neurones géométriques 3D appliqués à la prédiction de conformation de macromolécules.",
        description:
          "Intégré à l'équipe BioAI, votre rôle sera d'explorer des représentations spatiales innovantes pour l'analyse de structures protéiques issues de banques publiques.",
        technologies: ["Python", "PyTorch Geometric", "BioPython", "CUDA", "Linux"],
        posted_date: "Il y a 5 jours",
        department: "BioAI",
      },
    ],
  },
  {
    id: "alan",
    name: "Alan",
    logoText: "AL",
    logoBg: "#FBBF24",
    workplace_type: "Remote",
    location: "Paris / Full Remote (France & Europe)",
    tagline: "The healthcare super-app for individuals & companies",
    internships: [
      {
        id: "al-01",
        titre: "PFE - Automated Claims Processing & Fraud Detection Engine",
        is_paid: true,
        pre_embauche: true,
        nb_stagiaires: 1,
        duree: "6 mois",
        niveau_etude: "Ingénieur / Bac+5",
        localisation: "Full Remote (France / UE)",
        mission_principale:
          "Bâtir des modèles automatisés de vérification de factures médicales et de détection d'anomalies de remboursement avec OCR et NLP.",
        description:
          "Alan traite des milliers de remboursements santé par jour. Ce stage de fin d'études a pour but d'automatiser plus de 80% des remboursements standard tout en maintenant une vigilance anti-fraude rigoureuse.",
        technologies: ["Python", "TypeScript", "React", "PostgreSQL", "Flask", "AWS"],
        posted_date: "Il y a 3 jours",
        department: "Insurance Tech",
      },
    ],
  },
  {
    id: "qonto",
    name: "Qonto",
    logoText: "QO",
    logoBg: "#EF4444",
    workplace_type: "Hybrid",
    location: "Paris, France",
    tagline: "Leading business finance management solution",
    internships: [
      {
        id: "qo-01",
        titre: "PFE - FinTech Payments Core & Instant SEPA Gateway",
        is_paid: true,
        pre_embauche: true,
        nb_stagiaires: 2,
        duree: "6 mois",
        niveau_etude: "Ingénieur",
        localisation: "Paris (75002), France",
        mission_principale:
          "Participer au refactoring de la passerelle de paiements instantanés SEPA et garantir la haute résilience des transactions bancaires.",
        description:
          "Vous découvrirez les coulisses des systèmes bancaires modernes, l'idempotence, la réconciliation financière et les standards de sécurité bancaire les plus stricts.",
        technologies: ["Ruby", "Kafka", "PostgreSQL", "Docker", "AWS", "Datadog"],
        posted_date: "Il y a 6 jours",
        department: "Banking Engine",
      },
      {
        id: "qo-02",
        titre: "PFE - Data Engineering & Financial Analytics Pipeline",
        is_paid: null, // Document does not explicitly mention compensation
        pre_embauche: false,
        nb_stagiaires: 1,
        duree: "4 à 6 mois",
        niveau_etude: "Bac+5",
        localisation: "Paris, France",
        mission_principale:
          "Construire des pipelines ETL scalables pour agréger les métriques financières et alimenter les modèles d'analyse de trésorerie.",
        description:
          "En binôme avec un Senior Data Engineer, vous participerez à l'amélioration de notre Data Warehouse dbt/Snowflake pour accélérer les rapports de trésorerie des PME.",
        technologies: ["Python", "SQL", "dbt", "Snowflake", "Airflow"],
        posted_date: "Il y a 1 semaine",
        department: "Data Platform",
      },
    ],
  },
  {
    id: "leboncoin",
    name: "Leboncoin",
    logoText: "LBC",
    logoBg: "#F97316",
    workplace_type: "Hybrid",
    location: "Paris, France",
    tagline: "France's #1 peer-to-peer marketplace & classifieds",
    internships: [
      {
        id: "lbc-01",
        titre: "PFE - Search Recommender System & Semantic Matching",
        is_paid: true,
        pre_embauche: true,
        nb_stagiaires: 1,
        duree: "6 mois",
        niveau_etude: "Ingénieur / Bac+5",
        localisation: "Paris (75010), France",
        mission_principale:
          "Améliorer le moteur de recherche d'annonces en intégrant des embeddings sémantiques multimodaux (texte + images de l'annonce).",
        description:
          "Vous explorerez des architectures de recherche vectorielle pour proposer aux millions d'utilisateurs quotidiens des annonces pertinentes même en cas de fautes d'orthographe ou de synonymes rares.",
        technologies: ["Python", "Elasticsearch", "Qdrant", "Transformers", "GCP"],
        posted_date: "Il y a 3 jours",
        department: "Search & Discovery",
      },
    ],
  },
];
