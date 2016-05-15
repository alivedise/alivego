import test from 'ava';
import {Graph, Vertex} from '../../../src/common/components/graph';

test('Visit vertext', assert => {
  var v = new Vertex('a');
  v.visit();
  assert.is(v.visited, true);
  v.visit();
  assert.is(v.visited, true);
});

test('Empty graph DFS', assert => {
  var g = new Graph();

  g.dfs();
  assert.deepEqual(g.visitQueue, []);
});

test('Normal graph DFS', assert => {
  var g = new Graph([
    new Vertex('a', ['b', 'c', 'd']),
    new Vertex('b', ['e', 'f']),
    new Vertex('c', []),
    new Vertex('d', ['g']),
    new Vertex('e', ['i', 'j', 'k']),
    new Vertex('f'),
    new Vertex('g'),
    new Vertex('i'),
    new Vertex('j'),
    new Vertex('k')
  ]);

  g.dfs();
  assert.deepEqual(g.visitQueue, ['a', 'b', 'e', 'i', 'j', 'k', 'f', 'c', 'd', 'g']);
});

test('Normal graph BFS', assert => {
  var g = new Graph([
    new Vertex('a', ['b', 'c', 'd']),
    new Vertex('b', ['e', 'f']),
    new Vertex('c', []),
    new Vertex('d', ['g']),
    new Vertex('e', ['i', 'j', 'k']),
    new Vertex('f'),
    new Vertex('g'),
    new Vertex('i'),
    new Vertex('j'),
    new Vertex('k')
  ]);

  g.bfs();
  assert.deepEqual(g.blackQueue, ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'i', 'j', 'k']);
});
