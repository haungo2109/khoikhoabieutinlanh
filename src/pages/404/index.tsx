import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleBackHome = () => {
    navigate("/");
  };

  return (
    <Result
      status="404"
      title="404"
      subTitle="Xin lỗi trang người nhà truy cập không tìm thấy"
      extra={
        <Button type="primary" onClick={handleBackHome}>
          Về lại trang chủ
        </Button>
      }
    />
  );
};

export default NotFoundPage;
