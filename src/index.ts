import start from "./shared/infrastructure/http/index.ts"

const port: number = parseInt(process.env.PORT || "") || 3000;
start(port)
