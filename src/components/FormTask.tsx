import { Button, Form, Modal, Radio, Input, DatePicker } from 'antd';
import { useState } from 'react';

const { RangePicker } = DatePicker;

const ruleRequired = { required: true, message: 'Vui lòng không để trống' };

const FormTask = () => {
  const [open, setOpen] = useState(true);
  const [form] = Form.useForm();

  const showModal = () => setOpen(true);

  const closeModal = () => setOpen(false);

  const onFinish = (values: any) => {
    console.log('Received values of form:', values);
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
          <Form.Item name="type" label="Loại hình" initialValue="truda" rules={[{ ...ruleRequired }]}>
            <Radio.Group defaultValue="truda">
              <Radio value="truda">Truđa</Radio>
              <Radio value="chamsoc">Chăm sóc</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item name="host" label="Người thực hiện" rules={[{ ...ruleRequired }]}>
            <Input placeholder="Nhập tên người" />
          </Form.Item>
          <Form.Item name="datetime" label="Thời gian" rules={[{ ...ruleRequired }]}>
            <RangePicker
              showTime={{ format: 'HH:mm A' }}
              format="HH:mm DD-MM-YYYY"
              placeholder={['Bắt đầu', 'Kết thúc']}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default FormTask;
