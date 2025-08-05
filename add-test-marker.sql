-- Add test marker at McDonald's Lucas
INSERT INTO public.gold_sites (name, description, coordinates, created_by, is_public, historical_context, current_status, gold_found, site_type)
VALUES 
    ('TEST MARKER - MCDONALDS LUCAS', 'SUPER OBVIOUS TEST MARKER - The Golden Arches', 
     '[143.78609496452736, -37.544583351281496]'::jsonb,
     (SELECT id FROM public.users LIMIT 1), true,
     'TEST MARKER - This should be very visible on the map', 'active', true, 'other'); 