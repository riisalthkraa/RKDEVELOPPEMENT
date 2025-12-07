#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script pour créer la version anglaise complète du site RK Développement
"""

# Dictionnaire de traduction FR -> EN
TRANSLATIONS = {
    # Meta & Title
    "Développeur Expert en Applications Sur Mesure (BTP, Éducatif, Santé). Solutions technologiquement avancées utilisant l'IA de manière intelligente.":
        "Expert Developer in Custom Applications (Construction, Education, Healthcare). Technologically advanced solutions using AI strategically.",

    "développeur, applications sur mesure, BTP, éducatif, intelligence artificielle, logiciels professionnels":
        "developer, custom applications, construction, educational, artificial intelligence, professional software",

    "VIEY David - Développeur Expert | Applications Sur Mesure BTP, Éducatif & IA":
        "VIEY David - Expert Developer | Custom Applications Construction, Education & AI",

    # Header / Navigation
    "RK Développement": "RK Development",
    "Développeur Expert": "Expert Developer",
    "Accueil": "Home",
    "Services": "Services",
    "Portfolio": "Portfolio",
    "Tarifs": "Pricing",
    "Contact": "Contact",
    "Demander un Devis": "Request a Quote",

    # Banner
    "Site Professionnel Principal": "Main Professional Website",
    "Applications Réellement Fonctionnelles": "Fully Functional Applications",

    # Hero Section
    "Disponible pour nouveaux projets": "Available for new projects",
    "Développeur Expert en": "Expert Developer in",
    "Applications Sur Mesure": "Custom Applications",
    "BTP • Éducatif • Santé": "Construction • Education • Healthcare",

    "Conception et développement d'applications professionnelles technologiquement avancées.":
        "Design and development of technologically advanced professional applications.",
    "Solutions intelligentes intégrant l'IA de manière stratégique pour maximiser votre efficacité.":
        "Smart solutions integrating AI strategically to maximize your efficiency.",

    "Applications Complètes": "Complete Applications",
    "Lignes de Code": "Lines of Code",
    "Mois de Développement": "Months of Development",
    "Technologies": "Technologies",

    "Voir Mes Projets": "View My Projects",
    "Me Contacter": "Contact Me",

    # Services Section
    "Mes Services": "My Services",
    "Développement de solutions logicielles complètes adaptées à vos besoins métier":
        "Development of complete software solutions tailored to your business needs",

    "Applications Santé": "Healthcare Applications",
    "Solutions de santé numérique avec chiffrement AES-256 et IA multi-providers. Découvrez CareLink : gestion familiale complète, prédictions ML et analyse automatique de documents médicaux.":
        "Digital health solutions with AES-256 encryption and multi-provider AI. Discover CareLink: complete family management, ML predictions and automatic medical document analysis.",

    "Applications BTP": "Construction Applications",
    "Solutions complètes pour professionnels du bâtiment. AutoCalc OptiDevis : IA prédictive de coûts, 100+ fonctionnalités, 140 tests automatisés, mode 100% hors-ligne. Transformez votre gestion de chantiers.":
        "Complete solutions for construction professionals. AutoCalc OptiDevis: AI cost prediction, 100+ features, 140 automated tests, 100% offline mode. Transform your site management.",

    "IA prédictive de coûts ML": "ML predictive cost AI",
    "Mode 100% hors-ligne": "100% offline mode",
    "tests automatisés": "automated tests",

    "Applications Éducatives": "Educational Applications",
    "Plateforme d'apprentissage intelligente avec IA. Cap'taine : 2000+ exercices CP-3ème, 13 mini-jeux, chatbot IA multi-providers, analyse ML des progressions. Gratuit et 100% local.":
        "Intelligent learning platform with AI. Cap'taine: 2000+ exercises CP-3ème, 13 mini-games, multi-provider AI chatbot, ML progress analysis. Free and 100% local.",

    "exercices interactifs": "interactive exercises",
    "Gamification complète": "Complete gamification",
    "badges": "badges",
    "IA multi-providers intégrée": "Integrated multi-provider AI",

    "Diagnostic & Réparation PC": "PC Diagnosis & Repair",
    "Innovation technologique avec Réalité Augmentée. FixMate : guides AR 3D, Digital Twin, prédiction de pannes par IA (85% précision), 60+ outils automatisés. L'avenir du dépannage informatique.":
        "Technological innovation with Augmented Reality. FixMate: 3D AR guides, Digital Twin, AI failure prediction (85% accuracy), 60+ automated tools. The future of IT troubleshooting.",

    "Guides AR 3D uniques": "Unique 3D AR guides",
    "Prédiction IA 85% précision": "AI prediction 85% accuracy",

    "Fiction Interactive": "Interactive Fiction",
    "Expériences narratives immersives avec mécaniques de jeu avancées. 2 livres-jeux complets, 40h+ de gameplay, 20+ fins par histoire. Narration branchante profonde et systèmes uniques.":
        "Immersive narrative experiences with advanced game mechanics. 2 complete gamebooks, 40h+ gameplay, 20+ endings per story. Deep branching narrative and unique systems.",

    "Narration branchante profonde": "Deep branching narrative",
    "Systèmes de jeu sur mesure": "Custom game systems",
    "Interface immersive": "Immersive interface",

    "Applications Web Avancées": "Advanced Web Applications",
    "Solutions web technologiquement poussées avec IA intégrée. Architecture moderne, performances optimisées, expérience utilisateur premium. Technologies de pointe pour des résultats exceptionnels.":
        "Technologically advanced web solutions with integrated AI. Modern architecture, optimized performance, premium user experience. Cutting-edge technologies for exceptional results.",

    # Portfolio
    "Projets Réalisés": "Completed Projects",
    "Applications professionnelles réellement fonctionnelles et déployées":
        "Fully functional and deployed professional applications",

    "GRATUIT": "FREE",
    "Application Vitrine": "Showcase Application",
    "Santé Numérique": "Digital Health",

    "Révolutionnez votre gestion santé familiale !": "Revolutionize your family health management!",
    "Application desktop gratuite avec 4 IA providers": "Free desktop application with 4 AI providers",
    "chiffrement militaire AES-256 et prédictions ML": "AES-256 military-grade encryption and ML predictions",
    "Analysez vos documents médicaux automatiquement": "Analyze your medical documents automatically",
    "suivez 50+ indicateurs santé": "track 50+ health indicators",
    "Technologie professionnelle accessible à tous": "Professional technology accessible to everyone",

    "IA 4 Providers": "4 AI Providers",
    "Prédictions ML": "ML Predictions",
    "Indicateurs Santé": "Health Indicators",
    "Téléchargement Gratuit": "Free Download",

    "Gestion Pro": "Professional Management",
    "L'avenir du diagnostic PC est là !": "The future of PC diagnosis is here!",
    "Unique au monde avec guides AR 3D et Digital Twin de votre ordinateur":
        "Unique in the world with 3D AR guides and Digital Twin of your computer",
    "L'IA prédit vos pannes avec 85% de précision": "AI predicts your failures with 85% accuracy",
    "60+ outils automatiques vous font économiser des centaines d'euros en réparations":
        "60+ automated tools save you hundreds of euros in repairs",
    "Innovation technologique sans précédent": "Unprecedented technological innovation",

    "Prédiction Pannes": "Failure Prediction",
    "Digital Twin": "Digital Twin",
    "Outils Réparation": "Repair Tools",

    "Gestion BTP": "Construction Management",
    "Transformez votre gestion BTP !": "Transform your construction management!",
    "L'IA prédit vos coûts avec précision": "AI predicts your costs accurately",
    "Machine Learning": "Machine Learning",
    "100% hors-ligne pour une sécurité totale": "100% offline for total security",
    "100+ fonctionnalités professionnelles": "100+ professional features",
    "multi-entreprises": "multi-company",
    "thèmes": "themes",
    "garantissant fiabilité maximale": "guaranteeing maximum reliability",
    "La solution BTP la plus complète du marché pour 300€ à vie !":
        "The most complete construction solution on the market for €300 lifetime!",

    "IA Prédictive": "Predictive AI",
    "100% Offline": "100% Offline",
    "Tests": "Tests",
    "Multi-Entreprises": "Multi-Company",
    "LICENCE À VIE": "LIFETIME LICENSE",

    "Éducation & IA": "Education & AI",
    "100% GRATUIT": "100% FREE",
    "VERSION WEB + DESKTOP": "WEB + DESKTOP VERSION",

    "Offrez le meilleur à vos enfants - 100% GRATUIT !":
        "Give the best to your children - 100% FREE!",
    "Assistant éducatif révolutionnaire CP-3ème avec 2000+ exercices interactifs":
        "Revolutionary educational assistant CP-3ème with 2000+ interactive exercises",
    "mini-jeux captivants": "captivating mini-games",
    "Chatbot IA 4 providers": "4-provider AI chatbot",
    "gamification complète": "complete gamification",
    "analyse ML personnalisée": "personalized ML analysis",
    "Disponible web ET desktop": "Available web AND desktop",
    "100% local et privé": "100% local and private",
    "L'éducation intelligente accessible à tous gratuitement !":
        "Smart education accessible to everyone for free!",

    "IA Multi-Providers": "Multi-Provider AI",
    "Exercices": "Exercises",
    "Badges": "Badges",
    "Mini-Jeux": "Mini-Games",
    "Version Web": "Web Version",
    "Télécharger": "Download",

    "JEUX": "GAMES",
    "Livres-Jeux Narratifs": "Narrative Gamebooks",

    "Plongez dans 2 épopées narratives GRATUITES !":
        "Dive into 2 FREE narrative epics!",
    "Le Ronin sans Nom (Japon féodal) et Le Sceau des Cinq (Dark Fantasy)":
        "The Nameless Ronin (Feudal Japan) and The Seal of Five (Dark Fantasy)",
    "40h+ de gameplay intense": "40h+ of intense gameplay",
    "narration branchante ultra-profonde": "ultra-deep branching narrative",
    "20+ fins par jeu": "20+ endings per game",
    "Systèmes de combat et progression uniques": "Unique combat and progression systems",
    "Découvrez des histoires qui marquent - 100% gratuit, 100% passion !":
        "Discover stories that leave a mark - 100% free, 100% passion!",

    "40+h Gameplay": "40+h Gameplay",
    "Fins": "Endings",

    # Autres projets
    "Autres Projets": "Other Projects",
    "Projets en cours de développement et sites vitrines":
        "Projects in development and showcase websites",

    "Royaume des Sandwiches": "Kingdom of Sandwiches",
    "Site Vitrine Gratuit": "Free Showcase Website",
    "Site web vitrine moderne pour restaurant halal avec menu interactif":
        "Modern showcase website for halal restaurant with interactive menu",
    "En savoir plus": "Learn more",

    "AppForge": "AppForge",
    "En Développement - 70%": "In Development - 70%",
    "Forge de création d'applications avec templates prêts à l'emploi et IA générative":
        "Application creation forge with ready-to-use templates and generative AI",

    "MatchPro IA": "MatchPro AI",
    "En Développement - 65%": "In Development - 65%",
    "Plateforme de mise en relation professionnelle intelligente avec matching par IA":
        "Intelligent professional networking platform with AI matching",

    "LocaMalin": "LocaMalin",
    "En Développement - 60%": "In Development - 60%",
    "Solution complète de gestion locative avec analytics et prédictions":
        "Complete rental management solution with analytics and predictions",

    # Compétences
    "Compétences": "Skills",
    "Technologies et domaines d'expertise": "Technologies and areas of expertise",

    "Frontend": "Frontend",
    "Backend & Database": "Backend & Database",
    "Outils & Méthodologies": "Tools & Methodologies",
    "Domaines d'Expertise": "Areas of Expertise",

    "Intelligence Artificielle": "Artificial Intelligence",
    "Sécurité & RGPD": "Security & GDPR",
    "Gestion BTP & Entreprise": "Construction & Business Management",
    "Algorithmes Métier": "Business Algorithms",
    "Applications Éducatives": "Educational Applications",

    # À propos
    "À propos": "About",

    "Développeur passionné spécialisé dans la création d'applications sur mesure technologiquement avancées":
        "Passionate developer specialized in creating technologically advanced custom applications",
    "avec une expertise dans le": "with expertise in",
    "17 mois de développement intensif": "17 months of intensive development",
    "Juillet 2024 - Novembre 2025": "July 2024 - November 2025",
    "ayant abouti à": "resulting in",
    "8 applications professionnelles complètes": "8 complete professional applications",
    "totalisant plus de": "totaling more than",
    "404,000 lignes de code": "404,000 lines of code",

    "Mon approche combine excellence technique et": "My approach combines technical excellence and",
    "intelligence artificielle utilisée de manière stratégique": "artificial intelligence used strategically",
    "Expertise en": "Expertise in",
    "Réalité Augmentée 3D": "3D Augmented Reality",
    "chiffrement militaire AES-256": "AES-256 military-grade encryption",
    "architectures innovantes": "innovative architectures",
    "Toutes mes applications sont": "All my applications are",
    "réellement fonctionnelles": "truly functional",
    "et déployées": "and deployed",

    "Innovations technologiques": "Technological innovations",
    "IA multi-providers avec fallback automatique": "Multi-provider AI with automatic fallback",
    "guides AR 3D uniques au monde": "3D AR guides unique in the world",
    "pour réparation PC": "for PC repair",
    "prédictions intelligentes": "intelligent predictions",
    "santé, pannes, coûts BTP": "health, failures, construction costs",
    "mode 100% hors-ligne": "100% offline mode",
    "avec synchronisation": "with synchronization",
    "Qualité garantie par": "Quality guaranteed by",
    "140+ tests automatisés": "140+ automated tests",
    "sur mes applications principales": "on my main applications",

    "IA Stratégique": "Strategic AI",
    "Intelligence artificielle utilisée de manière intelligente et ciblée":
        "Artificial intelligence used intelligently and precisely",

    "Innovation Technologique": "Technological Innovation",
    "AR 3D, ML prédictif, architectures avancées": "3D AR, predictive ML, advanced architectures",

    "Applications Réelles": "Real Applications",
    "Toutes mes apps sont fonctionnelles et déployées": "All my apps are functional and deployed",

    # Tarifs
    "Tarification transparente": "Transparent Pricing",
    "Tarifs & Prestations": "Pricing & Services",
    "Des tarifs compétitifs pour des solutions professionnelles de qualité":
        "Competitive prices for quality professional solutions",

    "Développement sur mesure": "Custom Development",
    "Tarif horaire": "Hourly Rate",
    "Développement personnalisé": "Custom Development",
    "Code professionnel et testé": "Professional and tested code",
    "Documentation complète": "Complete Documentation",
    "Support technique inclus": "Technical Support Included",
    "Modifications illimitées": "Unlimited Modifications",
    "Demander un devis": "Request a Quote",

    "Site Vitrine Essentiel": "Essential Showcase Website",
    "Parfait pour démarrer": "Perfect to start",
    "forfait": "package",
    "Design responsive moderne": "Modern responsive design",
    "pages": "pages",
    "Formulaire de contact": "Contact Form",
    "Optimisation SEO basique": "Basic SEO optimization",
    "Version mobile optimisée": "Optimized mobile version",
    "Livraison sous 15 jours": "Delivery within 15 days",
    "Démarrer mon projet": "Start my project",

    "Site Vitrine Pro": "Pro Showcase Website",
    "Complet et performant": "Complete and efficient",
    "Design premium personnalisé": "Premium customized design",
    "Animations & interactions": "Animations & interactions",
    "SEO avancé + Analytics": "Advanced SEO + Analytics",
    "Blog intégré": "Integrated Blog",
    "Multi-langue (option)": "Multi-language (option)",
    "Hébergement 1 an offert": "1 year hosting included",

    "Site E-commerce": "E-commerce Website",
    "Boutique en ligne complète": "Complete online store",
    "à partir de": "starting from",
    "Catalogue produits illimité": "Unlimited product catalog",
    "Panier & paiement sécurisé": "Cart & secure payment",
    "Gestion stocks & commandes": "Stock & order management",
    "Tableau de bord admin": "Admin dashboard",
    "Emails automatiques": "Automated emails",
    "Formation complète": "Complete training",

    "Application Web": "Web Application",
    "Solution métier complète": "Complete business solution",
    "Populaire": "Popular",
    "Sur devis": "On quote",
    "Analyse approfondie des besoins": "In-depth needs analysis",
    "Architecture évolutive": "Scalable architecture",
    "Base de données sécurisée": "Secure database",
    "Interface d'administration": "Administration interface",
    "Intégration IA possible": "AI integration possible",
    "Tests automatisés": "Automated tests",
    "Maintenance et support": "Maintenance and support",

    "Application Mobile": "Mobile Application",
    "iOS & Android": "iOS & Android",
    "React Native (cross-platform)": "React Native (cross-platform)",
    "Design natif iOS/Android": "Native iOS/Android design",
    "Mode hors-ligne possible": "Offline mode possible",
    "Publication sur les stores": "Publication on stores",
    "Backend inclus si nécessaire": "Backend included if necessary",

    "Application Desktop": "Desktop Application",
    "Windows, Mac, Linux": "Windows, Mac, Linux",
    "Electron (multi-plateforme)": "Electron (multi-platform)",
    "Performance optimisée": "Optimized performance",
    "Installation simplifiée": "Simplified installation",
    "Fonctionnement hors-ligne": "Offline operation",
    "Mises à jour automatiques": "Automatic updates",

    "Maintenance & Support": "Maintenance & Support",
    "Forfait mensuel": "Monthly package",
    "mois": "month",
    "Corrections de bugs": "Bug fixes",
    "Mises à jour de sécurité": "Security updates",
    "Support technique prioritaire": "Priority technical support",
    "Sauvegardes régulières": "Regular backups",
    "5h de modifications/mois": "5h of modifications/month",
    "Souscrire": "Subscribe",

    "Tous les tarifs sont HT.": "All prices exclude VAT.",
    "Devis personnalisé gratuit sous 48h": "Free personalized quote within 48h",
    "Paiement échelonné possible pour les projets supérieurs à 2000€":
        "Installment payment possible for projects over €2000",
    "Satisfaction garantie ou remboursement": "Satisfaction guaranteed or refund",

    # Contact
    "Parlons de votre projet": "Let's talk about your project",

    "Prêt à concrétiser votre projet ?": "Ready to realize your project?",
    "Contactez-moi pour discuter de vos besoins et obtenir un devis personnalisé":
        "Contact me to discuss your needs and get a personalized quote",

    "Votre Nom": "Your Name",
    "Entrez votre nom": "Enter your name",
    "Votre Email": "Your Email",
    "Entrez votre email": "Enter your email",
    "Votre Message": "Your Message",
    "Décrivez votre projet...": "Describe your project...",
    "Envoyer le Message": "Send Message",

    "Email": "Email",
    "Envoyer un email": "Send an email",

    "GitHub": "GitHub",
    "Voir mes projets": "View my projects",

    # Footer
    "Développeur Expert en Applications Sur Mesure • BTP • Éducatif • Santé • IA Avancée":
        "Expert Developer in Custom Applications • Construction • Education • Healthcare • Advanced AI",

    "Navigation": "Navigation",
    "Solutions BTP": "Construction Solutions",
    "Solutions Éducatives": "Educational Solutions",
    "Applications Santé": "Healthcare Applications",
    "Diagnostic PC & AR": "PC Diagnosis & AR",
    "Applications Web IA": "AI Web Applications",

    "Légal": "Legal",
    "Mentions Légales": "Legal Notice",
    "CGV": "Terms of Sale",
    "Confidentialité": "Privacy",

    "Demander un Devis": "Request a Quote",

    "Développeur Expert • Applications Sur Mesure • BTP • Éducatif • Santé • IA Avancée":
        "Expert Developer • Custom Applications • Construction • Education • Healthcare • Advanced AI",

    "Tous droits réservés": "All rights reserved",
}

def translate_file(input_file, output_file):
    """Traduire un fichier HTML"""
    print(f"Traduction de {input_file} vers {output_file}...")

    with open(input_file, 'r', encoding='utf-8') as f:
        content = f.read()

    # Remplacer lang="fr" par lang="en"
    content = content.replace('lang="fr"', 'lang="en"')

    # Appliquer toutes les traductions
    for fr, en in TRANSLATIONS.items():
        content = content.replace(fr, en)

    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(content)

    print(f"OK - {output_file} cree")

def main():
    import os
    os.chdir(r'C:\Users\RK\Desktop\SITES PROFESSIONEL ET PORTFOLIO\SITE DE PRESENTATION PROFESSIONELLE GENERAL')

    # Traduire index.html
    translate_file('index.html', 'index-en.html')

    print("\nTraduction terminee!")

if __name__ == '__main__':
    main()
