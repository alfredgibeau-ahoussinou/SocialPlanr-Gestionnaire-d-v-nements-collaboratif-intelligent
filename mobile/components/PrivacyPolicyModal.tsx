import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { IconSymbol } from './ui/IconSymbol';

interface PrivacyPolicyModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function PrivacyPolicyModal({ visible, onClose }: PrivacyPolicyModalProps) {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Politique de confidentialité</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <IconSymbol name="xmark" size={24} color="#6B7280" />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <Text style={styles.lastUpdated}>Dernière mise à jour : 25 janvier 2024</Text>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>1. Introduction et portée</Text>
            <Text style={styles.paragraph}>
              SocialPlanr SAS (&quot;nous&quot;, &quot;notre&quot;, &quot;SocialPlanr&quot;) s&apos;engage fermement à protéger votre vie 
              privée et vos données personnelles. Cette Politique de Confidentialité explique de manière 
              transparente comment nous collectons, utilisons, stockons, partageons et protégeons vos 
              informations personnelles lorsque vous utilisez nos services.
            </Text>
            <Text style={styles.paragraph}>
              Cette politique s&apos;applique à tous nos services : applications mobiles SocialPlanr (iOS, Android), 
              site web, API, services de notification, et tout autre service que nous pourrions proposer. 
              Elle est conforme au Règlement Général sur la Protection des Données (RGPD) et aux lois 
              françaises en matière de protection des données.
            </Text>
            <Text style={styles.paragraph}>
              En utilisant SocialPlanr, vous consentez au traitement de vos données personnelles 
              conformément à cette politique. Si vous n&apos;acceptez pas cette politique, veuillez ne pas 
              utiliser nos services.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>2. Responsable du traitement</Text>
            <Text style={styles.paragraph}>
              Le responsable du traitement de vos données personnelles est :
            </Text>
            <Text style={styles.bulletPoint}>📍 SocialPlanr SAS</Text>
            <Text style={styles.bulletPoint}>📧 privacy@socialplanr.com</Text>
            <Text style={styles.bulletPoint}>🏢 123 Avenue des Champs-Élysées, 75008 Paris, France</Text>
            <Text style={styles.bulletPoint}>📞 +33 1 23 45 67 89</Text>
            <Text style={styles.bulletPoint}>🆔 SIRET : 123 456 789 00012</Text>
            <Text style={styles.paragraph}>
              Notre Délégué à la Protection des Données (DPO) peut être contacté à l&apos;adresse : 
              dpo@socialplanr.com pour toute question relative à cette politique ou à vos droits.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>3. Données personnelles collectées</Text>
            <Text style={styles.paragraph}>
              Nous collectons différents types de données personnelles selon vos interactions avec nos services :
            </Text>
            
            <Text style={styles.subTitle}>3.1 Données d&apos;identification et de contact :</Text>
            <Text style={styles.bulletPoint}>• Nom et prénom</Text>
            <Text style={styles.bulletPoint}>• Adresse e-mail (obligatoire pour la création de compte)</Text>
            <Text style={styles.bulletPoint}>• Numéro de téléphone (optionnel)</Text>
            <Text style={styles.bulletPoint}>• Photo de profil (optionnelle)</Text>
            <Text style={styles.bulletPoint}>• Date de naissance (pour vérification d&apos;âge)</Text>

            <Text style={styles.subTitle}>3.2 Données de contenu et d&apos;activité :</Text>
            <Text style={styles.bulletPoint}>• Informations sur les événements que vous créez ou rejoignez</Text>
            <Text style={styles.bulletPoint}>• Messages et communications dans les groupes</Text>
            <Text style={styles.bulletPoint}>• Photos et fichiers partagés</Text>
            <Text style={styles.bulletPoint}>• Commentaires et réactions</Text>
            <Text style={styles.bulletPoint}>• Préférences et paramètres de l&apos;application</Text>

