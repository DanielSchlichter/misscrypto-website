-- CreateTable
CREATE TABLE "Coin" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "symbol" TEXT NOT NULL,
    "current_price" REAL NOT NULL,
    "price_change_24h" REAL,
    "price_change_7d" REAL,
    "price_change_30d" REAL,
    "price_change_1y" REAL,
    "image" TEXT NOT NULL,
    "market_cap_rank" INTEGER NOT NULL,
    "last_updated" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Price" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "coinId" TEXT NOT NULL,
    "timeRange" TEXT NOT NULL,
    "values" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Price_coinId_fkey" FOREIGN KEY ("coinId") REFERENCES "Coin" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE INDEX "Price_coinId_timeRange_idx" ON "Price"("coinId", "timeRange");
