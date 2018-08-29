import CryptoJS from 'crypto-js';

import chain from './chain';

export const calcHash = ({ nonce, index, prevHash, timestamp, data }) => CryptoJS.SHA256(nonce + index + prevHash + timestamp + data).toString();

const diff = 3

export const create = (data) => {
    const prefix = '0'.repeat(diff);
    const lastBlock = chain.last()
    let nonce = 0
    while (true) {
        const block = {
            nonce: nonce,
            index: lastBlock.index + 1,
            timestamp: new Date().valueOf(),
            data: data,
            prevHash: lastBlock.hash,
        }
        block.hash = calcHash(block)
        if (block.hash.startsWith(prefix)) {
            return block
        } else {
            nonce += 1
        }
    }
};

export const isNewBlockValid = (newBlock, prevBlock = chain.last()) => {
    return newBlock.index === prevBlock.index + 1 && newBlock.prevHash === prevBlock.hash && calcHash(newBlock) === newBlock.hash
};
