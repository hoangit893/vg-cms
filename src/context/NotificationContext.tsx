// import React, { createContext, useState } from "react";
// import { notification } from "antd";

// interface NotificationContextProps {
//   showNotification: (message: string, type: "info") => void;
// }

// export const NotificationContext = createContext<NotificationContextProps>({
//   showNotification: () => {},
// });

// export const NotificationProvider: React.FC = ({ children }) => {
//   const [visible, setVisible] = useState(false);
//   const [message, setMessage] = useState("");
//   const notitfy = (message: string, type: string) => {
//     setMessage(message);
//     setVisible(true);
//     notification.open({
//       message: "Notification",
//       description: message,
//       onClose: () => setVisible(false),
//     });
//   };

//   return (
//     <NotificationContext.Provider value={{ showNotification }}>
//       {children}
//     </NotificationContext.Provider>
//   );
// };
