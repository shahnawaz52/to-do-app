import { useEffect, useState } from "react";
import ListHeader from "./components/ListHeader";

const App = () => {
  const [tasks, setTasks] = useState(null);
  const userEmail = 'smartshan@gmail.com'

  const getData = async () => {
    try {
      const response = await fetch(`http://localhost:5000/todos/${userEmail}`)
      const json = response.json()
      // console.log(json)
      setTasks(json)
    } catch(err) {
      console.error(err)
    }
  }

  console.log(tasks)

  useEffect(() => getData, [])

  return (
    <div className="app">
      <ListHeader listName={'🏃‍♂️ Holiday Tick list'} />
    </div>
  );
}

export default App;
