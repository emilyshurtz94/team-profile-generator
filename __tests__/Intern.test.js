const Intern= require('../src/intern.js');
const alice = new Intern("alice",1,"alice@gmail.com","UofA");

describe('school',() =>{
    it('gets the a school when a user enters a school',() =>{
        expect(alice.getSchool()).toBe("UofA");
    })
    })
    
    describe("getRole", () => {
    it('get Role should return intern when a user chooses intern', () =>{
        expect(alice.getRole()).toBe('Intern');
    });
    })