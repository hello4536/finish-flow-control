
export interface StainComponent {
  name: string;
  quantity: string;
  unit: string;
}

export interface Stain {
  id: string;
  name: string;
  brand: string;
  color: string;
  notes?: string;
  baseComponents?: StainComponent[];
  mixingInstructions?: string;
  substrateCompatibility?: string[];
  applicationMethod?: string;
  dryingTime?: string;
  coatsRecommended?: string;
  createdBy?: string;
  createdAt: string;
  updated_at: string;
}

export interface AddStainParams {
  name: string;
  brand: string;
  color: string;
  notes?: string;
  baseComponents?: StainComponent[];
  mixingInstructions?: string;
  substrateCompatibility?: string[];
  applicationMethod?: string;
  dryingTime?: string;
  coatsRecommended?: string;
  createdBy?: string;
  createdAt?: Date;
}

export interface UpdateStainParams extends Partial<Stain> {
  id: string;
}
