import { useEffect, useRef, useState } from 'react'
import {Room} from './Room';

export const Landing = () => {
   const [localAudioTrack, setLocalAudioTrack] = useState<MediaStreamTrack | null>(null);
    const [localVideoTrack, setlocalVideoTrack] = useState<MediaStreamTrack | null>(null);
  const [name, setName] = useState("");
  const [join,setJoin] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const getCamera = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true
    });
    const audioTrack = stream.getAudioTracks()[0];
        const videoTrack = stream.getVideoTracks()[0];
        setLocalAudioTrack(audioTrack);
        setlocalVideoTrack(videoTrack);
        if (!videoRef.current) {
            return;
        }
        videoRef.current.srcObject = new MediaStream([videoTrack,audioTrack])
        videoRef.current.play();

    
  };

  useEffect(() => {
    getCamera();
  }, []);
  if(!join){

    return (
      <div>
      <video ref={videoRef} height={400} width={400}></video>
        <input type="text" value={name} onChange={(e)=>setName(e.target.value)}/>
        <button onClick={()=>setJoin(true)}>Join</button>
    </div>
  )
}
return <Room name={name} localAudioTrack={localAudioTrack} localVideoTrack={localVideoTrack} />
}
