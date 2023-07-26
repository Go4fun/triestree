// 这是一个基于trie树的敏感词过滤

// 引入敏感词
const tWords = require('./words.js');

// 一个trie树的node，其实就是包含一个map
class Node {
    constructor() {
        this.map = new Map();
        this.content = null;
        this.stop = false;
    }
}

class TrieTree {
    constructor() {
        this.rootNode = new Node();
        this.forEndNode = new Node();

    }

    // 根据字典建立trie树
    build(words) {
        // console.log(this.rootNode.map);
        for (let i = 0; i < words.length; i++) {
            let node = this.rootNode;
            const item = words[i];
            for (let j = 0; j < item.length; j++) {
                if (node.map.has(item[j])) {
                    node = node.map.get(item[j]);
                    continue;
                }

                // insert item[j] to tree
                const newNode = new Node();
                node.map.set(item[j], newNode);
                newNode.content = item[j];
                node = newNode;
            }

            //一个item加进去后，要给最后一个普点增加标志位表示到这里时一个完整的敏感词
            node.stop = true;
        }
    } 

    // 整颗树打印
    show() {
        this.__travel(this.rootNode, null);
    }

    // 遍历
    __travel(node, parentNode) {
        if (node) {
            if (node === this.rootNode) {
                console.log(`这是根顶点.`);
            }
            else {
                console.log(`这是普点. 内容=${node.content}. parent点是=${parentNode.content}`);
            }

            for (let item of node.map.entries()) {
                this.__travel(item[1], node);
            }
        }
    }

    // 搜索
    __search(node, content) {
        if (node.map.has(content)) {
            return node.map.get(content);
        }

        return null;
    }

    // 判断是否命中敏感词
    isSpam(word) {
        // 把word里的字依次做搜索， 如果命中，则把下一个字放入继续. 如果命中不到，则从本次搜索的第一个字的下一个字继续从头匹配搜索.
        let node = this.rootNode;
        let j = 0;
        let i = 0;
        console.log('\n');
        console.log(`开始匹配word=${word}`);
        while (i < word.length) {
            console.log(`开始查找${word[i]}`);
            node = this.__search(node, word[i]);
            if (node === null) {
                node = this.rootNode;
                j = j + 1;
                i = j;
                console.log(`字典匹配不到了，继续从i=${i}搜索`);
                continue;
            }
            console.log(`返回的node.content=${node.content}`);
            if (node.stop) {
                return true;
            }

            i++;
        }

        return false;
    }
}

const tree = new TrieTree();
tree.build(tWords);
tree.show();

console.log(tree.isSpam('属于玩一个少一个的好本吧，前戏案件推理属于暖场，以为就这么完了后面一直沉浸在推凶还原上，结局最后细节还是藏在里面，两个凶手都投对了，最后凶手忽略了细节，说自己是苹果凶手的人自己也没想到。英文细节在明显一点就好了。真的是直得玩的好本，没玩过的推荐上车。'));
