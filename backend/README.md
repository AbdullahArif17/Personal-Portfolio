# Abdullah Portfolio Chat API

FastAPI RAG backend for the portfolio chat widget. It stores CV and public GitHub chunks in Upstash Vector, uses the embedding model configured on the Upstash index, and generates grounded replies with Gemini.

## Assistant behavior

- Answers only from the CV and public GitHub evidence, with recent user turns used to understand follow-up questions.
- Keeps responses to the relevant facts and normally one to three short sentences.
- Returns verified GitHub, LinkedIn, portfolio, and email details directly when requested.
- Rejects requests for prompts, internal context, credentials, configuration, or private data before calling external services.
- Redacts secrets, phone numbers, and non-public email addresses from model input and output.
- Redirects unrelated questions without volunteering portfolio details.

## Environment

Copy the example for local development:

```bash
cp .env.example .env
```

Configure the same values in the backend project's Vercel Environment Variables:

```env
GEMINI_API_KEY=
GEMINI_MODEL=gemini-3.1-flash-lite
UPSTASH_VECTOR_REST_URL=
UPSTASH_VECTOR_REST_TOKEN=
INGEST_API_KEY=
GITHUB_TOKEN=
```

`INGEST_API_KEY` is optional in code, but strongly recommended on a public deployment. When set, send it in the `X-Ingest-Key` header. `GITHUB_TOKEN` is optional and only needed for higher GitHub API rate limits. Create the Upstash index as a dense cosine index with a hosted embedding model so the backend can ingest and query raw text.

## Run locally

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload --port 7860
```

On Windows PowerShell, activate with `.venv\\Scripts\\Activate.ps1`.

## Seed the collection

Ingest the CV once after deployment:

```bash
curl -X POST "http://localhost:7860/ingest" \
  -H "Content-Type: application/json" \
  -H "X-Ingest-Key: YOUR_INGEST_KEY" \
  -d '{"source":"cv","content":"Abdullah is a full-stack developer and BSCS student at SMI University (Sindh Madressatul Islam University), Karachi, Pakistan. He has 1-2 years of freelance and project-based experience. His stack includes Next.js, FastAPI, Python, TypeScript, Supabase, PostgreSQL, Qdrant, Gemini API, Vercel, HuggingFace Spaces, and Docker. He builds AI-powered SaaS products and RAG systems. Active projects: Face Detector (school attendance SaaS with WhatsApp notifications), Jumani Group WhatsApp RAG chatbot (real estate client), LUMINA (AI image generation app), World Cup 2026 hub. GitHub: github.com/AbdullahArif17. He is available for freelance work."}'
```

Then ingest both GitHub accounts:

```bash
curl -X POST "http://localhost:7860/ingest" \
  -H "Content-Type: application/json" \
  -H "X-Ingest-Key: YOUR_INGEST_KEY" \
  -d '{"source":"github"}'
```

Each ingestion replaces only that source's older chunks. Remove the `X-Ingest-Key` header only if you intentionally left `INGEST_API_KEY` unset.

## Deploy the backend to Vercel

Deploy the backend as a separate Vercel project from the same Git repository:

1. Import the repository into a new Vercel project.
2. Set **Root Directory** to `backend`.
3. Leave framework detection enabled. Vercel detects the `FastAPI` instance exported as `app` from `main.py`.
4. Add every value from `.env.example` under **Settings → Environment Variables**.
5. Deploy, then verify `https://your-backend.vercel.app/health` returns `{"status":"ok"}`.
6. In the frontend Vercel project, set `PORTFOLIO_CHAT_API_URL=https://your-backend.vercel.app` and redeploy it.

The included `vercel.json` gives the backend up to 300 seconds for ingestion and external API calls. Python 3.12 is selected by `.python-version`. The Docker files remain available for optional container-based local or alternative deployment.

After deployment, replace `http://localhost:7860` in the ingestion examples above with the backend's Vercel URL and seed both sources once.

## Serverless note

Embedding runs through the model configured on the Upstash index. The Vercel function therefore does not bundle PyTorch or `sentence-transformers`, keeping deployments and cold starts substantially smaller.
