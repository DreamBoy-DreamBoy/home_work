//异步创建文件夹
function mkdir(path){
    index = arguments[1] || 1;
    var ary = path.split('/');
    if (index > ary.length) {
        return
    }
    var str = ary.slice(0, index).join('/');
    if (!fs.existsSync(str)) {
        fs.mkdir(str, function () {
            index++;
            mkdir(path, index)
        })
    }
}

//发布订阅
function Event() {
    this.myEvent = {}
}
Event.prototype.on = function (fnname, fn) {
    if (this.myEvent.fnname) {
        this.myEvent.fnname.forEach(function (item) {
            if (item == fn) {
                return
            }
        });
        this.myEvent.fnname.push(fn)
    } else {
        this.myEvent.fnname = [fn]
    }
};
Event.prototype.once = function (fnname, fn) {
    if (this.myEvent.fnname) {
        this.myEvent.fnname.forEach(function (item) {
            if (item ==fn) {
                return
            }
        });
        fn.flag='ok';
        this.myEvent.fnname.push(fn)
    } else {
        this.myEvent.fnname = [fn]
    }
};
Event.prototype.off = function (fnname, fn) {
    var ary = this.myEvent.fnname;
    for (var i = 0; i < ary.length; i++) {
        if (ary[i] == fn) {
            ary[i] = null
        }
    }
};
Event.prototype.emit = function (fnname) {
    var args = Array.prototype.slice.call(arguments, 1);
    var ary = this.myEvent.fnname;
    for(var i=0;i<ary.length;i++){
        var item=ary[i];
        if (typeof item == "function"&& typeof item.flag=="string") {
            item.apply(this, args);
            this.off(fnname,item)
        } else if (typeof item == "function") {
            item.apply(this, args);
        } else {
            ary.splice(index, 1);
            i--
        }
    }
};
