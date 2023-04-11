import {Button, Col, Form, Input, Row, theme} from 'antd';
import {dynamicFetchUsers} from "@component/services/api";
import dayjs from "dayjs";

const AdvancedSearchForm = ({
  originalData,
  userCount,
  handleData,
  pageModel,
  handlePage,
  handleSpecs,
  handleSearchMode
}) => {
  const {token} = theme.useToken();
  const [form] = Form.useForm();
  const formStyle = {
    maxWidth: 'none',
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    padding: 24,
  };
  const searchFields = [{dataIndex: "age", label: "AGE"},
    {dataIndex: "name", label: "NAME"},
    {dataIndex: "from", label: "START DATE(Include)"},
    {dataIndex: "to", label: "END DATE(Exclude)"}];
  const getFields = () => {
    const count = 4;
    const children = [];
    for (let i = 0; i < count; i++) {
      children.push(
          <Col span={12} key={i}>
            <Form.Item
                name={searchFields[i].dataIndex}
                label={searchFields[i].label}
            >
              <Input placeholder="This is An Exact Search"/>
            </Form.Item>
          </Col>,
      );
    }
    return children;
  };
  const onFinish = async (values) => {
    handleSearchMode(true);
    handleSpecs(values);
    const data = await dynamicFetchUsers({page: 0, size: 5, ...values});
    const formatted = data["content"].map(user => (
        {
          ...user,
          createdAt: dayjs(user.createdAt).format("YYYY-MM-DD"),
          updatedAt: dayjs(user.updatedAt).format("YYYY-MM-DD"),
        }));
    handleData(formatted);
    handlePage({
      current: 1,
      pageSize: 5,
      pageSizeOptions: [5, 10, 15, 20],
      total: data["totalElements"],
    });
  };
  return (
      <Form form={form}
            name="advanced_search"
            style={formStyle}
            onFinish={onFinish}
            initialValues="">
        <Row gutter={24}>{getFields()}</Row>
        <Row>
          <Col
              span={24}
              style={{
                textAlign: 'right',
              }}
          >
            <Button type="primary" htmlType="submit">
              Search
            </Button>
            <Button
                style={{
                  margin: '0 8px',
                }}
                onClick={() => {
                  form.resetFields();
                  handleSearchMode(false);
                  handleData(originalData);
                  handlePage({
                    current: 1,
                    pageSize: 5,
                    pageSizeOptions: [5, 10, 15, 20],
                    total: userCount,
                  });
                }}
            >
              Clear
            </Button>
          </Col>
        </Row>
      </Form>
  );
};
export default function SearchForm({
  originalData,
  userCount,
  handleData,
  pageModel,
  handlePage,
  handleSpecs,
  handleSearchMode
}) {

  return (
      <div>
        <AdvancedSearchForm originalData={originalData} userCount={userCount}
                            handleData={handleData} pageModel={pageModel}
                            handlePage={handlePage} handleSpecs={handleSpecs}
                            handleSearchMode={handleSearchMode}/>
      </div>
  );
};