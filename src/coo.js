const fs = require('fs');

class TrieNode {
  constructor() {
    this.children = new Map();
    this.isEndOfWord = false;
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  insert(word) {
    let node = this.root;
    for (let char of word.toLowerCase()) {
      if (!node.children.has(char)) {
        node.children.set(char, new TrieNode());
      }
      node = node.children.get(char);
    }
    node.isEndOfWord = true;
  }

  insertFromFile(filePath) {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const words = fileContent.split('\n');
    for (let word of words) {
      this.insert(word.trim());
    }
  }

  filter(text) {
    let filteredText = '';
    let currentNode = this.root;
    let startIndex = 0;

    for (let i = 0; i < text.length; i++) {
      const char = text[i].toLowerCase();

      if (currentNode.children.has(char)) {
        currentNode = currentNode.children.get(char);

        if (currentNode.isEndOfWord) {
          filteredText += '*'.repeat(i - startIndex + 1);
          startIndex = i + 1;
          currentNode = this.root;
        }
      } else {
        filteredText += text[startIndex];
        startIndex++;
        i = startIndex - 1;
        currentNode = this.root;
      }
    }

    filteredText += text.substring(startIndex);

    return filteredText;
  }

  search(word) {
    let node = this.root;
    for (let char of word.toLowerCase()) {
      if (!node.children.has(char)) {
        return false;
      }
      node = node.children.get(char);
    }
    return node.isEndOfWord;
  }

  startsWith(prefix) {
    let node = this.root;
    for (let char of prefix.toLowerCase()) {
      if (!node.children.has(char)) {
        return false;
      }
      node = node.children.get(char);
    }
    return true;
  }
}

module.exports = Trie;