            <Text style={styles.subTitle}>3.3 Données techniques et d&apos;utilisation :</Text>
            <Text style={styles.bulletPoint}>• Adresse IP et informations de géolocalisation</Text>
            <Text style={styles.bulletPoint}>• Type d&apos;appareil, système d&apos;exploitation, version de l&apos;app</Text>
            <Text style={styles.bulletPoint}>• Identifiants uniques d&apos;appareil</Text>
            <Text style={styles.bulletPoint}>• Données de navigation et d&apos;utilisation (pages visitées, durée)</Text>
            <Text style={styles.bulletPoint}>• Logs de connexion et d&apos;erreurs</Text>
            <Text style={styles.bulletPoint}>• Données de performance et de crashes</Text>

            <Text style={styles.subTitle}>3.4 Données de paiement (le cas échéant) :</Text>
            <Text style={styles.bulletPoint}>• Informations de facturation (traitées par nos partenaires de paiement)</Text>
            <Text style={styles.bulletPoint}>• Historique des transactions</Text>
            <Text style={styles.bulletPoint}>• Statut d&apos;abonnement premium</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>4. Finalités et bases légales du traitement</Text>
            <Text style={styles.paragraph}>
              Nous traitons vos données personnelles pour les finalités suivantes, avec les bases légales 
              correspondantes selon le RGPD :
            </Text>
            
            <Text style={styles.subTitle}>4.1 Fourniture du service (base légale : exécution du contrat) :</Text>
            <Text style={styles.bulletPoint}>• Création et gestion de votre compte utilisateur</Text>
            <Text style={styles.bulletPoint}>• Facilitation de l&apos;organisation d&apos;événements et gestion des groupes</Text>
            <Text style={styles.bulletPoint}>• Traitement des paiements et gestion des abonnements</Text>
            <Text style={styles.bulletPoint}>• Communication entre utilisateurs via la plateforme</Text>

            <Text style={styles.subTitle}>4.2 Amélioration et sécurité (base légale : intérêt légitime) :</Text>
            <Text style={styles.bulletPoint}>• Analyse d&apos;utilisation pour améliorer nos services</Text>
            <Text style={styles.bulletPoint}>• Détection et prévention de la fraude et des abus</Text>
            <Text style={styles.bulletPoint}>• Résolution de problèmes techniques et bugs</Text>
            <Text style={styles.bulletPoint}>• Recherche et développement de nouvelles fonctionnalités</Text>

            <Text style={styles.subTitle}>4.3 Communications (base légale : consentement ou intérêt légitime) :</Text>
            <Text style={styles.bulletPoint}>• Envoi de notifications liées aux événements et groupes</Text>
            <Text style={styles.bulletPoint}>• Communications de service importantes</Text>
            <Text style={styles.bulletPoint}>• Newsletter et communications marketing (avec consentement)</Text>
            <Text style={styles.bulletPoint}>• Réponses à vos demandes de support</Text>

            <Text style={styles.subTitle}>4.4 Conformité légale (base légale : obligation légale) :</Text>
            <Text style={styles.bulletPoint}>• Réponse aux demandes des autorités compétentes</Text>
            <Text style={styles.bulletPoint}>• Respect des obligations comptables et fiscales</Text>
            <Text style={styles.bulletPoint}>• Conservation des données pour les durées légales requises</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>5. Partage et transfert des données</Text>
            <Text style={styles.paragraph}>
              SocialPlanr ne vend jamais vos données personnelles à des tiers. Nous pouvons partager 
              vos informations dans les circonstances strictement limitées suivantes :
            </Text>
            
            <Text style={styles.subTitle}>5.1 Avec d&apos;autres utilisateurs :</Text>
            <Text style={styles.bulletPoint}>• Informations de profil visibles selon vos paramètres de confidentialité</Text>
            <Text style={styles.bulletPoint}>• Contenu partagé dans les groupes et événements</Text>
            <Text style={styles.bulletPoint}>• Données nécessaires à l&apos;organisation d&apos;événements communs</Text>

