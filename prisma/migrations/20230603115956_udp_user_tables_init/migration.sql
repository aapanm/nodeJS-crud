-- CreateTable
CREATE TABLE `Parent` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `parentId` INTEGER NOT NULL,
    `firstName` VARCHAR(255) NOT NULL,
    `lastName` VARCHAR(255) NOT NULL,
    `street` VARCHAR(100) NOT NULL,
    `city` VARCHAR(100) NOT NULL,
    `state` VARCHAR(50) NOT NULL,
    `zip` VARCHAR(50) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Parent_parentId_key`(`parentId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Children` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `childId` INTEGER NOT NULL,
    `firstName` VARCHAR(255) NOT NULL,
    `lastName` VARCHAR(255) NOT NULL,
    `parentIdx` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Children_childId_key`(`childId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Children` ADD CONSTRAINT `Children_parentIdx_fkey` FOREIGN KEY (`parentIdx`) REFERENCES `Parent`(`parentId`) ON DELETE RESTRICT ON UPDATE CASCADE;
