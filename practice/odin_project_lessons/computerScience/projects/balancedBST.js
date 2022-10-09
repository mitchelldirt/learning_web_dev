// Function to print out the tree in a nice way provided by the odin project.
const prettyPrint = (node, prefix = '', isLeft = true) => {
    if (node.rightChild !== null) {
        prettyPrint(node.rightChild, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.leftChild !== null) {
        prettyPrint(node.leftChild, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
}

function cleanArray(array) {
    array.sort((a, b) => {
        return a - b
    })
    // remove duplicates
    return array.filter((item,
        index) => array.indexOf(item) === index);
}

function minValue(root) {
    let minv = root.data;
    while (root.leftChild != null) {
        minv = root.leftChild.data;
        root = root.leftChild;
    }
    return minv;
}

class Node {
    data = null
    leftChild = null
    rightChild = null

    constructor(data) {
        this.data = data;
    }
}

class Tree {
    root = null

    constructor(array) {
        this.array = cleanArray(array);
    }

    buildTree(array, start, end) {
        if (start > end) {
            return null;
        }

        const midPoint = (Math.floor((start + end) / 2));

        let node = new Node(array[midPoint]);

        node.leftChild = this.buildTree(array, start, midPoint - 1);
        node.rightChild = this.buildTree(array, midPoint + 1, end)

        if (node.data != undefined) {
            this.root = node
            return node
        }


    }

    insert(root, value) {
        // if the root is empty create node using the value and return it as the root

        if (root && value === root.data) return 'No duplicate values please'
        if (!root) {
            root = new Node(value);
            return root;
        }

        // if node is less than root left side = call insert on the left side
        if (value < root.data) {
            root.leftChild = this.insert(root.leftChild, value);
        }
        // else if node is greater than root right side = call insert on the right side
        else {
            root.rightChild = this.insert(root.rightChild, value);
        }

        // return the node - test if you need to do this
        return root;
    }

    removeNode(value) {
        root = this.deleteNode(root, value)
    }

    deleteNode(root, value) {
        // if the value is a leaf then just remove it
        if (root === null) {
            return root;
        }

        if (value < root.data) {
            root.leftChild = this.deleteNode(root.leftChild, value)
        } else if (value > root.data) {
            root.rightChild = this.deleteNode(root.rightChild, value)
        }

        else {

            if (root.leftChild == null) {
                return root.rightChild;
            } else if (root.rightChild == null) {
                return root.leftChild;
            }

            root.data = minValue(root.rightChild)

            root.rightChild = this.deleteNode(root.rightChild, root.data)
        }

        return root
    }

    find(root, value) {
        let currentRoot = root;
        while (currentRoot.data) {
            if (value === currentRoot.data) {
                return currentRoot;
            } else if (value < currentRoot.data) {
                currentRoot = currentRoot.leftChild;
            } else if (value > currentRoot.data) {
                currentRoot = currentRoot.rightChild;
            }
        }
    }

    levelOrder(root, queue = [root], levelOrderResult = []) {
        // For an iterative approach use while loop
        // while root.leftChild && root.rightChild

        if (!root) return levelOrderResult;
        // queue nodes children
        if (root.leftChild) queue.push(root.leftChild);
        if (root.rightChild) queue.push(root.rightChild);

        // dequeue parent node
        let result = queue.shift();
        levelOrderResult.push(result.data)

        return this.levelOrder(queue[0], queue, levelOrderResult);

    }

    preOrder(root, nodeArray = [], result = []) {
        if (!root) return;
        nodeArray.push(root)
        result.push(root.data);
        if (root.leftChild) {
            return this.preOrder(root.leftChild, nodeArray, result);
        }

        while (nodeArray.length > 0) {
            let currentNode = nodeArray.pop();
            if (currentNode.rightChild) {
                return this.preOrder(currentNode.rightChild, nodeArray, result);
            }
        }

        return result;
    }

    inOrder(root, nodeArray = [], result = []) {
        // If no data return
        if (!root) return;

        nodeArray.push(root);
        if (root.leftChild) {
            return this.inOrder(root.leftChild, nodeArray, result)
        } else {
            while (nodeArray.length > 0) {
                let currentNode = nodeArray.pop();
                result.push(currentNode.data)
                if (currentNode.rightChild) {
                    return this.inOrder(currentNode.rightChild, nodeArray, result);
                }
            }
        }


        return result
    }

    postOrder(root, nodeArray = [], result = []) {
        if (!root) return;
        nodeArray.push(root)

        if (root.leftChild) {
            return this.postOrder(root.leftChild, nodeArray, result);
        }

        while (nodeArray.length > 0) {
            let currentNode = nodeArray.pop();
            if (currentNode.rightChild) {
                let branch = this.postOrder(currentNode.rightChild);
                result = result.concat(branch)
                result.push(currentNode.data)
            } else {
                result.push(currentNode.data)
            }
            
        }

        return result;
    }

    height() {

    }

    depth() {

    }

    isBalanced() {

    }

    rebalance() {

    }
}

const pine = new Tree([1, 3, 5, 7, 9, 11, 2, 4, 6, 8, 10, 0, 12, 13, 14]);

let root = pine.buildTree(pine.array, 0, pine.array.length - 1);
// console.log(pine.insert(pine.root, 4));
// console.log(pine.insert(pine.root, 2));

// pine.removeNode(2)
prettyPrint(pine.root)
//console.log(pine.find(pine.root, 3))
// console.log(pine.levelOrder(pine.root))
console.log(pine.postOrder(pine.root))