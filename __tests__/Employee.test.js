const Employee= require('../employee');
const alice = new Employee("alice",1,"alice@gmail.com")

describe('name',() =>{
    it('gets a team members name when a user inputs name',() =>{
        expect(alice.getName()).toBe("alice");
    })
    });
    
    describe("getId", () => {
    it('gets a team members ID when a user inputs id', () =>{
        expect(alice.getId()).toBe(1);
    })
    });

    describe("getEmail", () => {
        it('gets a team members Email when a user inputs Email', () =>{
            expect(alice.getEmail()).toBe("alice@gmail.com");
        });
        });