export type CellState = 'empty' | 'start' | 'end' | 'wall' | 'visited' | 'path';

export interface Cell {
  row: number;
  col: number;
  state: CellState;
}

export type AlgorithmType = 'bfs' | 'dfs' | 'dijkstra';

export interface AlgorithmInfo {
  name: string;
  description: string;
  timeComplexity: string;
  spaceComplexity: string;
  weighted: boolean;
  guaranteed: boolean;
}

export const ALGORITHMS: Record<AlgorithmType, AlgorithmInfo> = {
  bfs: {
    name: 'Breadth-First Search',
    description: 'Explores all neighbors at the current depth before moving deeper. Guarantees the shortest path in unweighted graphs.',
    timeComplexity: 'O(V + E)',
    spaceComplexity: 'O(V)',
    weighted: false,
    guaranteed: true,
  },
  dfs: {
    name: 'Depth-First Search',
    description: 'Explores as far as possible along each branch before backtracking. Does not guarantee the shortest path.',
    timeComplexity: 'O(V + E)',
    spaceComplexity: 'O(V)',
    weighted: false,
    guaranteed: false,
  },
  dijkstra: {
    name: "Dijkstra's Algorithm",
    description: 'Finds the shortest path in weighted graphs by greedily selecting the closest unvisited node. All edges have weight 1 here.',
    timeComplexity: 'O((V + E) log V)',
    spaceComplexity: 'O(V)',
    weighted: true,
    guaranteed: true,
  },
};

export const GRID_ROWS = 20;
export const GRID_COLS = 20;
export const DEFAULT_START = { row: 10, col: 3 };
export const DEFAULT_END = { row: 10, col: 16 };
