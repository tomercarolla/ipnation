import {isValidIp} from "@/utils";
import {expect} from "vitest";

describe('isValidIp', () => {
    test('returns true for valid IPv4 addresses', () => {
        expect(isValidIp("8.8.8.8")).toBe(true);
        expect(isValidIp("1.178.32.0")).toBe(true);
    });

    test('returns false for invalid IPv4 addresses', () => {
        expect(isValidIp("999.999.999.999")).toBe(false);
        expect(isValidIp("999.999.999999")).toBe(false);
    });
});