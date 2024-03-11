class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }

  addAdjacent(node) {
    this.adjacent.add(node);
  }

  removeAdjacent(node) {
    this.adjacent.delete(node);
  }
}

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  addVertex(vertex) {
    this.nodes.add(vertex);
  }


  addVertices(vertexArray) {
    vertexArray.forEach(vertex => {
      this.addVertex(vertex);
    });
  }


  addEdge(v1, v2) {
    v1.addAdjacent(v2);
    v2.addAdjacent(v1);
  }


  removeEdge(v1, v2) {
    v1.removeAdjacent(v2);
    v2.removeAdjacent(v1);
  }


  removeVertex(vertex) {

    this.nodes.delete(vertex);


    this.nodes.forEach(node => {
      node.removeAdjacent(vertex);
    });
  }

  depthFirstSearch(start) {
    const visited = new Set();
    const result = [];

    function dfs(node) {
      if (!node || visited.has(node)) return;
      visited.add(node);
      result.push(node.value);
      node.adjacent.forEach(neighbor => {
        dfs(neighbor);
      });
    }

    dfs(start);
    return result;
  }

  breadthFirstSearch(start) {
    const visited = new Set();
    const queue = [start];
    const result = [];

    visited.add(start);

    while (queue.length > 0) {
      const current = queue.shift();
      result.push(current.value);
      current.adjacent.forEach(neighbor => {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push(neighbor);
        }
      });
    }

    return result;
  }
}


module.exports = {Graph, Node}