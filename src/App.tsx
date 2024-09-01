import { useEffect, useState } from "react";
import CCalendar from "./components/CCalendar";
import FormTask from "./components/FormTask";
import { getActivities } from "./services/ActivityService";
import { IActivity } from "./models/Activity";
import "./App.css";

function App() {
  const [activities, setActivities] = useState<IActivity[]>([]);

  const fetchData = async () => {
    const activitiesList = await getActivities();
    setActivities(activitiesList);
  };

  const onAddActivity = (activity: IActivity) => {
    setActivities((prev) => prev.concat(activity));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div style={{ height: "90vh" }}>
        <CCalendar events={activities} />
      </div>
      <FormTask onAddActivity={onAddActivity} />
    </>
  );
}

export default App;
