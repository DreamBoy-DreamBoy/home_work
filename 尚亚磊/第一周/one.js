
//异步创建
function copy(source,target){
    fs.readFile(source, function (err,data) {
        if(!err){
            fs.writeFile(target,data, function (err, data) {
            });
        }
    });
}


function Event (){
    this._events = {};
}

Event.prototype.once = function (eventName,callback) {
    if(this._events[eventName]){
        if(this._events[eventName]==callback) {
            this._events[eventName].push(callback);
        }
    }else{
        this._events[eventName] = [callback];
    }
};

