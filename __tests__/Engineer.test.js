const Engineer= require('../src/engineer.js');
const alice = new Engineer("alice",1,"alice@gmail.com","alicegithub")

describe('github',() =>{
    it('gets github profile when a user enters github profile username',() =>{
        expect(alice.getGithub()).toBe("alicegithub");
    })
    })
    
    describe("getRole", () => {
    it('get Role should return engineer when a user chooses engineer', () =>{
        expect(alice.getRole()).toBe('Engineer');
    });
    })