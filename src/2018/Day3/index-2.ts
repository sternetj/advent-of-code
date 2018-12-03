import { parseInput } from "../../util/parse-input";

class Claim {
  constructor(
    public id: string,
    public x: number,
    public y: number,
    public width: number,
    public height: number
  ) {}

  public overlaps(claim: Claim) {
    if (this.x > claim.x + claim.width || claim.x > this.x + this.width)
      return false;

    if (this.y > claim.y + claim.height || claim.y > this.y + this.height)
      return false;

    return true;
  }
}

const claims = parseInput(
  v => {
    const parts = v.split(/[(\s@\s)|:\s|x|,#]/g);
    return new Claim(parts[1], +parts[4], +parts[5], +parts[7], +parts[8]);
  },
  __dirname,
  "input-1.txt"
);

let perfectClaimIndex = 0;
let perfectClaim: Claim;

while (perfectClaimIndex < claims.length) {
  perfectClaim = claims[perfectClaimIndex++];
  if (
    claims.every(
      claim => claim.id === perfectClaim.id || !claim.overlaps(perfectClaim)
    )
  ) {
    break;
  }
}

console.log(perfectClaim.id);
