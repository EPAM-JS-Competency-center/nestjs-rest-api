import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemovePhoneColumnFromUserAndUpdateDefaultTimestamp1662731975338
  implements MigrationInterface
{
  name = 'RemovePhoneColumnFromUserAndUpdateDefaultTimestamp1662731975338';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "phone_number"`);
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "created_at" SET DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "updated_at" SET DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "cart" ALTER COLUMN "created_at" SET DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "cart" ALTER COLUMN "updated_at" SET DEFAULT now()`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "cart" ALTER COLUMN "updated_at" SET DEFAULT '2022-09-09 13:32:59.291'`,
    );
    await queryRunner.query(
      `ALTER TABLE "cart" ALTER COLUMN "created_at" SET DEFAULT '2022-09-09 13:32:59.291'`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "updated_at" SET DEFAULT '2022-09-09 13:32:59.29'`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "created_at" SET DEFAULT '2022-09-09 13:32:59.29'`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD "phone_number" character varying NOT NULL`,
    );
  }
}
