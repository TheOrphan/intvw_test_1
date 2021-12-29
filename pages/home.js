import { useEffect, useReducer } from 'react';
import { List, Typography, Icon, Input, PageHeader, Button } from 'antd';
import { genCharArray } from 'utils/helpers';
import { useContact } from 'utils/custom-hooks';
import ListContact from 'components/listContact';
import AddContact from 'components/addContact';
import reducer from 'utils/reducer';

const { Search } = Input;
const { Title } = Typography;

export default function Index() {
  const [state, dispatch] = useReducer(reducer, {
    refetch: false,
    data: [],
    search: [],
    shownContact: [],
  });
  const [contact, refetch] = useContact();
  const alphabet = genCharArray('a', 'z');

  useEffect(() => {
    if (contact || state.refetch) {
      const contactFirstChar = contact.map(contact =>
        contact.firstName.charAt(0).toLowerCase(),
      );
      const alphabetExist = alphabet.filter(each =>
        contactFirstChar.includes(each.toLowerCase()),
      );
      dispatch({ type: 'contactList', data: alphabetExist });
      dispatch({ type: 'filterList', shownContact: contact });
      dispatch({ type: 'refetch', refetch: false });
      refetch(state.refetch);
    }
  }, [contact, state.refetch]);

  useEffect(() => {
    if (state.search) {
      const contactFirstChar = state.search.map(contact =>
        contact.firstName.charAt(0).toLowerCase(),
      );
      const alphabetExist = alphabet.filter(each =>
        contactFirstChar.includes(each.toLowerCase()),
      );
      dispatch({ type: 'contactList', data: alphabetExist });
      dispatch({ type: 'filterList', shownContact: state.search });
    }
  }, [state.search]);

  function findContact(sParam) {
    dispatch({
      type: 'searchList',
      search: contact.filter(
        each =>
          each.firstName.toLowerCase().includes(sParam.toLowerCase()) ||
          each.lastName.toLowerCase().includes(sParam.toLowerCase()),
      ),
    });
  }

  return (
    <div>
      <PageHeader
        style={{
          border: '1px solid rgb(235, 237, 240)',
        }}
        title="Find a contact"
        subTitle="Home"
        extra={[
          <Search
            key={'search'}
            placeholder="Search"
            onSearch={value => findContact(value)}
          />,
        ]}
      />

      <List
        dataSource={state.data}
        renderItem={(item, index) => (
          <List.Item key={item + index} style={{ padding: '1rem 2rem' }}>
            <List.Item.Meta
              description={
                <div>
                  <div style={{ width: '100%' }}>
                    <Title level={4}>{item.toUpperCase()}</Title>
                  </div>
                  <div style={{ width: '100%' }}>
                    {state.shownContact && (
                      <ListContact
                        refetch={dispatch}
                        contact={state.shownContact.filter(
                          each =>
                            each.firstName.charAt(0).toLowerCase() ===
                            item.toLowerCase(),
                        )}
                      />
                    )}
                  </div>
                </div>
              }
            />
          </List.Item>
        )}
      />

      <AddContact refetch={dispatch} />
    </div>
  );
}
