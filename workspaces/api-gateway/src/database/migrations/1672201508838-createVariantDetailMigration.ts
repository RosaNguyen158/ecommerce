import { Table, TableForeignKey } from 'typeorm';
import type { QueryRunner, MigrationInterface } from 'typeorm';

export class createVariantDetailMigration1672198954975
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'variant_details',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'variant_id',
            type: 'uuid',
          },
          {
            name: 'option_id',
            type: 'uuid',
          },
          {
            name: 'value_option',
            type: 'varchar',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'deleted_at',
            type: 'timestamp',
            isNullable: true,
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'variant_details',
      new TableForeignKey({
        columnNames: ['variant_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'variants',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'variant_details',
      new TableForeignKey({
        columnNames: ['option_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'options',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('variant_details');
  }
}
