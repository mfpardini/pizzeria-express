import { MigrationInterface, QueryRunner } from "typeorm";

export class FirstMigration1662564506419 implements MigrationInterface {
    name = 'FirstMigration1662564506419'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE \`client\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`name\` varchar(255) NOT NULL,
                \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`ingredient\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`name\` varchar(255) NOT NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`item_type\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`name\` varchar(255) NOT NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`order_status\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`name\` varchar(255) NOT NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`order\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                \`client_id\` int NULL,
                \`status_id\` int NULL,
                UNIQUE INDEX \`REL_a0d9cbb7f4a017bac3198dd8ca\` (\`client_id\`),
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`order_item\` (
                \`order_item_id\` int NOT NULL AUTO_INCREMENT,
                \`quantity\` int NOT NULL,
                \`order_id\` int NULL,
                \`item_id\` int NULL,
                PRIMARY KEY (\`order_item_id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`item\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`name\` varchar(255) NOT NULL,
                \`price\` decimal NOT NULL,
                \`type_id\` int NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`item_ingredients\` (
                \`item_id\` int NOT NULL,
                \`ingredient_id\` int NOT NULL,
                INDEX \`IDX_77fc134cf63e148c091034aeba\` (\`item_id\`),
                INDEX \`IDX_b386fe33755acb217c5f0344bb\` (\`ingredient_id\`),
                PRIMARY KEY (\`item_id\`, \`ingredient_id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            ALTER TABLE \`order\`
            ADD CONSTRAINT \`FK_a0d9cbb7f4a017bac3198dd8ca0\` FOREIGN KEY (\`client_id\`) REFERENCES \`client\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`order\`
            ADD CONSTRAINT \`FK_8ea75b2a26f83f3bc98b9c6aaf6\` FOREIGN KEY (\`status_id\`) REFERENCES \`order_status\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`order_item\`
            ADD CONSTRAINT \`FK_e9674a6053adbaa1057848cddfa\` FOREIGN KEY (\`order_id\`) REFERENCES \`order\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`order_item\`
            ADD CONSTRAINT \`FK_f9129a798f2308714d1e3be2463\` FOREIGN KEY (\`item_id\`) REFERENCES \`item\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`item\`
            ADD CONSTRAINT \`FK_64cde7db02a99c28d4b67efb367\` FOREIGN KEY (\`type_id\`) REFERENCES \`item_type\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`item_ingredients\`
            ADD CONSTRAINT \`FK_77fc134cf63e148c091034aebae\` FOREIGN KEY (\`item_id\`) REFERENCES \`item\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE \`item_ingredients\`
            ADD CONSTRAINT \`FK_b386fe33755acb217c5f0344bb9\` FOREIGN KEY (\`ingredient_id\`) REFERENCES \`ingredient\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`item_ingredients\` DROP FOREIGN KEY \`FK_b386fe33755acb217c5f0344bb9\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`item_ingredients\` DROP FOREIGN KEY \`FK_77fc134cf63e148c091034aebae\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`item\` DROP FOREIGN KEY \`FK_64cde7db02a99c28d4b67efb367\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`order_item\` DROP FOREIGN KEY \`FK_f9129a798f2308714d1e3be2463\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`order_item\` DROP FOREIGN KEY \`FK_e9674a6053adbaa1057848cddfa\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`order\` DROP FOREIGN KEY \`FK_8ea75b2a26f83f3bc98b9c6aaf6\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`order\` DROP FOREIGN KEY \`FK_a0d9cbb7f4a017bac3198dd8ca0\`
        `);
        await queryRunner.query(`
            DROP INDEX \`IDX_b386fe33755acb217c5f0344bb\` ON \`item_ingredients\`
        `);
        await queryRunner.query(`
            DROP INDEX \`IDX_77fc134cf63e148c091034aeba\` ON \`item_ingredients\`
        `);
        await queryRunner.query(`
            DROP TABLE \`item_ingredients\`
        `);
        await queryRunner.query(`
            DROP TABLE \`item\`
        `);
        await queryRunner.query(`
            DROP TABLE \`order_item\`
        `);
        await queryRunner.query(`
            DROP INDEX \`REL_a0d9cbb7f4a017bac3198dd8ca\` ON \`order\`
        `);
        await queryRunner.query(`
            DROP TABLE \`order\`
        `);
        await queryRunner.query(`
            DROP TABLE \`order_status\`
        `);
        await queryRunner.query(`
            DROP TABLE \`item_type\`
        `);
        await queryRunner.query(`
            DROP TABLE \`ingredient\`
        `);
        await queryRunner.query(`
            DROP TABLE \`client\`
        `);
    }

}
