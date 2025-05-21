import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

export const Landing = () => {
  const [localVideoStream,setLocalVideoStream] = useState< MediaStreamTrack | null>(null);
  const [localAudioStream,setLocalAudioStream] = useState< MediaStreamTrack | null>(null);
  const [name,setName] =useState("");
  const getCamera = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true
    });
    const video = stream.getVideoTracks()[0];
    const audio = stream.getAudioTracks()[0];
    setLocalVideoStream(video);
    setLocalAudioStream(audio);

  }
    useEffect(() => {
      getCamera();
    }, []);
    return (
    <div>
        <input type="text" value={name} onChange={(e)=>setName(e.target.value)}/>
        <Link to={`/room?name=${name}`} >Join</Link>
    </div>
  )
}
