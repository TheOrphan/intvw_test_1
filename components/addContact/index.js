import { useReducer } from 'react';
import {
  Progress,
  Drawer,
  Form,
  Button,
  Col,
  Row,
  Input,
  InputNumber,
  Icon,
  message,
} from 'antd';
import reducer from './reducer';
import UploadImage from '../uploadImage';
import { URL } from 'utils/api/config';
import axios from 'axios';

function AddContactForm(props) {
  const [state, dispatch] = useReducer(reducer, {
    buttonDisabled: false,
    showDrawer: false,
  });
  const { getFieldDecorator } = props.form;

  const imageUrl = url => {
    dispatch({ type: 'ADD_INPUT', photo: url });
  };

  const handleSubmit = e => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        // console.log('Received values of form: ', values);
        addContact(values);
      }
    });
  };

  function addContact(values) {
    axios({
      method: 'POST',
      url: URL + 'contact/',
      data: values,
    })
      .then(function(response) {
        console.log(response);
        message.success('Contact saved');
        dispatch({ type: 'CLOSE_DRAWER' });
      })
      .catch(function(error) {
        if (error.response) {
          message.error(
            'Data create fail (' + error.response.data.message + ')',
          );
        } else {
          console.log(error);
        }
      });
  }

  return (
    <div>
      <Button
        type="primary"
        shape="circle"
        icon="plus"
        size="large"
        className="btn-add-contact sm"
        onClick={() => dispatch({ type: 'OPEN_DRAWER' })}
      />
      <Button
        type="primary"
        shape="round"
        icon="plus"
        size="large"
        className="btn-add-contact md"
        onClick={() => dispatch({ type: 'OPEN_DRAWER' })}
      >
        Create contact
      </Button>
      <Drawer
        title="Create a new contact"
        onClose={() => dispatch({ type: 'CLOSE_DRAWER' })}
        visible={state.showDrawer}
        bodyStyle={{ paddingBottom: 80 }}
      >
        <Form layout="vertical" hideRequiredMark onSubmit={handleSubmit}>
          <Row gutter={16}>
            <Col sm={24} md={12}>
              <Form.Item label="First Name">
                {getFieldDecorator('firstName', {
                  rules: [
                    { required: true, massage: 'First name is required' },
                  ],
                })(<Input placeholder="Please enter your first name" />)}
              </Form.Item>
            </Col>
            <Col sm={24} md={12}>
              <Form.Item label="Last Name">
                {getFieldDecorator('lastName', {
                  rules: [{ required: true, massage: 'Last name is required' }],
                })(<Input placeholder="Please enter your last name" />)}
              </Form.Item>
            </Col>
            <Col sm={24} md={12}>
              <Form.Item label="Age">
                {getFieldDecorator('age', {
                  rules: [{ required: true }],
                })(<InputNumber placeholder="Please enter your age" />)}
              </Form.Item>
            </Col>
            <Col sm={24}>
              <Form.Item
                label="Photo"
                style={{ marginBottom: 0, paddingBottom: 0 }}
              >
                {getFieldDecorator('photo', {
                  initialValue: state.photo,
                  rules: [{ required: true }],
                })(<Input type="hidden" />)}
                <UploadImage imageUrl={imageUrl} dispatch={dispatch} />
                <Progress
                  type="circle"
                  style={{ position: 'absolute', left: '.5rem', top: '.5rem' }}
                  percent={state.uploadProgress}
                  format={percent =>
                    percent >= 100 ? (
                      <Icon type="check" />
                    ) : (
                      `${~~(percent / 10)}`
                    )
                  }
                  width={40}
                />
              </Form.Item>
            </Col>
          </Row>
          <div
            style={{
              position: 'absolute',
              right: 0,
              bottom: 0,
              width: '100%',
              borderTop: '1px solid #e9e9e9',
              padding: '10px 16px',
              background: '#fff',
              textAlign: 'right',
            }}
          >
            <Button
              disabled={state.buttonDisabled}
              onClick={() => dispatch({ type: 'CLOSE_DRAWER' })}
              style={{ marginRight: 8 }}
            >
              Cancel
            </Button>
            <Button
              disabled={state.buttonDisabled}
              htmlType="submit"
              // onClick={() => dispatch({ type: 'CLOSE_DRAWER' })}
              type="primary"
            >
              Submit
            </Button>
          </div>
        </Form>
      </Drawer>
    </div>
  );
}

const AddContact = Form.create()(AddContactForm);

export default AddContact;
