import {
  Button,
  Form,
  Modal,
  Radio,
  Input,
  DatePicker,
  message,
  Slider,
} from "antd";
import { useState } from "react";
import { addActivity } from "../services/ActivityService";
import { IActivity } from "../models/Activity";

const ruleRequired = { required: true, message: "Vui lòng không để trống" };

interface Props {
  onAddActivity: (activity: IActivity) => void;
}

const titleHours: { [key: string]: string } = {
  0.5: "30 phút",
  1: "1 tiếng",
  1.5: "1 tiếng 30 phút",
  2: "2 tiếng",
  2.5: "2 tiếng 30 phút",
  3: "3 tiếng",
  3.5: "3 tiếng 30 phút",
  4: "4 tiếng",
};

const FormTask = (props: Props) => {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  const showModal = () => setOpen(true);

  const closeModal = () => setOpen(false);

  const onFinish = async (values: any) => {
    const endTime = new Date(values.start);
    endTime.setHours(endTime.getHours() + values.end);
    const activity = {
      ...values,
      start: new Date(values.start),
      end: endTime,
    };
    try {
      await addActivity(activity);
      props.onAddActivity(activity);
      form.resetFields();
      messageApi.open({
        type: "success",
        content: "Thêm thành công",
      });
      closeModal();
    } catch (error) {
      messageApi.open({
        type: "error",
        content: "Thêm không thành công. Vui lòng thử lại",
      });
      console.log("Lỗi khi thêm", error);
    }
  };

  return (
    <>
      {contextHolder}
      <Button
        className="btn-plus"
        type="primary"
        onClick={showModal}
        shape="circle"
      >
        +
      </Button>
      <Modal
        title="Thêm hoạt động"
        open={open}
        onOk={form.submit}
        onCancel={closeModal}
        okText="Lưu"
        cancelText="Hủy"
        maskClosable={false}
      >
        <Form
          form={form}
          onFinish={onFinish}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          layout="horizontal"
          style={{ maxWidth: 500 }}
        >
          <Form.Item name="title" label="Tiêu đề" rules={[{ ...ruleRequired }]}>
            <Input placeholder="Nhập tiêu đề" />
          </Form.Item>
          <Form.Item
            name="type"
            label="Loại hình"
            initialValue="truda"
            rules={[{ ...ruleRequired }]}
          >
            <Radio.Group>
              <Radio value="truda">Truđa</Radio>
              <Radio value="chamsoc">Chăm sóc</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            name="host"
            label="Người thực hiện"
            rules={[{ ...ruleRequired }]}
          >
            <Input placeholder="Nhập tên người" />
          </Form.Item>
          <Form.Item name="start" label="Bắt đầu" rules={[{ ...ruleRequired }]}>
            <DatePicker
              showTime
              format="hh:mm DD-MM-YYYY"
              placeholder="Bắt đầu"
              minuteStep={15}
              hourStep={1}
            />
          </Form.Item>
          <Form.Item
            name="end"
            label="Trong khoảng"
            rules={[{ ...ruleRequired }]}
            initialValue={1}
          >
            <Slider
              defaultValue={0.5}
              step={0.5}
              min={0.5}
              max={4}
              tooltip={{
                formatter(value) {
                  return value ? titleHours[value] : "";
                },
              }}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default FormTask;
