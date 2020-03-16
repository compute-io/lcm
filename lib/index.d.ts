declare module 'compute-lcm' {
    declare export type ElPickCallback = (el: any, index: number) => number;
    declare export default function lcm(a: number, b: number, ...nums: number[]): number;
    declare export default function lcm(arr: number[], callback: ElPickCallback):  number | null;
}
