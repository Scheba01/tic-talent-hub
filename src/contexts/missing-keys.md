# Missing Translation Keys That Need to Be Added

Based on the image, these keys are showing instead of translated text:

## Spanish (need to be added):
- services.title → "Nuestros Servicios"
- services.executive_search.title → "Búsqueda Ejecutiva"
- services.hr_consulting.title → "Consultoría en RRHH"
- services.coaching.title → "Coaching & Desarrollo"
- services.executive_search.desc
- services.hr_consulting.desc
- services.coaching.desc
- services.see_more → "Ver Más"
- footer.quick_links → "Enlaces Rápidos"
- footer.community → "Comunidad"
- footer.contact → "Contacto"
- footer.privacy_policy → "Política de Privacidad"

The issue is that these keys exist in the LanguageContext but there are duplicates causing TypeScript errors.