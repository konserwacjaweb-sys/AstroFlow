# Gotham Font Files

Add Gotham font files here to enable all weights in the website.

## Quick Install (recommended)

1. Put your licensed Gotham webfont files in any local folder (outside or inside the repo).
2. Run:

```bash
npm run install:gotham -- --source /path/to/your/gotham-files
```

The installer will:
- detect Gotham by common names (Thin, Book, Bold, etc. and 100-900);
- require `.woff2` for every weight from 100 to 900;
- copy files to this folder using canonical names used by CSS.

Required file names:
- Gotham-100.woff2
- Gotham-200.woff2
- Gotham-300.woff2
- Gotham-400.woff2
- Gotham-500.woff2
- Gotham-600.woff2
- Gotham-700.woff2
- Gotham-800.woff2
- Gotham-900.woff2

Optional fallback files:
- Gotham-100.woff
- Gotham-200.woff
- Gotham-300.woff
- Gotham-400.woff
- Gotham-500.woff
- Gotham-600.woff
- Gotham-700.woff
- Gotham-800.woff
- Gotham-900.woff

Notes:
- Keep the exact filenames above to match CSS declarations.
- Make sure you have a valid license for Gotham before distributing files.
