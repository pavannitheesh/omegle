import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom';

export const Landing = () => {
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [name, setName] = useState("");
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const getCamera = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true
    });
    setLocalStream(stream);
  };

  useEffect(() => {
    getCamera();
  }, []);

  useEffect(() => {
    if (videoRef.current && localStream) {
      videoRef.current.srcObject = localStream;
      videoRef.current.onloadedmetadata = () => {
        videoRef.current?.play();
      };
    }
  }, [localStream]);
    return (
    <div>
      <video ref={videoRef} height={400} width={400}></video>
        <input type="text" value={name} onChange={(e)=>setName(e.target.value)}/>
        <Link to={`/room?name=${name}`} >Join</Link>
    </div>
  )
}
