import {Col, Row, Statistic} from 'antd';

const UserStatistic = ({value}) => (
    <Row gutter={16}>
      <Col span={12}>
        <Statistic title="Available Users" value={value} valueStyle={{color: "red"}}/>
      </Col>
    </Row>
);
export default UserStatistic;