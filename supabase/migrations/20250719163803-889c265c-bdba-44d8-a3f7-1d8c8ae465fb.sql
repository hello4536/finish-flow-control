
-- Update subscription tiers with actual Stripe price IDs
UPDATE public.subscription_tiers 
SET stripe_price_id = 'price_1RmdYLBDVuMpWUec4HDLX6eU'
WHERE name = 'Professional Plan';

UPDATE public.subscription_tiers 
SET stripe_price_id = 'price_1RmdYnBDVuMpWUecEfbuV6dN'
WHERE name = 'Additional Employee';
