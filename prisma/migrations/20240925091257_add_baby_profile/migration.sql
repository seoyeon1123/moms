-- CreateTable
CREATE TABLE "BabyProfile" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "babyImage" TEXT NOT NULL,
    "babyname" TEXT NOT NULL,
    "babyAge" TEXT NOT NULL,
    "babyGender" TEXT NOT NULL,
    "nickName" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "BabyProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "BabyProfile_nickName_key" ON "BabyProfile"("nickName");
