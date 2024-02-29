import {useParams} from 'react-router-dom';

export default function DayDetailPage() {
  const {date} = useParams();
  console.log(date);
  // const [toDos, setToDos] = useState([]);
  // include Add To-Do form here with a state variable

  return (
    <h1>DayDetailPage</h1>
  );
}
