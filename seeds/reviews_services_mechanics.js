/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

import mechanicsData from "../seed-data/mechanics.js";
import servicesData from "../seed-data/services.js";
import reviewsData from "../seed-data/reviews.js";



export async function seed(knex) {
  await knex("mechanics").del();
  await knex("services").del();
  await knex("reviews").del();
  await knex("mechanics").insert(mechanicsData);
  await knex("services").insert(servicesData);
  await knex("reviews").insert(reviewsData);

  
}
