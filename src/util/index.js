const util = {
    getUrlParams: function (param, url) {
        if (!param) return ''

        let _url = url || window.location.search
        var reg = new RegExp('(^|&)' + param + '=([^&]*)(&|$)', 'i');
        var r = _url.substr(1).match(reg);
        if (r != null) {
            return unescape(r[2]);
        }
        return null;
    }
}

export default util
