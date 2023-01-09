import { TableColumn } from 'typeorm';
import type { QueryRunner, MigrationInterface } from 'typeorm';

export class alterProductMigration1673919187417 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'products',
      new TableColumn({
        name: 'price',
        type: 'numeric(5,2)',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('products', 'price');
  }
}
