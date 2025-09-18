const { createTopic } = require('./createTopic'); // Замените 'your-file-name'

const { DOCUMENT_PAGE_HREF } = require('./../../config'); 

function apiCreateTopic(path,topicValue) {
    path = path + '/' + DOCUMENT_PAGE_HREF;
  createTopic(path,topicValue);
}

module.exports.apiCreateTopic = apiCreateTopic;