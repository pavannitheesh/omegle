import { useSearchParams } from "react-router-dom";

const Room = () => {
      const [searchParams] = useSearchParams();
 
  const search = searchParams.get('name');
    return ( 
        <div>
            hi : {search}
        </div>
     );
}
 
export default Room;