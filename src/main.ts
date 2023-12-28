import express, { Request, Response } from "express";

const PORT = process.env.PORT || 3000;
const app = express();

app.get("/", (_req: Request, res: Response) => {
  res.send("Hello World");
});

app.listen(PORT, () => console.log(`Express server running on PORT ${PORT}`));
