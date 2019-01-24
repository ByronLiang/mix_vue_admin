/**
 * 递归生成树型结构数据
 * @param array
 * @param option
 * @return {*}
 */
export default (array = [], option = null) => {
    const opt = {
        startPid: null, // 起始pid
        value: 'value', // 返回的值
        label: 'label', // 返回文本
        pid: 'pid', // 上级字段名
        maxLevel: null, // 最多渲染几级
        exception: null, // 排除的ID
        disabled: null, // 是否可以编辑
    };
    if (option) {
        Object.assign(opt, option);
    }

    const gen = (pid = opt.startPid) => array
        .filter((val) => val.pid === pid)
        .filter((val) => Number(opt.exception) !== Number(val.id))
        .filter((val) => opt.maxLevel === null || (Array.isArray(val.pids) && val.pids.length < opt.maxLevel))
        .map((val, index, arr) => {
            let item = {};
            if (opt.callback instanceof Function) {
                Object.assign(item, opt.callback(val, index, arr));
            } else {
                item = {
                    [opt.value]: val.id,
                    [opt.label]: val.name,
                    [opt.pid]: val.pid,
                };
            }

            if (array.find((ii) => ii.pid === val.id)) {
                item.children = gen(val.id);
                if (item.children.length) {
                    (item[opt.disabled] = true);
                } else {
                    delete item.children;
                }
            }
            return item;
        });
    return gen();
};
