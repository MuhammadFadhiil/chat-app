# simple-chat-app

## Run Locally

### Prerequisite

- MongoDB running on your machine
- Setup new DB with name chat-app

### Clone the project

```bash
  git clone https://github.com/MuhammadFadhiil/chat-app.git
```

Go to the project directory

```bash
  cd chat-app
```
### Run Backend Service

```bash
  cd backend
  npm i
  npm start 
```

### Run Frontend Service

```bash
  cd frontend
  npm i
  npm start 
```

### Before start chat

- Create new room (POST /api/room)
- Copy the room id, and use it as roomId on the join room page
