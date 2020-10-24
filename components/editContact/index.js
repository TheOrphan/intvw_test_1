import { Progress, InputNumber, Modal, Row, Col, Input, Icon } from 'antd';
import UploadImage from '../uploadImage';

export default function editContact({ state, dispatch, imageUrl, helpers }) {
  const { capitalize } = helpers;
  return (
    <Modal
      title={`Edit Contact of ${capitalize(
        state.dataModal.firstName,
      )} ${capitalize(state.dataModal.lastName)}`}
      okButtonProps={{ disabled: state.buttonDisabled }}
      cancelButtonProps={{ disabled: state.buttonDisabled }}
      visible={state.showModal}
      onOk={() => dispatch({ type: 'commitEdit' })}
      onCancel={() => dispatch({ type: 'resetEditInput' })}
    >
      {state.dataModal && (
        <>
          <Col>
            <UploadImage
              isEdit={true}
              data={state.dataModal}
              imageUrl={imageUrl}
              dispatch={dispatch}
            />
            <Progress
              type="circle"
              style={{ position: 'absolute', left: '0.5rem', top: '0.5rem' }}
              percent={state.uploadProgress}
              format={percent =>
                percent >= 100 ? <Icon type="check" /> : `${~~(percent / 10)}`
              }
              width={40}
            />
          </Col>
          <Row type="flex" justify="start">
            <Col xs={24} sm={24} md={5} lg={2} style={{ marginTop: 8 }}>
              Firstname
            </Col>
            <Col xs={24} sm={24} md={10} lg={22} style={{ marginTop: 8 }}>
              <Input
                placeholder={capitalize(state.dataModal.firstName)}
                onChange={ev =>
                  dispatch({ type: 'editInput', firstName: ev.target.value })
                }
                style={{ width: '50%' }}
              />
            </Col>
          </Row>
          <Row type="flex" justify="start">
            <Col xs={24} sm={24} md={5} lg={2} style={{ marginTop: 8 }}>
              Lastname
            </Col>
            <Col xs={24} sm={24} md={10} lg={22} style={{ marginTop: 8 }}>
              <Input
                placeholder={capitalize(state.dataModal.lastName)}
                onChange={ev =>
                  dispatch({ type: 'editInput', lastName: ev.target.value })
                }
                style={{ width: '50%' }}
              />
            </Col>
          </Row>
          <Row type="flex" justify="start">
            <Col xs={24} sm={24} md={5} lg={2} style={{ marginTop: 8 }}>
              Age
            </Col>
            <Col xs={24} sm={24} md={10} lg={22} style={{ marginTop: 8 }}>
              <InputNumber
                placeholder={state.dataModal.age}
                onChange={value => dispatch({ type: 'editInput', age: value })}
              />
            </Col>
          </Row>
        </>
      )}
    </Modal>
  );
}
