CREATE TABLE IF NOT EXISTS public.contacts
(
    id              SERIAL PRIMARY KEY,
    user_id         INTEGER NOT NULL REFERENCES public.users (id) ON DELETE CASCADE,
    name            VARCHAR NOT NULL,
    contact_info VARCHAR NOT NULL,
    CONSTRAINT unique_user_contact UNIQUE (user_id, name)
);

INSERT INTO public.contacts (user_id, name, contact_info)
SELECT user_id, 'Portfolio', portfolio_url
FROM public.links
WHERE portfolio_url IS NOT NULL
UNION ALL
SELECT user_id, 'LinkedIn', linkedin_url
FROM public.links
WHERE linkedin_url IS NOT NULL
UNION ALL
SELECT user_id, 'Instagram', instagram_url
FROM public.links
WHERE instagram_url IS NOT NULL
UNION ALL
SELECT user_id, 'Dribbble', dribbble_url
FROM public.links
WHERE dribbble_url IS NOT NULL
UNION ALL
SELECT user_id, 'Other', other_url
FROM public.links
WHERE other_url IS NOT NULL;

DROP TABLE public.links;