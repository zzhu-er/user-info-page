import {Button, Col, DatePicker, Form, Input, Row, theme} from 'antd';
import {dynamicFetchUsers} from "@component/services/api";
import dayjs from "dayjs";
import moment from "moment-timezone";

moment.tz.setDefault('Etc/UTC');

const AdvancedSearchForm = ({
  originalData,
  userCount,
  handleUserCount,
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
    {dataIndex: "name", label: "NAME"},];
  const getFields = () => {
    const {RangePicker} = DatePicker;
    const count = 2;
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
    children.push(
        <Col span={12} key="3">
          <Form.Item
              name="timeRange"
              label="Time Range"
          >
            <RangePicker showTime/>
          </Form.Item>
        </Col>,
    );
    return children;
  };
  const onFinish = async (values) => {
    const timeRange = values["timeRange"]
    const pickedValues = (({age, name}) => ({age, name}))(values);
    const specs = {
      ...pickedValues,
      from: timeRange ? timeRange[0] : undefined,
      to: timeRange ? timeRange[1] : undefined
    }
    handleSearchMode(true);
    handleSpecs(specs);
    const data = await dynamicFetchUsers({page: 0, size: 5, ...specs});
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
      showSizeChanger: true,
    });
    handleUserCount(data["totalElements"]);
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
                    showSizeChanger: true,
                  });
                  handleUserCount(userCount);
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
  handleUserCount,
  handleData,
  pageModel,
  handlePage,
  handleSpecs,
  handleSearchMode
}) {

  return (
      <div>
        <AdvancedSearchForm originalData={originalData} userCount={userCount}
                            handleUserCount={handleUserCount}
                            handleData={handleData} pageModel={pageModel}
                            handlePage={handlePage} handleSpecs={handleSpecs}
                            handleSearchMode={handleSearchMode}/>
      </div>
  );
};