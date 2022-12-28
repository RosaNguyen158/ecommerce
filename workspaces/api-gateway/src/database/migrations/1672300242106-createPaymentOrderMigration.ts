import { Table, TableForeignKey } from 'typeorm';
import type { QueryRunner, MigrationInterface } from 'typeorm';

export class createPaymentOrderMigration1672300242106
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'payment_orders',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'order_id',
            type: 'uuid',
          },
          {
            name: 'method_id',
            type: 'uuid',
          },
          {
            name: 'status',
            type: 'enum',
            enum: ['unpaid', 'pending', 'paid'],
            default: `'unpaid'`,
          },
          {
            name: 'amount',
            type: 'numeric(5,2)',
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
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'payment_orders',
      new TableForeignKey({
        columnNames: ['order_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'orders',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'payment_orders',
      new TableForeignKey({
        columnNames: ['method_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'payment_methods',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('payment_orders');
  }
}
