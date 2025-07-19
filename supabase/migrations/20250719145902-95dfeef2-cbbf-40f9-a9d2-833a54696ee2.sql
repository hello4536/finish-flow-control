
-- Update subscription tiers to reflect new pricing structure
-- $75 base admin price and $25 per additional employee

UPDATE public.subscription_tiers 
SET 
  price = 75,
  name = 'Professional Plan',
  description = 'Complete finishing management solution',
  features = '["Admin dashboard access", "Job management", "Material tracking", "Equipment management", "Compliance tools", "Basic reporting", "Email support"]'::jsonb,
  stripe_price_id = 'price_admin_monthly'
WHERE name = 'Starter' OR price = 29;

-- Add or update employee pricing tier
INSERT INTO public.subscription_tiers (name, price, description, features, stripe_price_id)
VALUES (
  'Additional Employee',
  25,
  'Per additional team member',
  '["Employee dashboard access", "Job participation", "Material usage tracking", "Equipment assignments", "Task management"]'::jsonb,
  'price_employee_monthly'
)
ON CONFLICT (stripe_price_id) DO UPDATE SET
  price = 25,
  name = 'Additional Employee',
  description = 'Per additional team member',
  features = '["Employee dashboard access", "Job participation", "Material usage tracking", "Equipment assignments", "Task management"]'::jsonb;

-- Remove old pricing tiers that don't match new structure
DELETE FROM public.subscription_tiers 
WHERE price NOT IN (75, 25) AND stripe_price_id NOT IN ('price_admin_monthly', 'price_employee_monthly');
