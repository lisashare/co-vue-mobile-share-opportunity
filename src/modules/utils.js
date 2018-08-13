/**
 * 存储localStorage
 */

const setStore = (name, content) => {
	if (!name) return;
	if (typeof content !== 'string') {
		content = JSON.stringify(content);
	}
	window.localStorage.setItem(name, content);
}


/**
 * 获取localStorage
 */
const getStore = name => {
	if (!name) return;
	var value = JSON.parse(window.localStorage.getItem(name));
	if(!value.length) return ;
	return value
}

/**
 * 删除localStorage
 */
const removeStore = name => {
	if (!name) return;
	window.localStorage.removeItem(name);
}


export default {
    setStore,getStore,removeStore
}