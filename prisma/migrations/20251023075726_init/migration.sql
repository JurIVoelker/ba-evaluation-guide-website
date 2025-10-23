-- CreateTable
CREATE TABLE "group" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "value" TEXT NOT NULL,

    CONSTRAINT "group_pkey" PRIMARY KEY ("id")
);
