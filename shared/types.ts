// Types partagés pour SocialPlanr
export interface User {
  id: string;
  email: string;
  displayName: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Group {
  id: string;
  name: string;
  description?: string;
  adminId: string;
  admin: User;
  members: GroupMember[];
  createdAt: Date;
  updatedAt: Date;
  status: GroupStatus;
}

export interface GroupMember {
  id: string;
  userId: string;
  user: User;
  groupId: string;
  role: MemberRole;
  joinedAt: Date;
}

export interface Event {
  id: string;
  groupId: string;
  group: Group;
  title: string;
  description?: string;
  status: EventStatus;
  finalDate?: Date;
  finalLocation?: string;
  finalBudget?: number;
  aiPlan?: EventPlan;
  createdAt: Date;
  updatedAt: Date;
}

export interface Proposal {
  id: string;
  eventId: string;
  userId: string;
  user: User;
  type: ProposalType;
  title: string;
  description?: string;
  data: ProposalData;
  votes: Vote[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Vote {
  id: string;
  proposalId: string;
  userId: string;
  user: User;
  value: VoteValue;
  createdAt: Date;
  updatedAt: Date;
}

export interface EventPlan {
  id: string;
  eventId: string;
  generatedBy: 'AI' | 'USER';
  title: string;
  description: string;
  schedule: PlanActivity[];
  accommodations: Accommodation[];
  totalBudget: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface PlanActivity {
  id: string;
  title: string;
  description?: string;
  date: Date;
  startTime: string;
  endTime: string;
  location?: string;
  cost?: number;
  category: ActivityCategory;
}

export interface Accommodation {
  id: string;
  name: string;
  description?: string;
  location: string;
  pricePerNight: number;
  rating?: number;
  bookingUrl?: string;
  imageUrl?: string;
}

export interface Expense {
  id: string;
  eventId: string;
  userId: string;
  user: User;
  title: string;
  description?: string;
  amount: number;
  category: ExpenseCategory;
  participants: string[]; // User IDs who share this expense
  receiptUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Payment {
  id: string;
  eventId: string;
  fromUserId: string;
  toUserId: string;
  amount: number;
  status: PaymentStatus;
  stripePaymentId?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Enums
export enum GroupStatus {
  ACTIVE = 'active',
  ARCHIVED = 'archived',
  DELETED = 'deleted'
}

export enum MemberRole {
  ADMIN = 'admin',
  MEMBER = 'member'
}

export enum EventStatus {
  PLANNING = 'planning',
  VOTING = 'voting',
  CONFIRMED = 'confirmed',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled'
}

export enum ProposalType {
  DATE = 'date',
  LOCATION = 'location',
  ACTIVITY = 'activity',
  ACCOMMODATION = 'accommodation'
}

export enum VoteValue {
  YES = 'yes',
  NO = 'no',
  MAYBE = 'maybe'
}

export enum ActivityCategory {
  TRANSPORT = 'transport',
  FOOD = 'food',
  ENTERTAINMENT = 'entertainment',
  SIGHTSEEING = 'sightseeing',
  SHOPPING = 'shopping',
  RELAXATION = 'relaxation',
  SPORTS = 'sports',
  CULTURE = 'culture',
  OTHER = 'other'
}

export enum ExpenseCategory {
  ACCOMMODATION = 'accommodation',
  TRANSPORT = 'transport',
  FOOD = 'food',
  ENTERTAINMENT = 'entertainment',
  SHOPPING = 'shopping',
  OTHER = 'other'
}

export enum PaymentStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  FAILED = 'failed',
  CANCELLED = 'cancelled'
}

// Types pour les données de proposition
export type ProposalData = 
  | DateProposalData 
  | LocationProposalData 
  | ActivityProposalData 
  | AccommodationProposalData;

export interface DateProposalData {
  startDate: Date;
  endDate: Date;
  flexible: boolean;
}

export interface LocationProposalData {
  city: string;
  country: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
}

export interface ActivityProposalData {
  category: ActivityCategory;
  estimatedCost?: number;
  duration?: number; // in minutes
  location?: string;
}

export interface AccommodationProposalData {
  name: string;
  location: string;
  pricePerNight: number;
  rating?: number;
  amenities: string[];
  bookingUrl?: string;
}

// Types pour les API responses
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// Types pour l'authentification
export interface AuthUser {
  id: string;
  email: string;
  displayName: string;
  avatar?: string;
  emailVerified: boolean;
  provider: 'google' | 'email';
}

export interface AuthState {
  user: AuthUser | null;
  loading: boolean;
  error: string | null;
}

// Types pour la navigation (React Navigation)
export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Groups: undefined;
  GroupDetail: { groupId: string };
  EventDetail: { eventId: string };
  CreateGroup: undefined;
  CreateEvent: { groupId: string };
  Profile: undefined;
  Settings: undefined;
};

export type TabParamList = {
  Groups: undefined;
  Events: undefined;
  Expenses: undefined;
  Profile: undefined;
}; 