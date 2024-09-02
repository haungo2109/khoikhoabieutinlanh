import { useEffect, useState } from "react";
import CCalendar from "../../components/CCalendar";
import FormTask from "../../components/FormTask";
import { deleteActivity, getActivities } from "../../services/ActivityService";
import { IActivity } from "../../models/Activity";
import ViewActivity from "../../components/ViewActivity";
import { message } from "antd";

function HomePage() {
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<IActivity>();
  const [messageApi, contextHolder] = message.useMessage();

  const fetchData = async () => {
    const activitiesList = await getActivities();
    setActivities(activitiesList);
  };

  const onAddActivity = (activity: IActivity) => {
    setActivities((prev) => prev.concat(activity));
  };

  const onEditActivity = () => {
    // setActivities((prev) => prev.concat(activity));
  };

  const onDeleteActivity = async () => {
    if (selectedEvent) {
      try {
        await deleteActivity(selectedEvent.id);
        setActivities((prev) => prev.filter((a) => a.id !== selectedEvent.id));
        messageApi.open({
          type: "success",
          content: "Xóa thành công",
        });
      } catch (error) {
        messageApi.open({
          type: "error",
          content: "Xóa không thành công. Vui lòng thử lại",
        });
      }
    }
  };

  const handleSelectEvent = (event: IActivity) => {
    setSelectedEvent(event);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {contextHolder}
      <ViewActivity
        activity={selectedEvent}
        onDeleteActivity={onDeleteActivity}
        onEditActivity={onEditActivity}
      />
      <div style={{ height: "90vh" }}>
        <CCalendar
          events={activities}
          dayLayoutAlgorithm="no-overlap"
          onSelectEvent={handleSelectEvent}
        />
      </div>
      <FormTask onAddActivity={onAddActivity} />
    </>
  );
}

export default HomePage;
