import { feathers } from "@feathersjs/feathers";
import sync, { redis } from "feathers-sync";

const app = feathers();

app.configure(
  sync({
    uri: "redis://some/where",
  }),
);

app.configure(redis({}));
