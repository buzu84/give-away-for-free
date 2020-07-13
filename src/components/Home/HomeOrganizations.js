import React, { Component } from 'react';
import { compose } from 'recompose';
import { withFirebase } from '../Firebase';

// const HomeOrganizations = () => {
//   return (
//     <>
//       <h1 id="section3" className="organizations_list" style={{height: 400}}>Organizations we're helping...</h1>
//       <Messages />
//     </>
//   );
// }

const HomeOrganizations = () => {
  return (
    <>
      <h1 id="section3" className="organizations_list" style={{height: 400}}>Organizations we're helping...</h1>
    </>
  );
}

// const MessageList = ({ messages }) => (
//   <ul>
//     {messages.map(message => (
//       <MessageItem key={message.uid} message={message} />
//     ))}
//   </ul>
// );
//
// const MessageItem = ({ message }) => (
//   <li>
//     <strong>{message.userId}</strong> {message.text}
//   </li>
// );
//
// class MessagesBase extends Component {
//   constructor(props) {
//     super(props);
//
//     this.state = {
//       loading: false,
//       messages: [],
//     };
//   }
//
//   componentDidMount() {
//     this.setState({ loading: true });
//
//     this.props.firebase.messages().on('value', snapshot => {
//       const messageObject = snapshot.val();
//
//       if (messageObject) {
//         const messageList = Object.keys(messageObject).map(key => ({
//           ...messageObject[key],
//           uid: key,
//         }));
//
//         this.setState({
//           messages: messageList,
//           loading: false
//         });
//       } else {
//         this.setState({ messages: null, loading: false });
//       }
//     });
//   }
//
//   componentWillUnmount() {
//     this.props.firebase.messages().off();
//   }
//
//   render() {
//     const { messages, loading } = this.state;
//
//     return (
//       <div>
//         {loading && <div>Loading ...</div>}
//
//         {messages ? (
//           <MessageList messages={messages} />
//         ) : (
//           <div>There are no messages ...</div>
//         )}
//       </div>
//     );
//   }
// }
//
// const Messages = withFirebase(MessagesBase);



export default HomeOrganizations;
