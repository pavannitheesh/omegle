import  { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
  import { io } from "socket.io-client";
  const URL= 'http://localhost:3000'
const Room = () => {
      const [searchParams] = useSearchParams();
      const [lobby,setLobby] = useState(false);
      const search = searchParams.get('name');
      useEffect(() => {
        const socket = io(URL);
        socket.on("send-offer",({roomId})=>{
            setLobby(false);
            alert("send offer recieved");
            socket.emit("offer",{
                    sdp:"",
                    roomId
            })
        });
        socket.on("offer",({roomId,offer})=>{
            alert("offer recieved");
            socket.emit("answer",{
                sdp:"",
                roomId
            })

        })
        socket.on("answer",({roomId,answer})=>{
            alert("answer recieved");
            setLobby(false);
        })
         socket.on("lobby", () => {
            setLobby(true);
        })
        
      
       
      }, [])
      if(lobby){
        return (
            <div>Waiting in the lobby</div>
        )
      }
 
    return ( 
        <div>
            hi : {search}
            <video width={400 } height={400}/>
            <video width={400 } height={400}/>
        </div>
     );
}
 
export default Room;