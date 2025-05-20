
import { Session, User } from "@supabase/supabase-js";

export interface Organization {
  id: string;
  name: string;
  subscription_status: string | null;
  subscription_tier: string | null;
  subscription_end_date: string | null;
}

export interface UserRole {
  role: "admin" | "employee";
}

export interface AuthContextType {
  session: Session | null;
  user: User | null;
  profile: any | null;
  organization: Organization | null;
  userRole: UserRole | null;
  isLoading: boolean;
  signUp: (email: string, password: string, fullName: string, orgName: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  checkSubscription: () => Promise<void>;
}
