-- Fix the infinite recursion in org_members RLS policies
-- First, drop the existing problematic policies
DROP POLICY IF EXISTS "select_own_organization" ON public.org_members;
DROP POLICY IF EXISTS "insert_own_organization" ON public.org_members;
DROP POLICY IF EXISTS "update_own_organization" ON public.org_members;
DROP POLICY IF EXISTS "delete_own_organization" ON public.org_members;

-- Create simplified, non-recursive policies for org_members
CREATE POLICY "org_members_select_policy" ON public.org_members
FOR SELECT
USING (user_id = auth.uid());

CREATE POLICY "org_members_insert_policy" ON public.org_members
FOR INSERT
WITH CHECK (user_id = auth.uid());

CREATE POLICY "org_members_update_policy" ON public.org_members
FOR UPDATE
USING (user_id = auth.uid());

CREATE POLICY "org_members_delete_policy" ON public.org_members
FOR DELETE
USING (user_id = auth.uid());