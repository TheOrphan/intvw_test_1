import { useEffect, useReducer } from 'react';
import { Popconfirm, message, List, Card, Avatar, Icon } from 'antd';
import { capitalize } from 'utils/helpers';
import axios from 'axios';
import { URL } from 'utils/api/config';
import { viewComp } from '../viewContact';
import EditComp from '../editContact';
import reducer from 'utils/reducer';

const { Meta } = Card;

export default function Index({ contact, refetch }) {
  const [state, dispatch] = useReducer(reducer, {
    uploadProgress: 0,
    dataModal: [],
    showModal: false,
    buttonDisabled: false,
    commitEdit: false,
  });

  function editContact(id) {
    axios({
      method: 'get',
      url: URL + 'contact/' + id,
    })
      .then(function(response) {
        const data = response.data.data;
        dispatch({ type: 'showModal', showModal: true, dataModal: data });
        dispatch({ type: 'editInput', id: data.id });
        dispatch({ type: 'editInput', firstName: data.firstName });
        dispatch({ type: 'editInput', lastName: data.lastName });
        dispatch({ type: 'editInput', age: data.age });
        dispatch({ type: 'editInput', photo: data.photo });
      })
      .catch(function(error) {
        console.log(error);
        message.error('Data load failed');
      });
  }

  const imageUrl = url => {
    dispatch({ type: 'editInput', photo: url });
  };

  useEffect(() => {
    if (state.commitEdit) {
      axios({
        method: 'put',
        url: URL + 'contact/' + state.id,
        data: {
          firstName: state.firstName,
          lastName: state.lastName,
          age: state.age,
          photo: state.photo,
        },
      })
        .then(function(response) {
          message.success('Contact updated');
          dispatch({ type: 'resetEditInput' });
          refetch({ type: 'refetch', refetch: true });
        })
        .catch(function(error) {
          if (error.response) {
            message.error('ERROR ! ' + error.response.data.message);
          }
          dispatch({ type: 'resetEditInput' });
        });
    }
  }, [state]);

  function viewContact(id) {
    axios({
      method: 'get',
      url: URL + 'contact/' + id,
    })
      .then(function(response) {
        const data = response.data.data;
        viewComp(data);
      })
      .catch(function(error) {
        console.log(error);
        message.error('Data load failed');
      });
  }

  function confirm(id) {
    axios({
      method: 'delete',
      url: URL + 'contact/' + id,
    })
      .then(function(response) {
        message.success('Delete succeed');
      })
      .catch(function(error) {
        console.log(error);
        message.error('Delete failed');
      });
  }

  function cancel(name) {
    message.warning(`Deletion was aborted. ${name} still in your contact!`);
  }

  return (
    <div>
      <List
        grid={{
          gutter: 16,
          xs: 1,
          sm: 2,
          md: 3,
          lg: 4,
          xl: 6,
          xxl: 8,
        }}
        dataSource={contact}
        renderItem={(item, index) => (
          <List.Item key={item.id + index}>
            <Card
              actions={[
                <Icon
                  type="info-circle"
                  key={item.id + 'infocircle'}
                  onClick={() => viewContact(item.id)}
                />,
                <Icon
                  type="edit"
                  key={item.id + 'edit'}
                  onClick={() => editContact(item.id)}
                />,
                <Popconfirm
                  title="Are you sure delete this contact?"
                  onConfirm={() => confirm(item.id)}
                  onCancel={() =>
                    cancel(
                      capitalize(item.firstName) +
                        ' ' +
                        capitalize(item.lastName),
                    )
                  }
                  okText="Delete"
                  cancelText="Abort"
                >
                  <Icon type="delete" key={item.id + 'delete'} />
                </Popconfirm>,
              ]}
            >
              <Meta
                avatar={
                  <Avatar
                    src={
                      item.photo
                        ? item.photo
                        : 'https://via.placeholder.com/150'
                    }
                  />
                }
                title={
                  capitalize(item.firstName) + ' ' + capitalize(item.lastName)
                }
                description={`${item.age} year${item.age > 1 ? 's' : ''} old`}
              />
            </Card>
          </List.Item>
        )}
      />
      <EditComp
        state={state}
        dispatch={dispatch}
        imageUrl={imageUrl}
        helpers={{ capitalize }}
      />
    </div>
  );
}
