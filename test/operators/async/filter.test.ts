import {asyncSequenceOf} from "../../../src/sequency";

describe("filter", () => {
    it("should filter elements", async () => {
        const array = await asyncSequenceOf(1, 2, 3)
            .filter(it => Promise.resolve(it > 1))
            .toArray();

        expect(array).toEqual([2, 3]);
    });
});