            <Text style={styles.subTitle}>5.2 Avec nos prestataires de services :</Text>
            <Text style={styles.bulletPoint}>• Google Firebase (hébergement, base de données, authentification)</Text>
            <Text style={styles.bulletPoint}>• Services de notification push (Apple, Google)</Text>
            <Text style={styles.bulletPoint}>• Processeurs de paiement (Stripe, Apple Pay, Google Pay)</Text>
            <Text style={styles.bulletPoint}>• Services d&apos;analyse (anonymisées autant que possible)</Text>
            <Text style={styles.bulletPoint}>• Prestataires de support client et services techniques</Text>

            <Text style={styles.subTitle}>5.3 Transferts internationaux :</Text>
            <Text style={styles.paragraph}>
              Certains de nos prestataires peuvent être situés hors de l&apos;Union Européenne. Dans ce cas, 
              nous nous assurons que des garanties appropriées sont en place (clauses contractuelles 
              types, décisions d&apos;adéquation de la Commission européenne, etc.).
            </Text>

            <Text style={styles.subTitle}>5.4 Obligations légales :</Text>
            <Text style={styles.bulletPoint}>• Réponse aux demandes légalement contraignantes des autorités</Text>
            <Text style={styles.bulletPoint}>• Protection de nos droits, propriété et sécurité</Text>
            <Text style={styles.bulletPoint}>• Prévention de fraudes ou d&apos;activités illégales</Text>
            <Text style={styles.bulletPoint}>• En cas de fusion, acquisition ou vente d&apos;actifs (avec notification préalable)</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>6. Stockage et sécurité des données</Text>
            <Text style={styles.paragraph}>
              La sécurité de vos données personnelles est notre priorité absolue. Nous mettons en œuvre 
              des mesures de sécurité techniques et organisationnelles robustes pour protéger vos informations :
            </Text>
            
            <Text style={styles.subTitle}>6.1 Mesures techniques :</Text>
            <Text style={styles.bulletPoint}>• Chiffrement AES-256 des données au repos</Text>
            <Text style={styles.bulletPoint}>• Chiffrement TLS 1.3 pour toutes les transmissions</Text>
            <Text style={styles.bulletPoint}>• Hachage sécurisé des mots de passe (bcrypt)</Text>
            <Text style={styles.bulletPoint}>• Authentification multi-facteurs pour les administrateurs</Text>
            <Text style={styles.bulletPoint}>• Pare-feux et systèmes de détection d&apos;intrusion</Text>
            <Text style={styles.bulletPoint}>• Sauvegardes chiffrées et redondantes</Text>

            <Text style={styles.subTitle}>6.2 Mesures organisationnelles :</Text>
            <Text style={styles.bulletPoint}>• Accès aux données limité au personnel strictement nécessaire</Text>
            <Text style={styles.bulletPoint}>• Formation régulière du personnel sur la sécurité des données</Text>
            <Text style={styles.bulletPoint}>• Audits de sécurité réguliers</Text>
            <Text style={styles.bulletPoint}>• Procédures de gestion des incidents de sécurité</Text>
            <Text style={styles.bulletPoint}>• Contrats de confidentialité avec tous les employés</Text>

            <Text style={styles.subTitle}>6.3 Hébergement :</Text>
            <Text style={styles.paragraph}>
              Nos données sont hébergées sur Google Cloud Platform (Firebase) dans des centres de données 
              situés en Union Européenne, certifiés ISO 27001, SOC 2 Type II, et conformes aux standards 
              de sécurité les plus stricts.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>7. Durées de conservation</Text>
            <Text style={styles.paragraph}>
              Nous conservons vos données personnelles uniquement pendant la durée nécessaire aux 
              finalités du traitement, conformément aux obligations légales :
            </Text>
            
