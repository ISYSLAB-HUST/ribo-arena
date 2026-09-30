# Run RiboArena locally

Requires Node.js 22+ and Python 3. From the repository root, run:

```bash
node scripts/build.mjs
python3 -m http.server 4173 --directory dist
```

Open [http://localhost:4173](http://localhost:4173) in your browser.
