CREATE TABLE IF NOT EXISTS public.sessions
(    
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id integer NOT NULL,
    created_at timestamp without time zone DEFAULT now()
);
