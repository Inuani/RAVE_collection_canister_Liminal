import Buffer "mo:base/Buffer";
import Order "mo:base/Order";
import Debug "mo:base/Debug";
import Iter "mo:base/Iter";
import Result "mo:base/Result";
import Nat "mo:base/Nat";
import Nat16 "mo:base/Nat16";

import { nat8_to_16 } "../utils";

module {
    type Result<A, B> = Result.Result<A, B>;

    public let MAX_BITWIDTH : Nat = 15;

    public type Code = {
        bitwidth : Nat;
        bits : Nat16;
    };

    public func reverseCodeBits(code : Code) : Code {
        var prev = code.bits;
        var curr = 0 : Nat16;

        for (_ in Iter.range(1, code.bitwidth)) {
            curr <<= 1;
            curr |= prev & 1;
            prev >>= 1;
        };

        {
            bitwidth = code.bitwidth;
            bits = curr : Nat16;
        };
    };

    public type BuilderInterface<A> = {
        setMapping : (Nat, Code) -> Result<(), Text>;
        build : () -> A;
    };

    public func restore_huffman_codes<A>(builder : BuilderInterface<A>, bitwidth_arr : [Nat]) : Result<A, Text> {
        if (bitwidth_arr.size() == 0) return #err("Cannot generate huffman codes from empty bitwidth array");

        let bitwidth_buffer = Buffer.Buffer<(Nat, Nat)>(8);

        var i = 0;
        for (bitwidth in bitwidth_arr.vals()) {
            if (bitwidth > 0) {
                bitwidth_buffer.add((i, bitwidth));
            };
            i += 1;
        };

        bitwidth_buffer.sort(
            func(a : (Nat, Nat), b : (Nat, Nat)) : Order.Order {
                Nat.compare(a.1, b.1);
            }
        );

        var bits = 0 : Nat;
        var prev_width = 0 : Nat;

        for ((symbol, bitwidth) in bitwidth_buffer.vals()) {
            bits := bits * (2 ** (bitwidth - prev_width));

            let code : Code = { bitwidth; bits = Nat16.fromNat(bits) };

            switch (builder.setMapping(symbol, code)) {
                case (#ok()) {};
                case (#err(msg)) return #err(if (msg.size() > 0) msg else "Failed to set mapping");
            };

            bits += 1;
            prev_width := bitwidth;
        };

        #ok(builder.build());
    };
};
