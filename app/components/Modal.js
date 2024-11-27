import { motion } from "framer-motion";

const Modal = ({ type, title, message, icon, onClose }) => {
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 }
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };

  const getIconColor = (type) => {
    switch (type) {
      case 'success':
        return 'text-green-500';
      case 'error':
        return 'text-red-500';
      case 'warning':
        return 'text-yellow-500';
      default:
        return 'text-gray-500';
    }
  };

  const getButtonColor = (type) => {
    switch (type) {
      case 'success':
        return 'bg-green-500 hover:bg-green-600';
      case 'error':
        return 'bg-red-500 hover:bg-red-600';
      case 'warning':
        return 'bg-yellow-500 hover:bg-yellow-600';
      default:
        return 'bg-gray-500 hover:bg-gray-600';
    }
  };

  // Função para formatar a mensagem
  const formatMessage = (message) => {
    if (!message) return '';
    // Divide a mensagem por ponto e vírgula e remove espaços extras
    return message.split(';').map((msg, index) => (
      <div key={index}>
        {msg.trim()}
        {index < message.split(';').length - 1 && (
          <>
            <br />
            <br />
          </>
        )}
      </div>
    ));
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={overlayVariants}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <motion.div
        variants={modalVariants}
        className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl"
      >
        <div className="flex items-center mb-4">
          <i className={`fas fa-${icon} ${getIconColor(type)} text-2xl mr-2`} />
          <h2 className="text-xl font-semibold">{title}</h2>
        </div>
        
        <div className="mb-6">
          <p className="text-gray-700">
            {formatMessage(message)}
          </p>
        </div>

        <div className="flex justify-end">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
            className={`
              px-4 py-2 rounded-md text-white transition-colors
              ${getButtonColor(type)}
            `}
          >
            Fechar
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Modal; 