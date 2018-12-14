namespace Day14Puzzle1 {
  class ListNode<T> {
    public next: ListNode<T>;
    public previous: ListNode<T>;
    constructor(public value: T) {
      this.next = this;
      this.previous = this;
    }

    getNeighbor(distance: number) {
      let neighbor: ListNode<T> = this;
      while (distance < 0) {
        neighbor = neighbor.previous;
        distance++;
      }
      while (distance > 0) {
        neighbor = neighbor.next;
        distance--;
      }

      return neighbor;
    }
  }

  class LinkedList<T> {
    public head: ListNode<T>;
    public start: ListNode<T>;

    constructor(...items: T[]) {
      this.head = new ListNode(items[0]);
      this.start = this.head;
      items.slice(1).forEach(item => this.push(item));
    }

    public push(v: T) {
      let n = new ListNode(v);
      n.previous = this.head;
      n.next = this.head.next;
      n.previous.next = n;
      n.next.previous = n;
      this.head = n;
    }

    public at(index) {
      let node = this.start;
      while (index < 0) {
        node = node.previous;
        index++;
      }
      while (index > 0) {
        node = node.next;
        index--;
      }

      return node;
    }
  }

  (function() {
    let scores = new LinkedList(3, 7);
    let elves = [scores.head.previous, scores.head];
    const recipesToCreate = 894501;
    let remainingRecipes = recipesToCreate + 6;

    while (remainingRecipes-- >= 0) {
      let totalPrevious = elves[0].value + elves[1].value;
      totalPrevious
        .toString()
        .split("")
        .map(Number)
        .forEach(v => scores.push(v));

      elves.forEach((elf, index) => {
        elves[index] = elf.getNeighbor(elf.value + 1);
      });
    }

    let start = scores.at(recipesToCreate);
    let answer = "";
    for (let i = 0; i < 10; i++) {
      answer += start.value;
      start = start.next;
    }

    console.log(answer);
  })();
}
