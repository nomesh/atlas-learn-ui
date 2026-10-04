# Local Tutor runtime parity (NOT APPLIED - proposal only)

## Current local state (observed, read-only)
`atlas.atlas_runtime_config` (id = 1): `deployment_mode=PRIVATE`, `chat_provider=OLLAMA_LOCAL`, `chat_model=qwen2.5:7b`, embedding `OLLAMA_LOCAL / nomic-embed-text`, storage `LOCAL`.
`/actuator/health`: local Ollama DOWN, Ollama Cloud UP. `ATLAS_OLLAMA_CLOUD_API_KEY` is present in the user/process environment (value not recorded here).

Why this matters: the `OLLAMA_LOCAL` path in `RuntimeChatService` is capped at `numCtx=2048`, `numPredict=384`, `temperature=0.4`, `repeatPenalty=1.18`. The `OLLAMA_CLOUD` path sets only the model name, so output length is the provider default.

The effective model comes from the DB row, not from `ATLAS_AI_CHAT_PROVIDER` / `ATLAS_OLLAMA_CLOUD_MODEL`. The row is cached for 5 s (`atlas.runtime-config.cache-ttl`), so no backend restart is needed.

Production's config has NOT been observed. `nemotron-3-super:cloud` is the expected target, not a confirmed production value.

## Proposed change (requires explicit approval before running)
```bash
# 0. Record the current row (rollback reference)
docker exec rag-postgres psql -U raguser -d ragdb -c "SELECT id, deployment_mode, chat_provider, chat_model, updated_at FROM atlas.atlas_runtime_config;"

# 1. Confirm column constraints / allowed values before changing anything
docker exec rag-postgres psql -U raguser -d ragdb -c "\d atlas.atlas_runtime_config"

# 2. Apply (chat provider/model only; embeddings, storage and deployment_mode untouched)
docker exec rag-postgres psql -U raguser -d ragdb -c "UPDATE atlas.atlas_runtime_config SET chat_provider='OLLAMA_CLOUD', chat_model='nemotron-3-super:cloud', updated_at=now() WHERE id=1;"
```
The database password is supplied by your existing environment; do not paste it into scripts or chat.

If step 1 shows `deployment_mode` must be a cloud-style value for `OLLAMA_CLOUD`, stop and decide that separately; this proposal does not change it.

## Rollback
```bash
docker exec rag-postgres psql -U raguser -d ragdb -c "UPDATE atlas.atlas_runtime_config SET chat_provider='OLLAMA_LOCAL', chat_model='qwen2.5:7b', updated_at=now() WHERE id=1;"
```

## Verify after applying (wait about 5 s for the cache)
1. `GET /actuator/health` shows `ollamaCloud` UP.
2. Ask the Grade 10 Science cell-structure question from the app with `VITE_USE_MOCK_API=false`.
3. The dev badge (bottom-left of every page) reads `Tutor: LIVE · OLLAMA_CLOUD · nemotron-3-super:cloud` after the first answer. It needs the backend started with `ATLAS_LEARN_TUTOR_EXPOSE_RUNTIME=true`; otherwise it reads `Tutor: LIVE · model not reported yet`. The console shows `[TutorService] Initialized with AtlasLiveTutorAdapter (source: ...)`.
4. Backend console shows the new `[TutorEvidence] retrieved=... accepted=... rejected=... reasons={...} topicPageRange=[...] pageBasis=... chunkPages=[...]` line.

## Prerequisites to confirm first
- The model tag `nemotron-3-super:cloud` is actually available to your Ollama Cloud account (not verified here).
- The frontend must not be in mock mode. `.env.local` currently sets `VITE_USE_MOCK_API=true` and overrides `.env` (`false`). Use `npm run dev:live`. Details: `docs/TUTOR_MODES.md`.
