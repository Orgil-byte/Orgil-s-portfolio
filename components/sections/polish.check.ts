import assert from "node:assert/strict";
import { capabilityGroups, contact } from "../../data/site";
import { clampCenter } from "./projects-section";

assert.equal(contact.phone.display, "+976 8885 4768");
assert.equal(contact.phone.href, "tel:+97688854768");

const capabilityIds = capabilityGroups.map((category) => category.id);
assert.equal(new Set(capabilityIds).size, capabilityIds.length);
for (const category of capabilityGroups) {
  const toolCount = category.groups.flatMap((group) => group.tools).length;
  assert.ok(category.summaryCount > 0 && category.summaryCount < toolCount);
}

assert.equal(clampCenter(500, 400, 1000, 18), 500);
assert.equal(clampCenter(10, 400, 1000, 18), 218);
assert.equal(clampCenter(990, 400, 1000, 18), 782);
assert.equal(clampCenter(100, 400, 300, 18), 150);
