// ==================== Именованный экспорт ======================//

//файл logger.js
exports.info = (message) => {
  console.log('info: ' + message);
};
exports.verbose = (message) => {
  console.log('verbose: ' + message);
};

//Запрос
//файл main.js
const logger = require('./logger');
logger.info('This is an informational message');
logger.verbose('This is a verbose message');


/* ------------------------- Экспорт функций ------------------------- */
