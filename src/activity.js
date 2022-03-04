import request from 'sync-request';
import { getAllGoods } from './goods.js';
import goodsState from '../data/goodsState.js';
import { parseDOM } from './DOMParser.js';
import config from '../config.js';
import { log } from './log.js';

function checkGoodsState(userId) {
    try {
        log(`Проверяем состояние товаров на наличие изменений...`);
        const goodsNow = getAllGoods(userId);
        const goodsBackup = goodsState.goods;

        for(let i = 0; i < goodsNow.length; i++) {
            for(let j = 0; j < goodsBackup.length; j++) {
                if(goodsNow[i].offer_id == goodsBackup[j].offer_id) {
                    if(!goodsNow[i].active && goodsBackup[j].active) {
                        log(`Найдено расхождение: ${goodsNow[i].offer_id} ${goodsNow[i].active}`);
                        setState(true, goodsNow[i].offer_id, goodsNow[i].node_id);
                    }
                }
            }
        }

        log(`Проверка состояния товаров завершена.`);
    } catch (err) {
        log(`Ошибка при проверке активности лотов: ${err}`);
    }
}

function setState(state, offer_id, node_id) {
    log(`Обновляем состояние товара ${offer_id}...`);
    let result = [];
    try {
        const query = `?tag=${getRandomTag()}&offer=${offer_id}&node=${node_id}`;
        const url = `${config.api}/lots/offerEdit${query}`;
        const headers = {
            "accept": "*/*",
            "content-type": "application/json",
            "x-requested-with": "XMLHttpRequest",
            "cookie": `golden_key=${config.token}`
        };
    
        const res = request('GET', url, {
            headers: headers,
            retry: true,
            retryDelay: 500,
            maxRetries: Infinity
        });

        const body = res.getBody('utf8');
        const json = JSON.parse(body);
        const doc = parseDOM(json.html);
        const PHPSESSID = res.headers['set-cookie'][0].split(';')[0].split('=')[1];
        const inputsEl = doc.querySelectorAll("input");
        const textAreaEl = doc.querySelectorAll("textarea");
        const selectEl = doc.querySelectorAll("select");

        let inputData = [];
        inputsEl.forEach(input => {
            if(input.name == 'active') {
                if(state) {
                    input.value = 'on';
                } else {
                    return;
                }
            }
            if(input.value == undefined) {
                input.value = '';
            }
            inputData[inputData.length] = {
                name: input.name,
                value: input.value
            };
        });
        textAreaEl.forEach(text => {
            if(text.innerHTML == undefined) {
                text.innerHTML = '';
            }
            inputData[inputData.length] = {
                name: text.name,
                value: text.innerHTML
            };
        });
        selectEl.forEach(select => {
            const options = select.querySelectorAll("option");
            let value = "";

            options.forEach(option => {
                if(option.selected) {
                    value = option.value;
                    return;
                }
            });

            inputData[inputData.length] = {
                name: select.name,
                value: value
            };
        });

        inputData[inputData.length] = {
            name: "location",
            value: "trade"
        };
        
        saveOffer(inputData, PHPSESSID);
    } catch(err) {
        log(`Ошибка при обновлении состояния товара: ${err}`);
    }
    log(`Состояние товара ${offer_id} обновлено.`);
    return result;
}

function saveOffer(inputs, PHPSESSID) {
    let result = [];
    try {
        const url = `${config.api}/lots/offerSave`;
        const headers = {
            "accept": "*/*",
            "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            "x-requested-with": "XMLHttpRequest",
            "cookie": `golden_key=${config.token}; PHPSESSID=${PHPSESSID}`,
        };
        let body = ``;

        inputs.forEach(input => {
            body += `${encodeURIComponent(input.name)}=${encodeURIComponent(input.value)}&`;
        });

        const res = request('POST', url, {
            headers: headers,
            body: body,
            retry: true,
            retryDelay: 500,
            maxRetries: Infinity
        });

        body = res.getBody('utf8');
        const json = JSON.parse(body);
        if(json.error) {
            log(`Ошибка при сохранении товара: ${errors}`);
        }
    } catch(err) {
        log(`Ошибка при сохранении товара: ${err}`);
    }
    return result;
}

function getRandomTag() {
    var a = "";
    var c = "abcdefghijklmnopqrstuvwxyz0123456789";
    for (var b = 0; b < 10; b++) {
        a += c.charAt(Math.floor(Math.random() * c.length));
    }
    return a;
}

export { checkGoodsState, setState };