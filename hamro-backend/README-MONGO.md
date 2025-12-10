**MongoDB Setup**

- **Local MongoDB (quick)**: Install MongoDB Community and start the server. The app will automatically use `mongodb://127.0.0.1:27017/hamroGuide` if no `MONGO_URI` is set.

- **Cloud MongoDB (Atlas)**: Create a cluster and copy the connection string. Create a `.env` file in the project root (same folder as `server.js`) with:

```
MONGO_URI=mongodb+srv://<user>:<password>@cluster0.mongodb.net/hamroGuide?retryWrites=true&w=majority
```

- **Run server**:

```powershell
cd hamro-backend
npm install
npm start
```

If MongoDB is not available the server will start but DB-backed features will not function. Check the console logs for connection errors.