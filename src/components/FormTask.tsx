import { Button, Form, Modal, Radio, Input, DatePicker, Select } from "antd";
import { useState } from "react";
import { addActivity } from "../services/ActivityService";
import { IActivity } from "../models/Activity";

const ruleRequired = { required: true, message: "Vui lòng không để trống" };

interface Props {
  onAddActivity: (activity: IActivity) => void;
}
const FormTask = (props: Props) => {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();

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
    await addActivity(activity);
    props.onAddActivity(activity);
    form.resetFields();
    closeModal();
  };

  return (
    <>
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
          variant="filled"
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
            <Select
              defaultValue={1}
              options={[
                { value: 1, label: "1 tiếng" },
                { value: 1.5, label: "1 tiếng rưỡi" },
                { value: 2, label: "2 tiếng" },
                { value: 2.5, label: "2 tiếng rưỡi" },
                { value: 3, label: "3 tiếng" },
                { value: 3.5, label: "3 tiếng rưỡi" },
                { value: 4, label: "4 tiếng" },
              ]}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default FormTask;
