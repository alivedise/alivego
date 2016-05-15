export class Vertex {
  DEBUG = false;
  constructor(id, adj) {
    this.id = id;
    this.adj = adj || [];
    this.neighbors = [];

    // For BFS
    this.state = 'w'; // white
  }
  toString() {
    return this.id;
  };
  setVisited(visited) {
    this.visited = visited;
  };
  setManager(manager) {
    this.manager = manager;
    this.neighbors = this.getNeighbors();
  };
  getNeighbors() {
    if (!this.manager) {
      return [];
    }
    return this.adj.map(function(id) {
      return this.manager.getVertex(id)
    }, this);
  };
  hasRoute() {
    return this.neighbors.some(function(n) {
      if (n.state === 'w') {
        n.markAsGrey();
        return n.hasRoute();
      } else if (n.state === 'grey') {
        n.markAsBlack();
        return true;
      } else {
        return true;
      }
    });
  };
  visit() {
    if (this.visited) {
      return;
    }
    if (this.DEBUG) {
      console.log('visiting', this.id);
    }
    this.visited = true;
    this.manager && this.manager.visit(this);
    this.getNeighbors().forEach(function(v) {
      v.visit();
    });
  };
  markAsGrey() {
    this.state = 'g';
  };
  isWhite() {
    return this.state === 'w';
  };
  markAsBlack() {
    this.state = 'b';
    if (this.DEBUG) {
      console.log('done:', this.id);
    }
  };
  markAsWhite() {
    this.state = 'w';
  };
  isVisitedByBFS() {
    return this.visitedByBFS;
  }
};

export class Graph {
  constructor(vertices) {
    this.vertices = vertices || [];
    this.idMap = new Map();
    this.vertices.forEach(function(v) {
      this.idMap.set(v.id, v);
    }, this);
    this.vertices.forEach(function(v) {
      v.setManager(this);
    }, this);
  };
  visit(v) {
    this.visitQueue.push(v.id);
  };
  initForDFS() {
    this.visitQueue = [];
    this.vertices.forEach(function(v) {
      v.setVisited(false);
      v.setManager(this);
    }, this);
  };
  dfs() {
    this.initForDFS();
    if (!this.vertices.length) {
      return;
    }
    var t = this.vertices[0];
    t.visit();
  };
  getVertex(id) {
    return this.idMap.get(id);
  };
  initForBFS() {
    this.blackQueue = [];
    this.greyQueue = [];
    this.vertices.forEach(function(v) {
      v.markAsWhite();
      v.setManager(this);
    }, this);
  };
  bfs() {
    this.initForBFS();
    if (!this.vertices.length) {
      return;
    }
    var t = this.vertices[0];
    t.markAsGrey();
    this.greyQueue.push(t);
    while (this.greyQueue.length > 0) {
      var v = this.greyQueue.shift();
      v.getNeighbors().forEach(function(n) {
        if (n.isWhite()) {
          n.markAsGrey();
          this.greyQueue.push(n);
        }
      }, this);
      v.markAsBlack();
      this.blackQueue.push(v.id);
    }
  };
  hasRoute() {
    this.vertices.forEach(function(v) {
      v.setManager(this);
      v.markAsWhite();
    }, this);
    return this.vertices.some(function(v) {
      return v.hasRoute();
    });
  };
};
