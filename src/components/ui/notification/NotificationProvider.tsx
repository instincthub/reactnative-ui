import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";
import Notification, { NotificationType } from "./Notification";

interface NotificationOptions {
  /** Title of the notification (optional) */
  title?: string;
  /** Message to display in the notification */
  message: string;
  /** Type of notification which determines colors */
  type?: NotificationType;
  /** Duration in milliseconds before auto-closing (0 for no auto-close) */
  duration?: number;
  /** Position to display the notification */
  position?: "top" | "bottom";
  /** Additional action to display at the end */
  action?: {
    text: string;
    onPress: () => void;
  };
}

interface NotificationContextValue {
  /**
   * Show a notification
   * @param options Notification configuration options
   */
  showNotification: (options: NotificationOptions) => void;

  /**
   * Show a success notification
   * @param message Message to display
   * @param title Optional title
   * @param duration Optional duration in ms
   */
  showSuccess: (message: string, title?: string, duration?: number) => void;

  /**
   * Show an error notification
   * @param message Message to display
   * @param title Optional title
   * @param duration Optional duration in ms
   */
  showError: (message: string, title?: string, duration?: number) => void;

  /**
   * Show a warning notification
   * @param message Message to display
   * @param title Optional title
   * @param duration Optional duration in ms
   */
  showWarning: (message: string, title?: string, duration?: number) => void;

  /**
   * Show an info notification
   * @param message Message to display
   * @param title Optional title
   * @param duration Optional duration in ms
   */
  showInfo: (message: string, title?: string, duration?: number) => void;

  /**
   * Hide the current notification
   */
  hideNotification: () => void;
}

const NotificationContext = createContext<NotificationContextValue | undefined>(
  undefined
);

interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({
  children,
}) => {
  const [visible, setVisible] = useState(false);
  const [currentNotification, setCurrentNotification] =
    useState<NotificationOptions | null>(null);

  const hideNotification = useCallback(() => {
    setVisible(false);
  }, []);

  const showNotification = useCallback(
    (options: NotificationOptions) => {
      // If there's already a notification, hide it first
      if (visible) {
        setVisible(false);
        // Add a small delay to allow the animation to complete
        setTimeout(() => {
          setCurrentNotification(options);
          setVisible(true);
        }, 300);
      } else {
        setCurrentNotification(options);
        setVisible(true);
      }
    },
    [visible]
  );

  const showSuccess = useCallback(
    (message: string, title?: string, duration = 3000) => {
      showNotification({
        message,
        title,
        type: "success",
        duration,
      });
    },
    [showNotification]
  );

  const showError = useCallback(
    (message: string, title?: string, duration = 5000) => {
      showNotification({
        message,
        title,
        type: "error",
        duration,
      });
    },
    [showNotification]
  );

  const showWarning = useCallback(
    (message: string, title?: string, duration = 4000) => {
      showNotification({
        message,
        title,
        type: "warning",
        duration,
      });
    },
    [showNotification]
  );

  const showInfo = useCallback(
    (message: string, title?: string, duration = 3000) => {
      showNotification({
        message,
        title,
        type: "info",
        duration,
      });
    },
    [showNotification]
  );

  return (
    <NotificationContext.Provider
      value={{
        showNotification,
        showSuccess,
        showError,
        showWarning,
        showInfo,
        hideNotification,
      }}
    >
      {children}
      {currentNotification && (
        <Notification
          visible={visible}
          onClose={hideNotification}
          title={currentNotification.title}
          message={currentNotification.message}
          type={currentNotification.type}
          duration={currentNotification.duration}
          position={currentNotification.position}
          action={currentNotification.action}
        />
      )}
    </NotificationContext.Provider>
  );
};

/**
 * Hook to use notifications in your components
 * @returns Notification functions
 */
export const useNotification = (): NotificationContextValue => {
  const context = useContext(NotificationContext);

  if (!context) {
    throw new Error(
      "useNotification must be used within a NotificationProvider"
    );
  }

  return context;
};

export default NotificationProvider;
