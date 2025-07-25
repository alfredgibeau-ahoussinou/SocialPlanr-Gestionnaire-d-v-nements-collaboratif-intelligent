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

interface TermsOfServiceModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function TermsOfServiceModal({ visible, onClose }: TermsOfServiceModalProps) {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Conditions d&apos;utilisation</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <IconSymbol name="xmark" size={24} color="#6B7280" />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <Text style={styles.lastUpdated}>Dernière mise à jour : 25 janvier 2024</Text>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>1. Acceptation des conditions</Text>
            <Text style={styles.paragraph}>
              En accédant à l&apos;application SocialPlanr ou en l&apos;utilisant, que ce soit via nos applications mobiles 
              (iOS, Android), notre site web, ou tout autre moyen, vous acceptez d&apos;être juridiquement lié par 
              ces Conditions d&apos;Utilisation dans leur intégralité.
            </Text>
            <Text style={styles.paragraph}>
              Si vous n&apos;acceptez pas l&apos;une ou l&apos;ensemble de ces conditions, vous n&apos;êtes pas autorisé à accéder 
              ou utiliser SocialPlanr. Votre utilisation continue du service après toute modification de ces 
              conditions constitue votre acceptation de ces modifications.
            </Text>
            <Text style={styles.paragraph}>
              Ces conditions s&apos;appliquent à tous les utilisateurs, y compris les visiteurs, utilisateurs 
              enregistrés, et toute autre personne accédant au service.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>2. Description du service</Text>
            <Text style={styles.paragraph}>
              SocialPlanr est une plateforme numérique de planification d&apos;événements collaboratifs et de 
              gestion de groupes sociaux. Notre service comprend, sans s&apos;y limiter :
            </Text>
            <Text style={styles.bulletPoint}>• Création et gestion de groupes d&apos;amis et de communautés</Text>
            <Text style={styles.bulletPoint}>• Planification et organisation d&apos;événements sociaux</Text>
            <Text style={styles.bulletPoint}>• Système de partage équitable des frais et dépenses</Text>
            <Text style={styles.bulletPoint}>• Synchronisation avec calendriers externes (Google, Apple, Outlook)</Text>
            <Text style={styles.bulletPoint}>• Système de notifications et rappels automatiques</Text>
            <Text style={styles.bulletPoint}>• Fonctionnalités de chat et communication de groupe</Text>
            <Text style={styles.bulletPoint}>• Gestion des invitations et RSVPs</Text>
            <Text style={styles.bulletPoint}>• Outils d&apos;analyse et de suivi des événements</Text>
            <Text style={styles.paragraph}>
              SocialPlanr se réserve le droit de modifier, suspendre ou interrompre tout ou partie du 
              service à tout moment, avec ou sans préavis. Nous nous efforçons de maintenir la disponibilité 
              du service 24h/24 et 7j/7, mais ne garantissons pas un accès ininterrompu.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>3. Compte utilisateur et responsabilités</Text>
            <Text style={styles.paragraph}>
              Pour utiliser certaines fonctionnalités de SocialPlanr, vous devez créer un compte utilisateur. 
              Vous vous engagez à :
            </Text>
            <Text style={styles.bulletPoint}>• Fournir des informations exactes, actuelles et complètes</Text>
            <Text style={styles.bulletPoint}>• Maintenir et mettre à jour rapidement vos informations</Text>
            <Text style={styles.bulletPoint}>• Maintenir la sécurité de votre mot de passe</Text>
            <Text style={styles.bulletPoint}>• Être responsable de toute activité sous votre compte</Text>
            <Text style={styles.bulletPoint}>• Notifier immédiatement toute utilisation non autorisée</Text>
            <Text style={styles.paragraph}>
              Vous ne pouvez avoir qu&apos;un seul compte par personne. La création de comptes multiples, 
              factices ou pour le compte d&apos;autrui sans autorisation est interdite. Vous devez avoir 
              au moins 13 ans pour créer un compte.
            </Text>
            <Text style={styles.paragraph}>
              SocialPlanr se réserve le droit de suspendre ou résilier votre compte si nous déterminons, 
              à notre seule discrétion, que vous avez violé ces conditions.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>4. Utilisation acceptable et conduite</Text>
            <Text style={styles.paragraph}>
              En utilisant SocialPlanr, vous acceptez de respecter toutes les lois et réglementations 
              applicables. Vous vous engagez expressément à ne pas :
            </Text>
            <Text style={styles.bulletPoint}>• Utiliser le service à des fins illégales ou non autorisées</Text>
            <Text style={styles.bulletPoint}>• Violer les droits d&apos;autrui, y compris les droits de propriété intellectuelle</Text>
            <Text style={styles.bulletPoint}>• Partager du contenu diffamatoire, obscène, menaçant ou discriminatoire</Text>
            <Text style={styles.bulletPoint}>• Harceler, intimider ou menacer d&apos;autres utilisateurs</Text>
            <Text style={styles.bulletPoint}>• Usurper l&apos;identité d&apos;une autre personne ou entité</Text>
            <Text style={styles.bulletPoint}>• Transmettre des virus, malwares ou codes malveillants</Text>
            <Text style={styles.bulletPoint}>• Tenter de contourner les mesures de sécurité du service</Text>
            <Text style={styles.bulletPoint}>• Collecter ou stocker des données personnelles d&apos;autres utilisateurs</Text>
            <Text style={styles.bulletPoint}>• Utiliser des robots, scrapers ou moyens automatisés pour accéder au service</Text>
            <Text style={styles.bulletPoint}>• Interférer avec ou perturber le fonctionnement du service</Text>
            <Text style={styles.paragraph}>
              SocialPlanr se réserve le droit, mais n&apos;a pas l&apos;obligation, de surveiller, réviser, modifier 
              ou supprimer tout contenu utilisateur qui viole ces conditions.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>5. Contenu utilisateur et licences</Text>
            <Text style={styles.paragraph}>
              Vous conservez tous vos droits sur le contenu que vous créez et partagez via SocialPlanr 
              (photos, textes, informations d&apos;événements, etc.). Cependant, en publiant du contenu, 
              vous nous accordez une licence mondiale, non exclusive, libre de redevances pour :
            </Text>
            <Text style={styles.bulletPoint}>• Afficher, distribuer et reproduire votre contenu sur la plateforme</Text>
            <Text style={styles.bulletPoint}>• Créer des œuvres dérivées à des fins d&apos;amélioration du service</Text>
            <Text style={styles.bulletPoint}>• Utiliser votre contenu à des fins promotionnelles (avec votre consentement)</Text>
            <Text style={styles.paragraph}>
              Cette licence prend fin lorsque vous supprimez votre contenu ou votre compte, sauf si 
              le contenu a été partagé avec d&apos;autres utilisateurs qui l&apos;ont conservé.
            </Text>
            <Text style={styles.paragraph}>
              Vous garantissez que vous possédez tous les droits nécessaires sur le contenu que vous 
              partagez et que ce contenu ne viole aucun droit de tiers.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>6. Données personnelles et confidentialité</Text>
            <Text style={styles.paragraph}>
              La protection de vos données personnelles est une priorité pour SocialPlanr. La collecte, 
              l&apos;utilisation, le stockage et le partage de vos données personnelles sont régies par notre 
              Politique de confidentialité, qui fait partie intégrante de ces conditions d&apos;utilisation.
            </Text>
            <Text style={styles.paragraph}>
              En utilisant SocialPlanr, vous consentez expressément au traitement de vos données 
              personnelles conformément à notre Politique de confidentialité. Vous avez le droit d&apos;accéder, 
              de rectifier, de supprimer vos données et de vous opposer à leur traitement dans les 
              conditions prévues par la réglementation applicable.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>7. Propriété intellectuelle et droits d&apos;auteur</Text>
            <Text style={styles.paragraph}>
              SocialPlanr, incluant mais non limité à son nom, logo, design, fonctionnalités, code source, 
              algorithmes, interface utilisateur, et tous les contenus créés par SocialPlanr, sont la 
              propriété exclusive de SocialPlanr SAS et sont protégés par :
            </Text>
            <Text style={styles.bulletPoint}>• Les lois françaises et internationales sur le droit d&apos;auteur</Text>
            <Text style={styles.bulletPoint}>• Les lois sur les marques déposées</Text>
            <Text style={styles.bulletPoint}>• Les lois sur les brevets et la propriété industrielle</Text>
            <Text style={styles.bulletPoint}>• Les accords internationaux sur la propriété intellectuelle</Text>
            <Text style={styles.paragraph}>
              Aucune disposition de ces conditions ne vous confère de droits sur nos marques, logos, 
              noms de domaine ou autres éléments distinctifs de notre marque. Toute utilisation non 
              autorisée constitue une violation de nos droits de propriété intellectuelle.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>8. Disponibilité du service et maintenance</Text>
            <Text style={styles.paragraph}>
              SocialPlanr s&apos;efforce de maintenir la disponibilité et la performance optimale du service, 
              mais ne peut garantir un fonctionnement ininterrompu. Le service peut être temporairement 
              indisponible en raison de :
            </Text>
            <Text style={styles.bulletPoint}>• Maintenance planifiée ou urgente</Text>
            <Text style={styles.bulletPoint}>• Problèmes techniques ou défaillances d&apos;infrastructure</Text>
            <Text style={styles.bulletPoint}>• Cyberattaques ou problèmes de sécurité</Text>
            <Text style={styles.bulletPoint}>• Cas de force majeure</Text>
            <Text style={styles.paragraph}>
              Nous nous efforçons de minimiser les interruptions et de vous informer préalablement 
              des maintenances planifiées via l&apos;application ou par email.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>9. Services tiers et intégrations</Text>
            <Text style={styles.paragraph}>
              SocialPlanr peut intégrer ou permettre l&apos;accès à des services tiers (calendriers, réseaux 
              sociaux, services de paiement, etc.). Ces intégrations sont soumises aux conditions 
              d&apos;utilisation et politiques de confidentialité des tiers concernés.
            </Text>
            <Text style={styles.paragraph}>
              SocialPlanr n&apos;est pas responsable du contenu, des pratiques de confidentialité, ou des 
              services fournis par ces tiers. Votre utilisation de services tiers se fait à vos propres 
              risques et sous votre entière responsabilité.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>10. Paiements et frais</Text>
            <Text style={styles.paragraph}>
              L&apos;utilisation de base de SocialPlanr est gratuite. Cependant, certaines fonctionnalités 
              premium peuvent être payantes. En cas de services payants :
            </Text>
            <Text style={styles.bulletPoint}>• Les prix sont indiqués en euros TTC</Text>
            <Text style={styles.bulletPoint}>• Le paiement s&apos;effectue via les plateformes d&apos;app stores</Text>
            <Text style={styles.bulletPoint}>• Les abonnements se renouvellent automatiquement</Text>
            <Text style={styles.bulletPoint}>• Vous pouvez annuler à tout moment via les paramètres</Text>
            <Text style={styles.paragraph}>
              Aucun remboursement n&apos;est accordé pour les périodes d&apos;abonnement entamées, sauf 
              disposition légale contraire ou défaillance avérée du service de notre fait.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>11. Limitation de responsabilité et garanties</Text>
            <Text style={styles.paragraph}>
              SocialPlanr est fourni &quot;tel quel&quot; et &quot;selon disponibilité&quot; sans garantie d&apos;aucune sorte. 
              Dans la mesure permise par la loi, SocialPlanr décline toute garantie :
            </Text>
            <Text style={styles.bulletPoint}>• De fonctionnement ininterrompu ou sans erreur</Text>
            <Text style={styles.bulletPoint}>• D&apos;exactitude, de fiabilité ou d&apos;exhaustivité du contenu</Text>
            <Text style={styles.bulletPoint}>• D&apos;absence de virus ou composants nuisibles</Text>
            <Text style={styles.bulletPoint}>• De compatibilité avec vos équipements</Text>
            <Text style={styles.paragraph}>
              En aucun cas SocialPlanr ne pourra être tenu responsable de dommages indirects, accessoires, 
              spéciaux, punitifs ou consécutifs, y compris mais non limités à :
            </Text>
            <Text style={styles.bulletPoint}>• Perte de profits, de données ou d&apos;opportunités commerciales</Text>
            <Text style={styles.bulletPoint}>• Interruption d&apos;activité ou coûts de substitution</Text>
            <Text style={styles.bulletPoint}>• Dommages résultant de l&apos;utilisation ou de l&apos;impossibilité d&apos;utiliser le service</Text>
            <Text style={styles.paragraph}>
              Notre responsabilité totale ne pourra en aucun cas excéder le montant des sommes versées 
              par vous au cours des douze (12) derniers mois.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>12. Indemnisation</Text>
            <Text style={styles.paragraph}>
              Vous acceptez d&apos;indemniser et de défendre SocialPlanr, ses dirigeants, employés, agents 
              et partenaires contre toute réclamation, demande, dommage, perte ou dépense (y compris 
              les honoraires d&apos;avocat raisonnables) résultant de :
            </Text>
            <Text style={styles.bulletPoint}>• Votre utilisation du service ou violation de ces conditions</Text>
            <Text style={styles.bulletPoint}>• Votre contenu ou vos activités sur la plateforme</Text>
            <Text style={styles.bulletPoint}>• Votre violation des droits de tiers</Text>
            <Text style={styles.bulletPoint}>• Toute activité frauduleuse ou illégale de votre part</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>13. Modifications des conditions</Text>
            <Text style={styles.paragraph}>
              SocialPlanr se réserve le droit de modifier ces conditions d&apos;utilisation à tout moment. 
              Les modifications entreront en vigueur :
            </Text>
            <Text style={styles.bulletPoint}>• Immédiatement après publication pour les modifications mineures</Text>
            <Text style={styles.bulletPoint}>• 30 jours après notification pour les modifications substantielles</Text>
            <Text style={styles.paragraph}>
              Vous serez informé des modifications importantes par email ou notification push. 
              Votre utilisation continue du service après l&apos;entrée en vigueur des modifications 
              constitue votre acceptation des nouvelles conditions.
            </Text>
            <Text style={styles.paragraph}>
              Si vous n&apos;acceptez pas les nouvelles conditions, vous devez cesser d&apos;utiliser le 
              service et supprimer votre compte.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>14. Résiliation et suspension</Text>
            <Text style={styles.paragraph}>
              Vous pouvez résilier votre compte à tout moment via les paramètres de l&apos;application. 
              SocialPlanr peut suspendre ou résilier votre accès au service, avec ou sans préavis, 
              dans les cas suivants :
            </Text>
            <Text style={styles.bulletPoint}>• Violation de ces conditions d&apos;utilisation</Text>
            <Text style={styles.bulletPoint}>• Comportement abusif envers d&apos;autres utilisateurs ou notre équipe</Text>
            <Text style={styles.bulletPoint}>• Utilisation frauduleuse ou illégale du service</Text>
            <Text style={styles.bulletPoint}>• Non-paiement des frais dus (le cas échéant)</Text>
            <Text style={styles.bulletPoint}>• Inactivité prolongée du compte</Text>
            <Text style={styles.paragraph}>
              En cas de résiliation, votre droit d&apos;utiliser le service cesse immédiatement. 
              SocialPlanr peut supprimer ou conserver vos données conformément à sa Politique 
              de confidentialité et aux obligations légales.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>15. Droit applicable et juridiction</Text>
            <Text style={styles.paragraph}>
              Ces conditions d&apos;utilisation sont régies par le droit français. Tout litige relatif 
              à l&apos;interprétation, la validité, l&apos;exécution ou la résiliation de ces conditions 
              relève de la compétence exclusive des tribunaux de Paris, France.
            </Text>
            <Text style={styles.paragraph}>
              Avant tout recours contentieux, nous vous encourageons à nous contacter pour 
              résoudre amiablement tout différend. En cas d&apos;échec de la résolution amiable, 
              vous pouvez également recourir à une procédure de médiation.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>16. Dispositions diverses</Text>
            <Text style={styles.paragraph}>
              Si une disposition de ces conditions est jugée invalide ou inapplicable, les autres 
              dispositions demeurent pleinement en vigueur. SocialPlanr peut céder ces conditions 
              à tout moment sans votre consentement.
            </Text>
            <Text style={styles.paragraph}>
              L&apos;absence d&apos;exercice par SocialPlanr d&apos;un droit ou d&apos;une action ne constitue pas 
              une renonciation à ce droit. Ces conditions constituent l&apos;intégralité de l&apos;accord 
              entre vous et SocialPlanr concernant l&apos;utilisation du service.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>17. Contact et informations légales</Text>
            <Text style={styles.paragraph}>
              Pour toute question concernant ces conditions d&apos;utilisation, vous pouvez nous contacter :
            </Text>
            <Text style={styles.contactInfo}>📧 legal@socialplanr.com</Text>
            <Text style={styles.contactInfo}>📧 support@socialplanr.com</Text>
            <Text style={styles.contactInfo}>📍 SocialPlanr SAS, 123 Avenue des Champs-Élysées, 75008 Paris, France</Text>
            <Text style={styles.contactInfo}>📞 +33 1 23 45 67 89</Text>
            <Text style={styles.contactInfo}>🏢 SIRET : 123 456 789 00012</Text>
            <Text style={styles.contactInfo}>💶 Capital social : 10 000 €</Text>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>
              En continuant à utiliser SocialPlanr, vous confirmez avoir lu et accepté 
              ces conditions d&apos;utilisation.
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
 