            <Text style={styles.subTitle}>7.1 Données de compte actif :</Text>
            <Text style={styles.bulletPoint}>• Données de profil : Tant que votre compte est actif</Text>
            <Text style={styles.bulletPoint}>• Données d&apos;événements : 5 ans après la fin de l&apos;événement</Text>
            <Text style={styles.bulletPoint}>• Messages et communications : 3 ans</Text>
            <Text style={styles.bulletPoint}>• Données de géolocalisation : 12 mois maximum</Text>

            <Text style={styles.subTitle}>7.2 Données de compte supprimé :</Text>
            <Text style={styles.bulletPoint}>• Suppression immédiate des données non essentielles</Text>
            <Text style={styles.bulletPoint}>• Conservation de certaines données pour obligations légales (3-10 ans)</Text>
            <Text style={styles.bulletPoint}>• Anonymisation des données d&apos;analyse après 2 ans</Text>

            <Text style={styles.subTitle}>7.3 Données techniques :</Text>
            <Text style={styles.bulletPoint}>• Logs de connexion : 12 mois</Text>
            <Text style={styles.bulletPoint}>• Données de support : 3 ans après résolution</Text>
            <Text style={styles.bulletPoint}>• Données de facturation : 10 ans (obligation légale)</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>8. Vos droits selon le RGPD</Text>
            <Text style={styles.paragraph}>
              Conformément au Règlement Général sur la Protection des Données, vous disposez des droits 
              suivants concernant vos données personnelles :
            </Text>
            
            <Text style={styles.subTitle}>8.1 Droit d&apos;accès (Article 15 RGPD) :</Text>
            <Text style={styles.bulletPoint}>• Obtenir confirmation que vos données sont traitées</Text>
            <Text style={styles.bulletPoint}>• Accéder à vos données et aux informations sur leur traitement</Text>
            <Text style={styles.bulletPoint}>• Obtenir une copie de vos données personnelles</Text>

            <Text style={styles.subTitle}>8.2 Droit de rectification (Article 16 RGPD) :</Text>
            <Text style={styles.bulletPoint}>• Corriger des données inexactes ou incomplètes</Text>
            <Text style={styles.bulletPoint}>• Mettre à jour vos informations personnelles</Text>

            <Text style={styles.subTitle}>8.3 Droit à l&apos;effacement (Article 17 RGPD) :</Text>
            <Text style={styles.bulletPoint}>• Demander la suppression de vos données</Text>
            <Text style={styles.bulletPoint}>• &quot;Droit à l&apos;oubli&quot; sous certaines conditions</Text>

            <Text style={styles.subTitle}>8.4 Droit à la limitation (Article 18 RGPD) :</Text>
            <Text style={styles.bulletPoint}>• Limiter le traitement de vos données dans certaines circonstances</Text>
            <Text style={styles.bulletPoint}>• Suspension temporaire du traitement</Text>

            <Text style={styles.subTitle}>8.5 Droit à la portabilité (Article 20 RGPD) :</Text>
            <Text style={styles.bulletPoint}>• Récupérer vos données dans un format structuré</Text>
            <Text style={styles.bulletPoint}>• Transférer vos données vers un autre service</Text>

            <Text style={styles.subTitle}>8.6 Droit d&apos;opposition (Article 21 RGPD) :</Text>
            <Text style={styles.bulletPoint}>• Vous opposer au traitement basé sur l&apos;intérêt légitime</Text>
            <Text style={styles.bulletPoint}>• Vous opposer au marketing direct</Text>

            <Text style={styles.subTitle}>8.7 Droits relatifs aux décisions automatisées (Article 22 RGPD) :</Text>
            <Text style={styles.bulletPoint}>• Ne pas faire l&apos;objet de décisions entièrement automatisées</Text>
            <Text style={styles.bulletPoint}>• Demander une intervention humaine dans le processus décisionnel</Text>

            <Text style={styles.paragraph}>
              Pour exercer ces droits, contactez-nous à privacy@socialplanr.com. Nous répondrons dans 
              un délai d&apos;un mois maximum. Une pièce d&apos;identité peut être demandée pour vérifier votre identité.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>9. Cookies et technologies de suivi</Text>
            <Text style={styles.paragraph}>
              SocialPlanr utilise diverses technologies pour améliorer votre expérience et analyser 
              l&apos;utilisation de nos services :
            </Text>
            
