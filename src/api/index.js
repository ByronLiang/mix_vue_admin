import * as stringify from 'qs/lib/stringify';

export default class {
    constructor(prefix = '') {
        this.base_url = prefix;
        this.http = axios.create({
            baseURL: this.base_url,
            withCredentials: true,
            paramsSerializer(params) {
                return stringify(params, {arrayFormat: 'brackets'});
            },
        });
        this.http.interceptors.request.use((config) => config);
        this.http.interceptors.response.use(
            (response) => {
                if (response.data.status === 'success') {
                    return response.data.data;
                }
                if (!this.show_error) return Promise.reject(response.data);
                if (response.data.code) {
                    this.httpErrorHandle(response.data);
                    return Promise.reject(response.data);
                }
                if (response.data.message) {
                    $ele.$message.error(response.data.message);
                    return Promise.reject(response.data);
                }
            },
            (error) => {
                if (!this.show_error) return Promise.reject(error);
                if (error.response && error.response.status > 200) {
                    return this.httpErrorHandle(error);
                }
                $ele.$message.error(error.message);
                return Promise.reject(error);
            }
        );
        for (const i of ['get', 'delete', 'post', 'put']) {
            this[i] = this.http[i];
        }
        this.canShowError();
    }

    httpErrorHandle(error) {
        let msg = error.message;
        switch (error.code) {
            case 401:
                msg = '未登录，请登录后操作';
                vm.$router.push('/login');
                break;
            default:
                if (error && error.message) {
                    msg = error.message;
                }
                break;
        }
        if (msg) $ele.$message.error(msg);
        return Promise.reject(error);
    }

    canShowError() {
        this.show_error = true;
    }

    cantShowError() {
        this.show_error = false;
    }
}
