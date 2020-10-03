import React from "react";
import Cookies from "js-cookie";
import { Nav, initializeIcons } from "@fluentui/react";
import { Card } from "@uifabric/react-cards";
import "office-ui-fabric-react/dist/css/fabric.css";

const navigationStyles = {
    root: {
        height: '100vh',
        boxSizing: 'border-box',
        border: '1px solid #eee',
        overflowY: 'auto',
        paddingTop: '10vh',
        backgroundColor: 'white'
      },
}
const links = [
    {
			name: 'Chats',
      links: [
        {
          name: 'sam',
          key:'key1',
          url: '/',
          iconProps: {
            iconName: 'ReminderPerson',
            styles: {
              root: {
                fontSize: 20,
                color: '#106ebe',
              },
            }
          }
        },
        {
          name: 'jackson',
          key: 'key2',
          url: '/',
          iconProps: {
            iconName: 'ReminderPerson',
            styles: {
              root: {
                fontSize: 20,
                color: '#106ebe',
              },
            }
          }
        },
        {
          name: 'rose',
          key: 'key3',
          url: '/',
          iconProps: {
            iconName: 'ReminderPerson',
            styles: {
              root: {
                fontSize: 20,
                color: '#106ebe',
              },
            }
          }
        },
        {
          name: 'jackson',
          key: 'key4',
          url: '/',
          iconProps: {
            iconName: 'ReminderPerson',
            styles: {
              root: {
                fontSize: 20,
                color: '#106ebe',
              },
            }
          }
        },
      ],
    },
  ];

  const Navigation = () => {
    initializeIcons();
    return (
      <Nav
        groups={links}
        selectedKey='key1'
        styles={navigationStyles}
      />
    );
  };
  
  export default Navigation;

