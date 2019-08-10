import md5 from 'crypto-js/md5';

export const handle = async (apiUrl, minutes = 1, params = null) => {
    const cacheTime = new Date().getTime() + minutes * 60 * 1000;
    const cacheKey = params ? md5(apiUrl + JSON.stringify(params)) : apiUrl;
    let store = null;
    if (minutes) {
        store = SessionStore.get(cacheKey);
    }
    if (!store) {
        store = await API.get(apiUrl, {params});
        SessionStore.set(cacheKey, store, cacheTime);
    }
    return store;
};

/**
 * import {uploadToken} from 'api/Cache'
 * @returns {Promise<*>}
 * @constructor
 */
export const uploadToken = (drive) => handle('../supplier/upload', 2, {drive}, false);

/**
 * import {My} from 'api/Cache'
 * @returns {Promise.<void>}
 * @constructor
 */
export const my = async (commit = null, isCache = true) => {
    const store = await handle('my/profile', Number(isCache));
    if (commit) {
        commit('setMy', store);
    } else {
        vm.$store.commit('setMy', store);
    }
    return store;
};

/**
 * [获取地区]
 * import {getDistrict} from 'api/Cache'
 * @param  {String} use [用途, cascader: 级联选择, null: 地区的一维数组]
 * @returns {Promise.<void>}
 */

export const getDistrict = async (use = null) => {
    const store = await handle('supplier/districts', 120); // 修改 districts 的接口

    if (use === 'cascader') {
        let format = SessionStore.get('formatDistrict');

        if (!format) {
            format = formatDistrict(store, null);
            SessionStore.set('formatDistrict', format);
        }
        return format;
    }

    return store;
};

export const formatDistrict = (data, pid = null) => {
    const result = [];

    data.forEach((el) => {
        if (el.pid === pid) {
            const temp = formatDistrict(data, el.id);
            if (temp.length > 0) el.children = temp;
            result.push(el);
        }
    });

    return result;
};
