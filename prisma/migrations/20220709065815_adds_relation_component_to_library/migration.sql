-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Component" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "libraryTitle" TEXT,
    CONSTRAINT "Component_libraryTitle_fkey" FOREIGN KEY ("libraryTitle") REFERENCES "Library" ("title") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Component" ("id", "name") SELECT "id", "name" FROM "Component";
DROP TABLE "Component";
ALTER TABLE "new_Component" RENAME TO "Component";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
