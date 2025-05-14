import { Socket } from "socket.io";
import { user } from "./UserManager";
let GLOBAL_ROOM_ID=1;
interface room{
    user1:user,
    user2:user
}


export class RoomManager{
    private room :Map<string,room>;
    constructor(){
        this.room = new Map<string,room>();;
    }
    createRoom({user1,user2}:room){
        const roomId=this.generate();
        this.room.set(roomId.toString(),{user1,user2});
        user1.socket.emit("send-offer",{
            roomId
        });

    }
    onOffer(roomId:string,sdp:string){
        const user2 = this.room.get(roomId)?.user2;
        user2?.socket.emit("offer",{
            sdp
        })
    
    }
    onAnswer(roomId:string,sdp:string){
        const user1 = this.room.get(roomId)?.user1;
        user1?.socket.emit("offer",{
            sdp
        })
    
    }
    generate(){
        return GLOBAL_ROOM_ID++;
    }
}