// Tries树的构造
console.log('it is good');

// 导入coo.js
const Trie = require('./coo');

// 创建一个 Trie 实例
const trie = new Trie();

// 向 Trie 中插入单词.
//其实这里就是建立一个敏感词过滤字典
//这个字典是用trie结构来构建的
trie.insert("apple");
trie.insert("banana");
trie.insert("cat");
trie.insert("dog");

// 搜索单词
console.log(trie.search("apple")); // 输出: true
console.log(trie.search("banana")); // 输出: true
console.log(trie.search("cat")); // 输出: true
console.log(trie.search("dog")); // 输出: true
console.log(trie.search("car")); // 输出: false
console.log(trie.search("ban")); // 输出: false
console.log(trie.search("i like eating apple1")); // 输出: true
console.log("~~~~~~~~~~~~~~~~"); // 输出分隔符

// 搜索前缀
console.log(trie.startsWith("app")); // 输出: true
console.log(trie.startsWith("ban")); // 输出: true
console.log(trie.startsWith("c")); // 输出: true
console.log(trie.startsWith("d")); // 输出: true
console.log(trie.startsWith("ca")); // 输出: true
console.log(trie.startsWith("de")); // 输出: false
console.log(trie.startsWith("ana")); // 输出: false

