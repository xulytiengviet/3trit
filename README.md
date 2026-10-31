# CVNSS4.0–Base27–Ternary Bridge · 3TRIT

**Independent research preprint** · Vietnamese / Russian · 2026-10-31

**Developer:** Long Ngo. **License:** MIT for original repository work. **Research editorial assistance:** DeepSeek (attribution requested by project author; not verified as an official DeepSeek publication, endorsement or peer-reviewed article).

## Live page
When GitHub Pages is enabled for the `main` branch at the repository root: **https://xulytiengviet.github.io/3trit/**

## Contents

- `index.html`: bilingual scientific preprint with formal definitions, constructive proof, applications, limitations, architecture, references.
- `assets/style.css`: responsive academic article design and print stylesheet.
- `assets/app.js`: interactive 27-state mapping table, T27 encode/decode, balanced ternary, Base27 block pack/unpack, live results and runtime self-tests.
- `assets/cvnss-converter.js`: user-supplied CVNSS4.0 converter v5.0.0-audit-safe; do not remove author/provenance markers.
- `LICENSE`: MIT.

## Scientific limits

`27 = 3^3` guarantees a 1:1 fixed-length 3-trit code for the **27-character core alphabet only**. It does **not** prove that the original Vietnamese Unicode text can always be losslessly converted to CVNSS4.0, that Base27 improves compression on every text, or that a ternary-weight language model is inherently more accurate. The converter exposes 56 canonical ambiguity decisions and an audit graph. In the demo, the Extended mode is an **experimental full UTF-8 fallback**, not an optimized/standardized mixed-frame protocol.

Payload bits for a core symbol asymptotically approach `log2(27) ≈ 4.755`, not 1.585 bits per symbol. Packed 10-symbol blocks use 48 bits; metadata and framing add overhead.

## Local run

Open `index.html` or serve the directory:

```bash
python -m http.server 8000
```

Run converter standalone:

```bash
node -e "const c=require('./assets/cvnss-converter.js');console.log(c.selfTest())"
```

## Publishing

Repository **Settings → Pages → Build and deployment → Deploy from a branch → main → /(root) → Save**. No build tool required. GitHub Pages setup is a repository setting and is not performed by the static files themselves.

## Attribution & academic integrity

- This site is **not** an official arXiv submission and does not have an arXiv identifier, DOI, or peer review.
- Not an official statement, endorsement or publication by DeepSeek.
- Code uses original project MIT license; third-party works retain their own copyrights and license terms.
- Primary related work: Jones (TerSCII), Ma et al. (BitNet 1.58), Wang et al. (JMLR BitNet), Xiao et al. (PTQTP).
