import { Cell, GRID_ROWS, GRID_COLS } from './pathfinding';

type Position = { row: number; col: number };

const getNeighbors = (row: number, col: number, grid: Cell[][]): Position[] => {
  const dirs = [[-1,0],[1,0],[0,-1],[0,1]];
  return dirs
    .map(([dr, dc]) => ({ row: row + dr, col: col + dc }))
    .filter(p => p.row >= 0 && p.row < GRID_ROWS && p.col >= 0 && p.col < GRID_COLS && grid[p.row][p.col].state !== 'wall');
};

export function bfs(grid: Cell[][], start: Position, end: Position): { visitedOrder: Position[]; path: Position[] } {
  const visited = new Set<string>();
  const parent = new Map<string, Position | null>();
  const queue: Position[] = [start];
  const visitedOrder: Position[] = [];
  const key = (p: Position) => `${p.row},${p.col}`;

  visited.add(key(start));
  parent.set(key(start), null);

  while (queue.length > 0) {
    const current = queue.shift()!;
    if (current.row !== start.row || current.col !== start.col) {
      visitedOrder.push(current);
    }
    if (current.row === end.row && current.col === end.col) break;

    for (const neighbor of getNeighbors(current.row, current.col, grid)) {
      const k = key(neighbor);
      if (!visited.has(k)) {
        visited.add(k);
        parent.set(k, current);
        queue.push(neighbor);
      }
    }
  }

  const path: Position[] = [];
  let cur: Position | null | undefined = end;
  while (cur && parent.has(key(cur))) {
    if (cur.row !== start.row || cur.col !== start.col) path.unshift(cur);
    cur = parent.get(key(cur)) ?? null;
  }

  return { visitedOrder, path: parent.has(key(end)) ? path : [] };
}

export function dfs(grid: Cell[][], start: Position, end: Position): { visitedOrder: Position[]; path: Position[] } {
  const visited = new Set<string>();
  const parent = new Map<string, Position | null>();
  const stack: Position[] = [start];
  const visitedOrder: Position[] = [];
  const key = (p: Position) => `${p.row},${p.col}`;

  visited.add(key(start));
  parent.set(key(start), null);

  while (stack.length > 0) {
    const current = stack.pop()!;
    if (current.row !== start.row || current.col !== start.col) {
      visitedOrder.push(current);
    }
    if (current.row === end.row && current.col === end.col) break;

    for (const neighbor of getNeighbors(current.row, current.col, grid)) {
      const k = key(neighbor);
      if (!visited.has(k)) {
        visited.add(k);
        parent.set(k, current);
        stack.push(neighbor);
      }
    }
  }

  const path: Position[] = [];
  let cur: Position | null | undefined = end;
  while (cur && parent.has(key(cur))) {
    if (cur.row !== start.row || cur.col !== start.col) path.unshift(cur);
    cur = parent.get(key(cur)) ?? null;
  }

  return { visitedOrder, path: parent.has(key(end)) ? path : [] };
}

export function dijkstra(grid: Cell[][], start: Position, end: Position): { visitedOrder: Position[]; path: Position[] } {
  // With uniform weights, behaves like BFS but uses distance tracking
  const dist = new Map<string, number>();
  const parent = new Map<string, Position | null>();
  const visited = new Set<string>();
  const visitedOrder: Position[] = [];
  const key = (p: Position) => `${p.row},${p.col}`;

  // Simple priority queue using array
  const pq: { pos: Position; dist: number }[] = [{ pos: start, dist: 0 }];
  dist.set(key(start), 0);
  parent.set(key(start), null);

  while (pq.length > 0) {
    pq.sort((a, b) => a.dist - b.dist);
    const { pos: current } = pq.shift()!;
    const k = key(current);

    if (visited.has(k)) continue;
    visited.add(k);

    if (current.row !== start.row || current.col !== start.col) {
      visitedOrder.push(current);
    }
    if (current.row === end.row && current.col === end.col) break;

    for (const neighbor of getNeighbors(current.row, current.col, grid)) {
      const nk = key(neighbor);
      const newDist = (dist.get(k) ?? Infinity) + 1;
      if (newDist < (dist.get(nk) ?? Infinity)) {
        dist.set(nk, newDist);
        parent.set(nk, current);
        pq.push({ pos: neighbor, dist: newDist });
      }
    }
  }

  const path: Position[] = [];
  let cur: Position | null | undefined = end;
  while (cur && parent.has(key(cur))) {
    if (cur.row !== start.row || cur.col !== start.col) path.unshift(cur);
    cur = parent.get(key(cur)) ?? null;
  }

  return { visitedOrder, path: parent.has(key(end)) ? path : [] };
}
