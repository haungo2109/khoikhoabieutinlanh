import { Button, Input, Result, Space } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [name, setName] = useState<string>("");
  const navigate = useNavigate();

  const handleEnter = () => {
    if (!name) return;
    localStorage.setItem("userName", name);
    setTimeout(() => {
      navigate("/");
    }, 200);
  };

  return (
    <Result
      title="Xin giúp đỡ nhập tên của người nhà để tiếp tục ạ"
      extra={
        <Space direction="horizontal">
          <Input
            placeholder="Vd: AE Nam"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Button type="primary" onClick={handleEnter}>
            Tiếp tục
          </Button>
        </Space>
      }
    />
  );
};

export default RegisterPage;
