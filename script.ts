import { prisma } from "./prisma/prisma";

prisma.group.findMany().then((group) => {
  console.log(group);
});
