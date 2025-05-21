import  { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
  import { io, Socket } from "socket.io-client";
  const URL= 'http://localhost:3000';
const Room = () => {


      const [searchParams] = useSearchParams();
      const [lobby,setLobby] = useState(false);
      const [socket,setSocket] = useState<null | Socket>(null);
      const [remoteVideoStream,setRemoteVideoStream] = useState< MediaStreamTrack | null>(null);
      const [remoteAudioStream,setRemoteAudioStream] = useState< MediaStreamTrack | null>(null);
      const [sendingPc,setSendingPc] = useState<null | RTCPeerConnection>(null);
      const [receivingPc,setReceivingPc] = useState<null | RTCPeerConnection>(null);
    
      const search = searchParams.get('name');
      useEffect(() => {
        const socket = io(URL);
        socket.on("send-offer",async ({roomId})=>{
            setLobby(false);
           const pc=new RTCPeerConnection();
           setSendingPc(pc);
           const sdp = await pc.createOffer();


            socket.emit("offer",{
                    sdp,
                    roomId
            })
        });
        socket.on("offer",async ({roomId,offer})=>{
            const pc=new RTCPeerConnection();
          pc.setRemoteDescription({sdp:offer, type:"offer"});
            const sdp = await pc.createAnswer();
            setReceivingPc(pc);
            pc.ontrack = (({track,type}) => {
              if(type === "video"){
                setRemoteVideoStream(track);
              }else{
                  setRemoteAudioStream(track);
              }});


            socket.emit("answer",{
                sdp,
                roomId
            })

        })
        socket.on("answer",({roomId,answer})=>{
            const pc = new RTCPeerConnection();
            pc.setRemoteDescription({sdp:answer, type:"answer"});
           
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
            <video autoPlay width={400 } height={400}/>
            <video autoPlay width={400 } height={400}/>
        </div>
     );
}
 
export default Room;