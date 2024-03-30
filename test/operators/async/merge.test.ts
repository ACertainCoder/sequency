import {asyncSequenceOf} from "../../../src/sequency";

describe("merge", () => {
    it("should merge both sequences", async () => {
        const result = await asyncSequenceOf({id: 1, val: "a"}, {id: 2, val: "b"}, {id: 3, val: "c"})
            .merge(asyncSequenceOf({id: 2, val: "bb"}), it => Promise.resolve(it.id))
            .toArray();

        expect(result).toEqual([{id: 1, val: "a"}, {id: 2, val: "bb"}, {id: 3, val: "c"}]);
    });

    it("should merge given array", async () => {
        const result = await asyncSequenceOf({id: 1, val: "a"}, {id: 2, val: "b"}, {id: 3, val: "c"})
            .merge([{id: 2, val: "bb"}], it => Promise.resolve(it.id))
            .toArray();

        expect(result).toEqual([{id: 1, val: "a"}, {id: 2, val: "bb"}, {id: 3, val: "c"}]);
    });

    it("should merge both sequences and append new values", async () => {
        const result = await asyncSequenceOf({id: 1, val: "a"}, {id: 2, val: "b"}, {id: 3, val: "c"})
            .merge(asyncSequenceOf({id: 2, val: "bb"}, {id: 4, val: "d"}), it => Promise.resolve(it.id))
            .toArray();

        expect(result).toEqual([{id: 1, val: "a"}, {id: 2, val: "bb"}, {id: 3, val: "c"}, {id: 4, val: "d"}]);
    });

    it("should merge both sequences and prepend new values", async () => {
        const result = await asyncSequenceOf({id: 1, val: "a"}, {id: 2, val: "b"}, {id: 3, val: "c"})
            .merge(asyncSequenceOf({id: 2, val: "bb"}, {id: 4, val: "d"}), it => Promise.resolve(it.id), true)
            .toArray();

        expect(result).toEqual([{id: 4, val: "d"}, {id: 1, val: "a"}, {id: 2, val: "bb"}, {id: 3, val: "c"}]);
    });
});