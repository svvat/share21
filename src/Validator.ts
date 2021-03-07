const credentials = require("./credentials.json");
export type ProfileType = {
    id: string, username: string, password:  string, first_name: string, other_names: string
    address: { street: string, town: string, county: string, postcode: string},
    mobile: string, email: string, company: string,
    preferences: { mail: boolean, sms: boolean }  
  }

export class Validator {
    public validate(username: string, password: string) : any | undefined {
        // load file
        // if username/pwd found return true
        const users = credentials.users;
        let i = 0;
        for (i = 0; i < users.length; i++) {
            const user = users[i];
            if(user.username === username){
                if (user.password === password) {
                    return [ true, user ];
                } 
                break;
            }
        }
        return  [ false,  undefined ];
    }
    
    public getUser(username: string) : any {
        // load file
        // if username/pwd found return true

        const users = credentials.users;
        let i = 0;
        for (i = 0; i < users.length; i++) {
            const user = users[i];
            if(user.username === username){
                return  user;
            }
        }
        throw new Error("Invalid Id");
    }

    public getUser3(username: string) : ProfileType {
        // load file
        // if username/pwd found return true

        const users = credentials.users;
        let i = 0;
        for (i = 0; i < users.length; i++) {
            const user = users[i];
            if(user.username === username){
                let ret : ProfileType = JSON.parse(user);
                return ret;
            }
        }
        throw new Error("Invalid Id");
    }
    public getUser2(username: string) : ProfileType {
        // load file
        // if username/pwd found return true

        const users = credentials.users;
        let i = 0;
        for (i = 0; i < users.length; i++) {
            const user = users[i];
            if(user.username === username){
                let ret : ProfileType = {
                    id: user.id, 
                    username: user.username,
                    first_name: user.first_name,
                    other_names: user.other_names,
                    password: user.password,
                    address: {
                        street: user.address.street,
                        town: user.address.town,
                        county: user.address.county,
                        postcode: user.address.postcode
                    },
                    mobile: user.mobile,
                    email: user.email,
                    company: user.company,
                    preferences: {
                        sms: user.preferences.sms,
                        mail: user.preferences.mail
                    }
                }
                return ret;
            }
        }
        throw new Error("Invalid Id");
    }

}