            <Text style={styles.subTitle}>9.1 Types de technologies utilisées :</Text>
            <Text style={styles.bulletPoint}>• Cookies de session (supprimés à la fermeture de l&apos;app)</Text>
            <Text style={styles.bulletPoint}>• Cookies persistants (stockés sur votre appareil)</Text>
            <Text style={styles.bulletPoint}>• Local Storage et Session Storage</Text>
            <Text style={styles.bulletPoint}>• Identifiants publicitaires (IDFA, GAID)</Text>
            <Text style={styles.bulletPoint}>• Pixels de suivi et web beacons</Text>

            <Text style={styles.subTitle}>9.2 Finalités :</Text>
            <Text style={styles.bulletPoint}>• Maintenir votre session de connexion</Text>
            <Text style={styles.bulletPoint}>• Mémoriser vos préférences et paramètres</Text>
            <Text style={styles.bulletPoint}>• Analyser l&apos;utilisation et améliorer nos services</Text>
            <Text style={styles.bulletPoint}>• Personnaliser votre expérience</Text>
            <Text style={styles.bulletPoint}>• Diffuser de la publicité ciblée (avec consentement)</Text>

            <Text style={styles.subTitle}>9.3 Gestion des cookies :</Text>
            <Text style={styles.paragraph}>
              Vous pouvez contrôler et supprimer les cookies via les paramètres de votre navigateur 
              ou appareil. Cependant, la désactivation de certains cookies peut affecter le 
              fonctionnement de l&apos;application.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>10. Protection des données des mineurs</Text>
            <Text style={styles.paragraph}>
              SocialPlanr attache une importance particulière à la protection des données des mineurs :
            </Text>
            
            <Text style={styles.subTitle}>10.1 Âge minimum :</Text>
            <Text style={styles.bulletPoint}>• 13 ans minimum pour créer un compte</Text>
            <Text style={styles.bulletPoint}>• Vérification de l&apos;âge lors de l&apos;inscription</Text>
            <Text style={styles.bulletPoint}>• Blocage automatique des comptes d&apos;enfants de moins de 13 ans</Text>

            <Text style={styles.subTitle}>10.2 Consentement parental (13-15 ans dans l&apos;UE) :</Text>
            <Text style={styles.bulletPoint}>• Demande de consentement parental vérifiable</Text>
            <Text style={styles.bulletPoint}>• Fonctionnalités limitées jusqu&apos;à obtention du consentement</Text>
            <Text style={styles.bulletPoint}>• Droit de retrait du consentement parental</Text>

            <Text style={styles.subTitle}>10.3 Protections renforcées :</Text>
            <Text style={styles.bulletPoint}>• Paramètres de confidentialité plus stricts par défaut</Text>
            <Text style={styles.bulletPoint}>• Limitation des données collectées</Text>
            <Text style={styles.bulletPoint}>• Surveillance renforcée des contenus</Text>
            <Text style={styles.bulletPoint}>• Suppression rapide en cas de signalement</Text>

            <Text style={styles.paragraph}>
              Si nous découvrons qu&apos;un enfant de moins de 13 ans nous a fourni des données personnelles, 
              nous supprimerons immédiatement ces informations de nos serveurs.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>11. Gestion des incidents de sécurité</Text>
            <Text style={styles.paragraph}>
              En cas de violation de données personnelles susceptible d&apos;engendrer un risque pour 
              vos droits et libertés :
            </Text>
            
            <Text style={styles.subTitle}>11.1 Notification aux autorités :</Text>
            <Text style={styles.bulletPoint}>• Notification à la CNIL dans les 72 heures</Text>
            <Text style={styles.bulletPoint}>• Documentation complète de l&apos;incident</Text>
            <Text style={styles.bulletPoint}>• Évaluation des risques et mesures prises</Text>

