const Manager= require('../src/manager.js');
const alice = new Manager("alice",1,"alice@gmail.com",2)

describe('getOfficeNumber',() =>{
it('gets the office number when a user chooses manger',() =>{
    expect(alice.officeNumber).toBe(2);
})
})

describe("getRole", () => {
it('get Role should return manager when a user chooses manager', () =>{
    expect(alice.getRole()).toBe('Manager');
});
})