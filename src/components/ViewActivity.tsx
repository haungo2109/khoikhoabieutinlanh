import { useEffect, useState } from "react";
import { IActivity } from "../models/Activity";
import { Button, Modal } from "antd";

type Props = {
  activity?: IActivity;
  onDeleteActivity: () => void;
  onEditActivity: () => void;
};

const ViewActivity = (props: Props) => {
  const { activity } = props;
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleEdit = () => {
    props.onEditActivity();
    setIsModalVisible(false);
  };

  const handleDelete = () => {
    props.onDeleteActivity();
    setIsModalVisible(false);
  };

  useEffect(() => {
    if (props.activity) setIsModalVisible(true);
  }, [props.activity]);

  return (
    <>
      <Modal
        title="Chi tiết sự kiện"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={[
          <Button key="edit" onClick={handleEdit}>
            Chỉnh sửa
          </Button>,
          <Button key="delete" type="primary" danger onClick={handleDelete}>
            Xóa
          </Button>,
        ]}
      >
        <p>Tiêu đề: {activity?.title}</p>
        <p>Thời gian bắt đầu: {activity?.start.toLocaleString()}</p>
        <p>Thời gian kết thúc: {activity?.end.toLocaleString()}</p>
        <p>Loại hoạt động: {activity?.type}</p>
        <p>Người phụ trách: {activity?.host}</p>
      </Modal>
    </>
  );
};
export default ViewActivity;
