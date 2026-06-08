import { seedSettlements } from "./settlements.js";
import { seedOfferings } from "./offerings.js";
import { seedInvestors } from "./investors.js";
import { seedInvestments } from "./investments.js";

export function registerRepositories() {
  seedSettlements();
  seedOfferings();
  seedInvestors();
  seedInvestments();
}
