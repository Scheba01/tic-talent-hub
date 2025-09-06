-- Create an enum for user roles
CREATE TYPE public.app_role AS ENUM ('admin', 'staff', 'user');

-- Create user_roles table for role management
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL DEFAULT 'user',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (user_id, role)
);

-- Enable RLS on user_roles table
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check user roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  );
$$;

-- Create function to check if user is admin or staff
CREATE OR REPLACE FUNCTION public.is_admin_or_staff(_user_id UUID)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role IN ('admin', 'staff')
  );
$$;

-- Drop existing problematic policy
DROP POLICY IF EXISTS "Only authenticated users can view submissions" ON public.contact_submissions;

-- Create secure policies for contact_submissions
CREATE POLICY "Only admin and staff can view contact submissions" 
ON public.contact_submissions 
FOR SELECT 
USING (public.is_admin_or_staff(auth.uid()));

CREATE POLICY "Only admin and staff can update contact submissions" 
ON public.contact_submissions 
FOR UPDATE 
USING (public.is_admin_or_staff(auth.uid()));

CREATE POLICY "Only admin and staff can delete contact submissions" 
ON public.contact_submissions 
FOR DELETE 
USING (public.is_admin_or_staff(auth.uid()));

-- RLS policies for user_roles table
CREATE POLICY "Users can view their own roles" 
ON public.user_roles 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Only admins can manage user roles" 
ON public.user_roles 
FOR ALL 
USING (public.has_role(auth.uid(), 'admin'));

-- Insert an admin role for the first user (you'll need to change this to your user ID)
-- This is commented out - you'll need to manually add admin roles through the Supabase dashboard