            <Text style={styles.subTitle}>11.2 Information des utilisateurs :</Text>
            <Text style={styles.bulletPoint}>• Notification individuelle si risque élevé</Text>
            <Text style={styles.bulletPoint}>• Information via l&apos;application ou email</Text>
            <Text style={styles.bulletPoint}>• Recommandations de sécurité personnalisées</Text>

            <Text style={styles.subTitle}>11.3 Mesures de mitigation :</Text>
            <Text style={styles.bulletPoint}>• Confinement immédiat de la brèche</Text>
            <Text style={styles.bulletPoint}>• Réinitialisation des mots de passe si nécessaire</Text>
            <Text style={styles.bulletPoint}>• Audit de sécurité complet et mesures correctives</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>12. Analyses d&apos;impact et protection des données</Text>
            <Text style={styles.paragraph}>
              Conformément à nos obligations de &quot;Privacy by Design&quot;, nous mettons en œuvre :
            </Text>
            
            <Text style={styles.subTitle}>12.1 Analyses d&apos;impact (AIPD) :</Text>
            <Text style={styles.bulletPoint}>• Évaluation systématique des risques pour chaque nouveau traitement</Text>
            <Text style={styles.bulletPoint}>• Consultation du DPO et, si nécessaire, de la CNIL</Text>
            <Text style={styles.bulletPoint}>• Révision régulière des analyses existantes</Text>

            <Text style={styles.subTitle}>12.2 Protection dès la conception :</Text>
            <Text style={styles.bulletPoint}>• Minimisation des données dès le développement</Text>
            <Text style={styles.bulletPoint}>• Chiffrement par défaut</Text>
            <Text style={styles.bulletPoint}>• Paramètres de confidentialité optimaux par défaut</Text>

            <Text style={styles.subTitle}>12.3 Registre des traitements :</Text>
            <Text style={styles.bulletPoint}>• Documentation de tous les traitements de données</Text>
            <Text style={styles.bulletPoint}>• Mise à jour régulière et disponible sur demande</Text>
            <Text style={styles.bulletPoint}>• Cartographie des flux de données</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>13. Modifications de cette politique</Text>
            <Text style={styles.paragraph}>
              SocialPlanr peut modifier cette Politique de Confidentialité pour s&apos;adapter aux 
              évolutions réglementaires, technologiques ou de nos services :
            </Text>
            
            <Text style={styles.subTitle}>13.1 Types de modifications :</Text>
            <Text style={styles.bulletPoint}>• Modifications mineures : Clarifications, corrections typographiques</Text>
            <Text style={styles.bulletPoint}>• Modifications substantielles : Nouvelles finalités, nouveaux partenaires</Text>
            <Text style={styles.bulletPoint}>• Modifications majeures : Changements fondamentaux de nos pratiques</Text>

            <Text style={styles.subTitle}>13.2 Processus de notification :</Text>
            <Text style={styles.bulletPoint}>• Notification par email 30 jours avant l&apos;entrée en vigueur</Text>
            <Text style={styles.bulletPoint}>• Notification push dans l&apos;application</Text>
            <Text style={styles.bulletPoint}>• Publication sur notre site web</Text>
            <Text style={styles.bulletPoint}>• Mise en évidence des changements importants</Text>

            <Text style={styles.paragraph}>
              Si vous n&apos;acceptez pas les modifications, vous pouvez fermer votre compte avant 
              leur entrée en vigueur. Votre utilisation continue après modification constitue 
              votre acceptation de la nouvelle politique.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>14. Recours et réclamations</Text>
            <Text style={styles.paragraph}>
              Si vous avez des questions ou préoccupations concernant le traitement de vos données :
            </Text>
            
