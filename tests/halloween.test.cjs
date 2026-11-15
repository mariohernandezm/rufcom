const {test}=require('node:test');
const assert=require('node:assert/strict');
test('Halloween ends at midnight in Chile and never returns in 2027',()=>{
 const {halloweenActive}=require('../site/assets/js/halloween.js');
 assert.equal(halloweenActive(new Date('2026-10-28T02:59:59Z')),false);
 assert.equal(halloweenActive(new Date('2026-10-28T03:00:00Z')),true);
 assert.equal(halloweenActive(new Date('2026-11-01T02:59:59Z')),true);
 assert.equal(halloweenActive(new Date('2026-11-01T03:00:00Z')),false);
 assert.equal(halloweenActive(new Date('2027-10-31T12:00:00Z')),false);
});
