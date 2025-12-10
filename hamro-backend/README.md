# hamro-backend

Quick notes to run the backend locally.

Prerequisites
- Node.js (v16+ recommended)
- MongoDB running locally or a remote MongoDB URI

Setup
1. Copy `.env.example` to `.env` and set `MONGO_URI` if you have a remote DB. If you leave it empty the app will try a local MongoDB at `mongodb://127.0.0.1:27017/hamroGuide`.
2. Install dependencies:

```powershell
Set-Location .\hamro-backend
npm install
```

Run server

```powershell
Set-Location .\hamro-backend
node server.js
```

Notes
- The server will attempt to connect to the URI in `MONGO_URI`. If that fails and the env var is set, it will try the local fallback. If both fail the server will still start but DB-backed features will not work.
# Hamro Backend

Quick steps to run the backend locally.

1. Install dependencies

```powershell
cd hamro-backend
npm install
```

2. Configure environment

- Copy `.env.example` to `.env` and update `MONGO_URI` to point to your MongoDB.
- If you don't set `MONGO_URI`, the app will try `mongodb://127.0.0.1:27017/hamroGuide` as a local fallback.

3. Start the server

```powershell
cd hamro-backend
npm start
```

Notes:
- Server uses `dotenv` (loaded in `server.js`) so `.env` must be in the `hamro-backend` folder when started from there.
- If MongoDB isn't available the server will still start, but DB-backed features will fail until a working DB is provided.
# hamro-backend — quick run notes

1. Install dependencies (run from `hamro-backend`):

```
npm install
```

2. Create a `.env` file in `hamro-backend` (copy from `.env.example`) and set `MONGO_URI` if you have a remote MongoDB.

3. Run the server (from `hamro-backend` directory):

PowerShell:
```
node server.js
```

The app will try `MONGO_URI` if present. If not, it will attempt a local MongoDB at `mongodb://127.0.0.1:27017/hamro` before continuing without a DB. If neither connection succeeds the server still starts but DB-dependent features will not work.
