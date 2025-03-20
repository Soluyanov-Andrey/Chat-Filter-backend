/**
 * Удаляем из файла ненужные блоки указывая их названия
 */

const fs = require('fs/promises');
const path = require('path');
const cheerio = require('cheerio');

const isSimilar = require('../subsidiary/isSimilar');

const { saveHtmlToFile } = require('../subsidiary/fileUtils.js'); 
const { readFileContent } = require('../subsidiary/fileUtils.js');


/**
 * Фильтрует блоки .chat-box__human--prompt, удаляя блоки
 * .wrap-ai-completed и .chat-box human, содержащие текст из массива targetTexts.
 * Ищет .wrap-ai-completed следующий за .chat-box human
 * Если текст в .chat-box__human--prompt *содержится* в массиве targetTexts, блоки удаляются.
 * Если текст *не* содержится в массиве targetTexts, блоки остаются.
 * @param {string} filePath - Путь к исходному HTML файлу.
 * @param {string} outputPath - Путь для сохранения отфильтрованного HTML.
 * @param {string[]} targetTexts - Массив текстов, которые нужно удалить.
 * @returns {Promise<void>}
 */
function filterChatBoxesRemoveListed(htmlContent,targetTexts) {
    try {
        const $ = cheerio.load(htmlContent);

        let elementsToRemove = []; // Массив для хранения элементов для удаления

        $('.chat-box__human--prompt').each((index, element) => {
            const boxText = $(element).text().trim();
            let shouldRemove = false; // Флаг, указывающий, нужно ли удалить блок

            // Проверяем, содержится ли текст блока в массиве targetTexts
            for (const targetText of targetTexts) {
                if (isSimilar(boxText, targetText)) {
                    shouldRemove = true;
                    break; // Если текст найден, выходим из цикла
                }
            }

            if (shouldRemove) {
                // Если текст совпадает с одним из targetTexts, добавляем блоки для удаления
                let parentChatBox = $(element).closest('.chat-box.human');
                let wrapAiCompleted = parentChatBox.next('.wrap-ai-completed');

                if (wrapAiCompleted.length > 0) {
                    elementsToRemove.push(wrapAiCompleted[0]);
                }

                if (parentChatBox.length > 0) {
                    elementsToRemove.push(parentChatBox[0]);
                }
            }
        });

        // Удаляем элементы из DOM (важно делать это после итерации)
        elementsToRemove.forEach(el => {
            $(el).remove();
        });

        const filteredHtml = $.html();

        return(filteredHtml);

    } catch (error) {
        console.error(`Ошибка при обработке файла: ${error}`);
    }
}
// Экспорт функции
function saveListedHTML(pathFile, pathFileNew,targetTexts){
    readFile = readFileContent(pathFile);
    filterHTML = filterChatBoxesRemoveListed(readFile,targetTexts);
    console.log(filterHTML);

    saveHtmlToFile(pathFileNew,filterHTML);
   
}

// Экспорт функции
module.exports.saveListedHTML =  saveListedHTML;
module.exports.filterChatBoxesRemoveListed =  filterChatBoxesRemoveListed;

// Пример использования:
// const inputFile = path.join(__dirname, 'ChatGPT _ ChatGPT 4o Free _ Support all countries.html');
// const outputFile = path.join(__dirname, 'output.html');
// const targetTexts = ['после команды ip link я получил сетевые интерфэйсы 1: lo: mtu 65536 qdisc noqueue state UNKNOWN mode DEFAULT group default qlen 1000 link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00 2: enp1s0: mtu 1500 qdisc fq_codel state UP mode DEFAULT group default qlen 1000 link/ether 2c:4d:54:4f:29:3a brd ff:ff:ff:ff:ff:ff 3: virbr0: mtu 1500 qdisc noqueue state DOWN mode DEFAULT group default qlen 1000 link/ether 52:54:00:52:43:cc brd ff:ff:ff:ff:ff:ff 4: docker0: mtu 1500 qdisc noqueue state DOWN mode DEFAULT group default link/ether 02:42:bd:c1:bb:99 brd ff:ff:ff:ff:ff:ff 5: br-f4416c759ce2: mtu 1500 qdisc noqueue state UP mode DEFAULT group default link/ether 02:42:20:24:f9:91 brd ff:ff:ff:ff:ff:ff 7: veth208085e@if6: mtu 1500 qdisc noqueue master br-f4416c759ce2 state UP mode DEFAULT group default link/ether de:96:47:24:54:55 brd ff:ff:ff:ff:ff:ff link-netnsid 0 8: br0: mtu 1500 qdisc noqueue state DOWN mode DEFAULT group default qlen 1000 link/ether b2:35:7d:2d:25:bc brd ff:ff:ff:ff:ff:ff 9: vnet0: mtu 1500 qdisc noqueue master br0 state UNKNOWN mode DEFAULT group default qlen 1000 link/ether fe:54:00:83:f9:45 brd ff:ff:ff:ff:ff:ff (расскажи о них)', 
//     'sudo ip addr flush dev br0 sudo ip link set dev br0 down',
// 'выполняя sudo ip addr flush dev br0 sudo ip link set dev br0 down почемуто brctl show показывает что br есть',
// 'демон и службы виндоус это одно тоже?',
// 'systemd, SysVinit, Upstart что это']; // Массив текстов для сохранения

// filterChatBoxesRemoveListed(inputFile, outputFile, targetTexts);