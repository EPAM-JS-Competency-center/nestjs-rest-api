import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserAndCartTables1662730375922
  implements MigrationInterface
{
  name = 'CreateUserAndCartTables1662730375922';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT '"2022-09-09T13:32:59.290Z"', "phone_number" character varying NOT NULL, "updated_at" TIMESTAMP NOT NULL DEFAULT '"2022-09-09T13:32:59.290Z"', CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."cart_currency_enum" AS ENUM('UAH', 'USD', 'EUR')`,
    );
    await queryRunner.query(
      `CREATE TABLE "cart" ("id" SERIAL NOT NULL, "currency" "public"."cart_currency_enum" NOT NULL, "balance" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT '"2022-09-09T13:32:59.291Z"', "updated_at" TIMESTAMP NOT NULL DEFAULT '"2022-09-09T13:32:59.291Z"', "user_id" integer, CONSTRAINT "CHK_6f2fa2f01444d0ae51d93624a9" CHECK ("balance" > 0), CONSTRAINT "PK_c524ec48751b9b5bcfbf6e59be7" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "cart" ADD CONSTRAINT "FK_f091e86a234693a49084b4c2c86" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "cart" DROP CONSTRAINT "FK_f091e86a234693a49084b4c2c86"`,
    );
    await queryRunner.query(`DROP TABLE "cart"`);
    await queryRunner.query(`DROP TYPE "public"."cart_currency_enum"`);
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
