-- CreateTable
CREATE TABLE "ZapExecs" (
    "id" TEXT NOT NULL,
    "zapId" TEXT NOT NULL,

    CONSTRAINT "ZapExecs_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ZapExecs" ADD CONSTRAINT "ZapExecs_zapId_fkey" FOREIGN KEY ("zapId") REFERENCES "Zap"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
