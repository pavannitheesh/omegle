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
    createRoom(user1:user,user2:user){
        const roomId=this.generate().toString();
        this.room.set(roomId.toString(),{user1,user2});
          user1.socket.emit("send-offer", {
            roomId
        })
    }
    onOffer(roomId:string,sdp:string,senderSocketId:string){
          const room = this.room.get(roomId);
        if (!room) {
            return;
        }
         const receivingUser = room.user1.socket.id === senderSocketId ? room.user2: room.user1;
        receivingUser?.socket.emit("offer", {
            sdp,
            roomId
        })
    
    }
    onAnswer(roomId:string,sdp:string,senderSocketid: string){
       const room = this.room.get(roomId);
        if (!room) {
            return;
        }
        const receivingUser = room.user1.socket.id === senderSocketid ? room.user2: room.user1;

        receivingUser?.socket.emit("answer", {
            sdp,
            roomId
        });
    
    }
    generate(){
        return GLOBAL_ROOM_ID++;
    }
}