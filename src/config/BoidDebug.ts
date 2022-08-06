export enum BoidDebugOption {
    Distance,
    Target
}

export interface BoidDebugConfigType {
    Draw : BoidDebugOption[];
    MaxDistance: number | null;
}

const BoidDebugConfig : BoidDebugConfigType = {
    Draw: [
        BoidDebugOption.Distance,
        BoidDebugOption.Target,
    ],
    MaxDistance: null
}

export default BoidDebugConfig;