            <Text style={styles.subTitle}>14.1 Contact direct :</Text>
            <Text style={styles.bulletPoint}>• privacy@socialplanr.com (équipe confidentialité)</Text>
            <Text style={styles.bulletPoint}>• dpo@socialplanr.com (Délégué à la Protection des Données)</Text>
            <Text style={styles.bulletPoint}>• Réponse sous 72 heures maximum</Text>

            <Text style={styles.subTitle}>14.2 Autorité de contrôle :</Text>
            <Text style={styles.paragraph}>
              Vous avez également le droit d&apos;introduire une réclamation auprès de la Commission 
              Nationale de l&apos;Informatique et des Libertés (CNIL) :
            </Text>
            <Text style={styles.bulletPoint}>🌐 www.cnil.fr</Text>
            <Text style={styles.bulletPoint}>📞 01 53 73 22 22</Text>
            <Text style={styles.bulletPoint}>📧 contact@cnil.fr</Text>
            <Text style={styles.bulletPoint}>📍 3 Place de Fontenoy, 75007 Paris</Text>

            <Text style={styles.subTitle}>14.3 Médiation :</Text>
            <Text style={styles.paragraph}>
              En cas de litige, nous privilégions la résolution amiable et pouvons recourir 
              à la médiation avant tout contentieux.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>15. Contact et informations légales</Text>
            <Text style={styles.paragraph}>
              Pour toute question relative à cette Politique de Confidentialité ou à vos droits :
            </Text>
            
            <Text style={styles.subTitle}>15.1 Contacts spécialisés :</Text>
            <Text style={styles.contactInfo}>📧 privacy@socialplanr.com (Questions générales sur la confidentialité)</Text>
            <Text style={styles.contactInfo}>📧 dpo@socialplanr.com (Délégué à la Protection des Données)</Text>
            <Text style={styles.contactInfo}>📧 security@socialplanr.com (Incidents de sécurité)</Text>
            <Text style={styles.contactInfo}>📧 legal@socialplanr.com (Questions juridiques)</Text>

            <Text style={styles.subTitle}>15.2 Coordonnées de l&apos;entreprise :</Text>
            <Text style={styles.contactInfo}>🏢 SocialPlanr SAS</Text>
            <Text style={styles.contactInfo}>📍 123 Avenue des Champs-Élysées, 75008 Paris, France</Text>
            <Text style={styles.contactInfo}>📞 +33 1 23 45 67 89</Text>
            <Text style={styles.contactInfo}>🆔 SIRET : 123 456 789 00012</Text>
            <Text style={styles.contactInfo}>💶 Capital social : 10 000 €</Text>
            <Text style={styles.contactInfo}>🏛️ RCS Paris B 123 456 789</Text>

            <Text style={styles.subTitle}>15.3 Heures d&apos;ouverture du support :</Text>
            <Text style={styles.contactInfo}>🕐 Lundi à Vendredi : 9h00 - 18h00 (CET)</Text>
            <Text style={styles.contactInfo}>📧 Support par email : 24h/24, 7j/7</Text>
            <Text style={styles.contactInfo}>⚡ Réponse sous 72h maximum</Text>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>
              En utilisant SocialPlanr, vous acceptez cette politique de confidentialité.
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  closeButton: {
    padding: 8,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  lastUpdated: {
    fontSize: 14,
    color: '#6B7280',
    fontStyle: 'italic',
    marginTop: 16,
    marginBottom: 24,
    textAlign: 'center',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 12,
  },
  subTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#374151',
    marginTop: 12,
    marginBottom: 8,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    color: '#4B5563',
    marginBottom: 8,
  },
  bulletPoint: {
    fontSize: 16,
    lineHeight: 24,
    color: '#4B5563',
    marginBottom: 4,
    marginLeft: 16,
  },
  contactInfo: {
    fontSize: 16,
    color: '#3B82F6',
    marginBottom: 4,
    marginLeft: 16,
  },
  footer: {
    backgroundColor: '#F3F4F6',
    padding: 16,
    borderRadius: 12,
    marginVertical: 24,
  },
  footerText: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
  },
}); 
 