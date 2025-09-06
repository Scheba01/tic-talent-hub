-- Create missing candidate tables for new areas

-- TI / Data area
CREATE TABLE public.candidate_ti (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  candidate_id uuid REFERENCES public.candidates(id),
  rol text,
  experiencia text,
  comentarios text,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- HSE / Seguridad area  
CREATE TABLE public.candidate_hse (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  candidate_id uuid REFERENCES public.candidates(id),
  rol text,
  experiencia text,
  comentarios text,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Legal / Regulatorio area
CREATE TABLE public.candidate_legal (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  candidate_id uuid REFERENCES public.candidates(id),
  rol text,
  experiencia text,
  comentarios text,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Supply Chain / Compras area
CREATE TABLE public.candidate_supply_chain (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  candidate_id uuid REFERENCES public.candidates(id),
  rol text,
  experiencia text,
  comentarios text,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Atención al Cliente / CS area
CREATE TABLE public.candidate_atencion_cliente (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  candidate_id uuid REFERENCES public.candidates(id),
  rol text,
  experiencia text,
  comentarios text,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- PMO / Proyectos area
CREATE TABLE public.candidate_pmo (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  candidate_id uuid REFERENCES public.candidates(id),
  rol text,
  experiencia text,
  comentarios text,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Dirección / General Management area
CREATE TABLE public.candidate_direccion (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  candidate_id uuid REFERENCES public.candidates(id),
  rol text,
  experiencia text,
  comentarios text,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS on all new tables
ALTER TABLE public.candidate_ti ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.candidate_hse ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.candidate_legal ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.candidate_supply_chain ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.candidate_atencion_cliente ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.candidate_pmo ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.candidate_direccion ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for all new tables
CREATE POLICY "Anyone can insert ti data" ON public.candidate_ti FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can insert hse data" ON public.candidate_hse FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can insert legal data" ON public.candidate_legal FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can insert supply chain data" ON public.candidate_supply_chain FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can insert atencion cliente data" ON public.candidate_atencion_cliente FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can insert pmo data" ON public.candidate_pmo FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can insert direccion data" ON public.candidate_direccion FOR INSERT WITH CHECK (true);