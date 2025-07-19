-- Fix database functions security issues by setting search_path
-- This addresses the security warnings from the linter

ALTER FUNCTION public.handle_updated_at() SET search_path TO 'public';
ALTER FUNCTION public.check_booth_overlap() SET search_path TO 'public';
ALTER FUNCTION public.update_inventory_status() SET search_path TO 'public';
ALTER FUNCTION public.check_location_hierarchy() SET search_path TO 'public';
ALTER FUNCTION public.update_material_updated_at() SET search_path TO 'public';
ALTER FUNCTION public.has_role(uuid, app_role) SET search_path TO 'public';
ALTER FUNCTION public.get_current_user_role() SET search_path TO 'public';
ALTER FUNCTION public.get_user_organization() SET search_path TO 'public';
ALTER FUNCTION public.handle_new_user() SET search_path TO 'public';
ALTER FUNCTION public.calculate_job_costs(uuid) SET search_path TO 'public';
ALTER FUNCTION public.update_job_costs_on_material_usage() SET search_path TO 'public';
ALTER FUNCTION public.update_updated_at_column() SET search_path TO 'public';

-- Update subscription tiers with correct pricing structure
-- Remove any old entries and create the new pricing model
DELETE FROM public.subscription_tiers;

INSERT INTO public.subscription_tiers (name, price, description, features, stripe_price_id) VALUES
(
  'Professional Plan',
  75,
  'Base subscription for admin access',
  '["Admin dashboard access", "Job management", "Material tracking", "Equipment management", "Compliance tools", "Reporting", "Email support"]'::jsonb,
  'price_1QYourActualStripeAdminPriceId'
),
(
  'Additional Employee',
  25,
  'Per additional team member',
  '["Employee dashboard access", "Job participation", "Material usage tracking", "Equipment assignments", "Task management"]'::jsonb,
  'price_1QYourActualStripeEmployeePriceId'
);