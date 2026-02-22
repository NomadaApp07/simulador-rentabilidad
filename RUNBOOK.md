# RUNBOOK - Simulador Rentabilidad

## Objetivo
Estandarizar cambios, deploy y verificacion para evitar publicar versiones viejas.

## 1) Flujo Git obligatorio
Desde `C:\Users\Estudiante\Desktop\NOMADA\INTA\simulador-rentabilidad`:

```powershell
git status
git add .
git commit -m "mensaje claro del cambio"
git push origin main
```

## 2) Proyecto y repo correctos
Repositorio valido:
- `NomadaApp07/simulador-rentabilidad`

No usar repositorios con nombre legado raro (puntos finales).

## 3) Deploy correcto en Vercel
El deployment debe mostrar:
- Source desde Git (`main` o SHA)
- commit actual

Si solo aparecen `Redeploy of ...`, crear deployment nuevo desde `main`.

## 4) Variables de entorno (Vercel)
Variables requeridas:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

## 5) Base de datos y seguridad (Supabase)
Tablas esperadas:
- `public.simulaciones`
- `public.simulacion_versiones`

RLS habilitado y politicas por `user_id` para `authenticated`.

## 6) Prueba funcional minima
1. Login.
2. `Nueva -> Guardar -> Cargar -> Eliminar` simulacion.
3. Ver historial de versiones.
4. Restaurar una version.
5. Exportar PDF.

## 7) Comandos de validacion local
```powershell
npm test
npm run build
```

## 8) Higiene del repo
No subir:
- `.env`
- `node_modules`
- `dist`
- `.vercel`

Mantener `.env.example` sin secretos.

