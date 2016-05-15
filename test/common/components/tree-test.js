import test from 'ava';
import {BinaryTree, Node} from '../../../src/common/components/tree';

test('Normal Binary Tree', assert => {
  var t = new BinaryTree([
    new Node('a', ['b', 'c']),
    new Node('b', ['e', 'f']),
    new Node('c', []),
    new Node('d', ['g']),
    new Node('e', ['i', 'j']),
    new Node('f'),
    new Node('g'),
    new Node('i'),
    new Node('j')
  ]);

  t.preOrder();
});

test('Normal Binary Tree height', assert => {
  var t = new BinaryTree([
    new Node('a', ['b', 'c']),
    new Node('b', ['e', 'f']),
    new Node('c', []),
    new Node('d', ['g']),
    new Node('e', ['i', 'j']),
    new Node('f'),
    new Node('g'),
    new Node('i'),
    new Node('j')
  ]);

  assert.is(t.getHeight(), 3);
});

test('Normal Binary Tree: balance', assert => {
  var t1 = new BinaryTree([
    new Node('a', ['b', 'c']),
    new Node('b', ['e', 'f']),
    new Node('c', [])
  ]);

  assert.is(t1.isBalanced(), true);


  var t2 = new BinaryTree([
    new Node('a', ['b', 'c']),
    new Node('b', ['e', 'f']),
    new Node('c', ['d', 'e']),
    new Node('d', ['g']),
    new Node('e', ['i', 'j']),
    new Node('f'),
    new Node('g'),
    new Node('i'),
    new Node('j')
  ]);

  assert.is(t2.isBalanced(), true);
});
