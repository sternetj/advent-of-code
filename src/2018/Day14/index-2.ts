namespace Day14Puzzle2 {
  class ListNode<T> {
    public next: ListNode<T>;
    public previous: ListNode<T>;
    private _id: number;

    constructor(public value: T, id: number) {
      this.next = this;
      this.previous = this;
      this._id = id;
    }

    public get id() {
      return this._id;
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
    private nextId = 1;

    constructor(public previousValues: string, ...items: T[]) {
      this.previousValues = this.previousValues.slice(1) + items[0];
      this.head = new ListNode(items[0], this.nextId++);
      this.start = this.head;
      items.slice(1).forEach(item => this.push(item));
    }

    public push(v: T) {
      let n = new ListNode(v, this.nextId++);
      n.previous = this.head;
      n.next = this.head.next;
      n.previous.next = n;
      n.next.previous = n;
      this.head = n;
      this.previousValues = this.previousValues.slice(1) + v;
    }
  }

  (function() {
    const specialRecipeSeq = "894501";
    let scores = new LinkedList(specialRecipeSeq.replace(/./g, "-"), 3, 7);
    let elves = [scores.head.previous, scores.head];

    while (true) {
      let totalPrevious = (elves[0].value + elves[1].value).toString();
      totalPrevious
        .split("")
        .map(Number)
        .forEach(v => {
          scores.push(v);

          if (scores.previousValues === specialRecipeSeq) {
            console.log(scores.head.id - specialRecipeSeq.length);
            process.exit(0);
          }
        });

      elves.forEach((elf, index) => {
        elves[index] = elf.getNeighbor(elf.value + 1);
      });
    }
  })();
}
