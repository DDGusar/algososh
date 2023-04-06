export class Node<T> {
  value: T;
  next: Node<T> | null;
  constructor(value: T, next?: Node<T> | null) {
    this.value = value;
    this.next = next === undefined ? null : next;
  }
}

export interface ILinkedList<T> {
  append: (element: T) => void;
  prepend: (element: T) => void;
  deleteHead: () => Node<T> | null;
  deleteTail: () => Node<T> | null;
  addByIndex: (element: T, position: number) => void;
  deleteByIndex: (position: number) => void;
  getSize: () => number;
  print: () => void;
}

export class LinkedList<T> implements ILinkedList<T> {
  private head: Node<T> | null;
  private tail: Node<T> | null;
  private size: number;
  constructor(defaultArr: T[]) {
    this.head = null;
    this.tail = null;
    this.size = 0;
    this.fromArray(defaultArr);
  }
  fromArray(defaultArr: T[]) {
    defaultArr.forEach((item) => this.append(item));
    return this;
  }
  append(element: T) {
    const newNode = new Node(element);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    }
    if (this.tail) {
      this.tail.next = newNode;
      this.tail = newNode;
    }
    this.size++;
  }
  prepend(element: T) {
    let newNode = new Node(element, this.head);
    this.head = newNode;
    if (!this.tail) this.tail = newNode;
    this.size++;
  }
  deleteHead() {
    if (!this.head) return null;
    const deletedHead = this.head;

    if (this.head.next) {
      this.head = this.head.next;
    } else {
      this.head = null;
      this.tail = null;
    }
    this.size--;
    return deletedHead;
  }
  deleteTail() {
    const deletedTail = this.tail;
    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;
      this.size--;
      return deletedTail;
    }
    let current = this.head;
    if (current !== null) {
      while (current.next) {
        if (!current.next.next) {
          current.next = null;
        } else {
          current = current.next;
        }
      }
    }

    this.tail = current;
    this.size--;
    return deletedTail;
  }
  addByIndex(element: T, index: number) {
    if (index < 0 || index > this.size) {
      return;
    } else {
      const node = new Node(element);
      if (index === 0) {
        node.next = this.head;
        this.head = node;
      } else {
        let curr = this.head;
        let currIndex = 0;
        while (currIndex + 1 < index && curr !== null) {
          curr = curr.next;
          currIndex++;
        }
        if (curr !== null && curr.next !== null) {
          node.next = curr.next;
          curr.next = node;
        }
      }

      this.size++;
    }
  }
  deleteByIndex(index: number) {
    if (index < 0 || index > this.size) {
      return;
    } else {
      if (index === 0) {
        this.deleteHead();
        return;
      } else if (index === -1 || index === this.size - 1) {
        this.deleteTail();
        return;
      }
      let current = this.head;
      let nextNode = null;
      let prevNode = null;
      let currentIndex = 0;
      while (
        currentIndex + 1 < index &&
        current !== null &&
        current.next !== null
      ) {
        prevNode = current;
        current = current.next;
        nextNode = current.next;
        currentIndex++;
      }
      if (prevNode !== null && prevNode.next !== null) {
        prevNode.next = nextNode;
      }

      this.size--;
    }
  }
  getSize() {
    return this.size;
  }
  print() {
    let curr = this.head;
    let res = "";
    while (curr) {
      res += `${curr.value} `;
      curr = curr.next;
    }
  }
}
