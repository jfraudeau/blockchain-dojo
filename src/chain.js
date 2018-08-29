import { calcHash, isNewBlockValid } from './block';

const Chain = (function () { // eslint-disable-line func-names
    let instance;
    const origin = {
        index: 0,
        timestamp: 0,
        data: 'Hello Blockchain!',
        prevHash: 0,
        hash: calcHash({
            index: 0,
            prevHash: 0,
            timestamp: 0,
            data: 'Hello Blockchain!'
        })
    };
    const chain = [origin];

    function isChainValid(newChain) {
        return newChain.reduce((ok, current, idx, arr) => {
            if (!ok) {
                return ok;
            } else {
                if (idx === 0) {
                    return current.index === 0 && current.hash === calcHash(current)
                } else {
                    return isNewBlockValid(current, arr[idx - 1])
                }
            }
        }, true)
    }

    function get() {
        return chain;
    }

    function update(block) {
        if (isNewBlockValid(block)) {
            chain.push(block)
        }
    }

    function last() {
        return chain.slice().pop();
    }

    function replace(newChain) {
        if (newChain.length > chain.length && isChainValid(newChain)) {
            chain.length = 0;
            newChain.forEach(element => {
                chain.push(element)
            });
        }
    }

    function create() {
        return {
            get,
            update,
            last,
            replace
        };
    }

    return {
        init() {
            if (!instance) {
                instance = create();
            }
            return instance;
        }
    };
}());

export default Chain.init();
