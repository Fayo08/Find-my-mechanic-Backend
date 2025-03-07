/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
    return knex.schema

      .createTable("services", (table) => {
        table.increments("id").primary();
        table.string("type").notNullable();
        table.decimal('price', 10, 2).notNullable();
        table
      .integer('mechanic_id')
      .unsigned()
      .references('mechanics.id')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table
          .timestamp("updated_at")
          .defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
      })
    
  }
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  export function down(knex) {
    return knex.schema.dropTable("services");
  }