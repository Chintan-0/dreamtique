# Dreamtique Tourism: website design options

Redesign options for dreamtiquetourism.com. Each folder is its own Next.js 16 app (TypeScript, Tailwind v4, Motion).
Content comes from the supplied company document; contact details come from the current site.

| # | Folder | Idea |
|---|---|---|
| 1 | `dreamtique-next` | The logo's map-pin as the main shape |
| 2 | `dreamtique-tourism` | Cinematic, dark and glass, with a 3D globe |
| 3 | `dreamtique-explorer` | A marketplace: finder, experiences, saved items |
| 4 | `dreamtique-mission` | A full-screen panel layout on white, with footage |
| - | `dreamtique-journal` | Expedition 3D x Luxury Journal (kept as a backup, not deployed) |

## Run one

```bash
cd dreamtique-mission
npm install
npm run dev
```

Each app deploys to Vercel as its own project. The "Design options" bar reads the other options' addresses from
`NEXT_PUBLIC_OPTION_1` to `NEXT_PUBLIC_OPTION_5` (build-time settings; it falls back to localhost) and is meant to be removed before launch.

## Notes

- Forms have no backend: enquiries open an email to the company address.
- Prices, reviews and policies are not invented. Sample experience listings in option 3 need client confirmation.
- Photographs and video are from Wikimedia Commons (mostly CC BY or CC BY-SA). The footers carry no credit lines, so credits need to be shown before launch.
