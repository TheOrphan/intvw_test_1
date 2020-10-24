import { Modal, Row, Col, Tag } from 'antd';
import { capitalize } from 'utils/helpers';

export function viewComp(data) {
  const modal = Modal.info();
  modal.update({
    title: capitalize(data.firstName) + ' ' + capitalize(data.lastName),
    content: (
      <Row>
        <Col>
          <img
            src={data.photo ? data.photo : 'https://via.placeholder.com/150'}
            onError={e => {
              e.target.src = 'https://via.placeholder.com/150';
            }}
            width="100%"
            style={{ borderRadius: 4 }}
          />
        </Col>
        <Col>
          <Tag
            color="#000000b0"
            style={{
              position: 'absolute',
              bottom: 1,
              fontSize: 12,
              padding: '2px 7px 3px',
            }}
          >
            {`${data.age} year${data.age > 1 ? 's' : ''} old`}
          </Tag>
        </Col>
      </Row>
    ),
  });
}
