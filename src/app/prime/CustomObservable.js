class CustomObservable {
    objToObserve = null;
    listeners = [];

    constructor(_objToObserve=null) {
        this.objToObserve = _objToObserve;
        this.listeners = [];
    }

    set(_objToObserve){
        this.objToObserve = _objToObserve;
        this.notifyAll();
    }

    get() { return this.objToObserve; }

    addListener(func){
        this.listeners.push(func);
    }

    removeListener(func){
        this.listeners = this.listeners.filter(_func => _func !== func);
    }

    notifyAll(){
        for(const listener of this.listeners){
            listener(this.objToObserve);
        }
    }
};

module.exports = {
    CustomObservable: CustomObservable
}
