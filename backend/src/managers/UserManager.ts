import { Socket } from "socket.io";

interface user{
    socket:Socket,
    name:string
}
class UserManager{
    private users:user[];
    constructor(){
        this.users = [];
    }
    addUser(name:string,socket:Socket){
        this.users.push({
            name,
            socket
        });
    }
    removeUser(socketId:string){
        this.users = this.users.filter(user => user.socket.id !== socketId);
    }
}