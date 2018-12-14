class ListNode<T> {
  public next: ListNode<T>;
  public previous: ListNode<T>;
  constructor(public value: T) {
    this.next = this;
    this.previous = this;
  }
}
class LinkedList<T> {
  public head: ListNode<T>;

  constructor(...items: T[]) {
    this.head = new ListNode(items[0]);
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

  public rotate(distance: number) {
    while (distance < 0) {
      this.head = this.head.previous;
      distance++;
    }
    while (distance > 0) {
      this.head = this.head.next;
      distance--;
    }
  }

  public pop() {
    const currentNode = this.head;
    this.head = currentNode.previous;
    this.head.next = currentNode.next;
    return currentNode.value;
  }
}

function solve(players, maxMarble) {
  const board = new LinkedList(0);
  let scores: { [id: number]: number } = {};

  for (let player = 0; player < players; player++) {
    scores[player] = 0;
  }

  for (let marble = 1; marble <= maxMarble; marble++) {
    if (marble % 23 === 0) {
      scores[marble % players] += marble;
      board.rotate(-7);
      scores[marble % players] += board.pop();
      board.rotate(1);
    } else {
      board.rotate(1);
      board.push(marble);
    }

    if (marble % 70918 === 0) {
      console.log(`${(marble / (maxMarble * 1.0)) * 100}%`);
    }
  }

  const winningScore = Math.max(...Object.values(scores));

  console.log(winningScore);
}

solve(464, 70918 * 100);
