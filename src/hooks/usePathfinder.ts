import { useState, useCallback, useRef } from 'react';
import { Cell, CellState, AlgorithmType, GRID_ROWS, GRID_COLS, DEFAULT_START, DEFAULT_END } from '@/lib/pathfinding';
import { bfs, dfs, dijkstra } from '@/lib/algorithms';

const createEmptyGrid = (): Cell[][] =>
  Array.from({ length: GRID_ROWS }, (_, row) =>
    Array.from({ length: GRID_COLS }, (_, col) => {
      let state: CellState = 'empty';
      if (row === DEFAULT_START.row && col === DEFAULT_START.col) state = 'start';
      if (row === DEFAULT_END.row && col === DEFAULT_END.col) state = 'end';
      return { row, col, state };
    })
  );

export function usePathfinder() {
  const [grid, setGrid] = useState<Cell[][]>(createEmptyGrid);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<AlgorithmType>('bfs');
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(30);
  const [stats, setStats] = useState({ nodesVisited: 0, pathLength: 0, timeMs: 0 });
  const timeoutsRef = useRef<number[]>([]);

  const reset = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
    setGrid(createEmptyGrid());
    setIsRunning(false);
    setStats({ nodesVisited: 0, pathLength: 0, timeMs: 0 });
  }, []);

  const clearVisualization = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
    setGrid(prev =>
      prev.map(row =>
        row.map(cell => ({
          ...cell,
          state: cell.state === 'visited' || cell.state === 'path' ? 'empty' : cell.state,
        }))
      )
    );
    setIsRunning(false);
    setStats({ nodesVisited: 0, pathLength: 0, timeMs: 0 });
  }, []);

  const toggleWall = useCallback((row: number, col: number) => {
    if (isRunning) return;
    setGrid(prev => {
      const cell = prev[row][col];
      if (cell.state === 'start' || cell.state === 'end') return prev;
      const newGrid = prev.map(r => r.map(c => ({ ...c })));
      newGrid[row][col].state = cell.state === 'wall' ? 'empty' : 'wall';
      return newGrid;
    });
  }, [isRunning]);

  const runAlgorithm = useCallback(() => {
    if (isRunning) return;
    clearVisualization();

    // Use a timeout to let clearVisualization apply first
    setTimeout(() => {
      setIsRunning(true);
      const startTime = performance.now();

      // Get current grid state (walls only)
      setGrid(prev => {
        const cleanGrid = prev.map(r => r.map(c => ({
          ...c,
          state: (c.state === 'visited' || c.state === 'path' ? 'empty' : c.state) as CellState,
        })));

        const algo = selectedAlgorithm === 'bfs' ? bfs : selectedAlgorithm === 'dfs' ? dfs : dijkstra;
        const { visitedOrder, path } = algo(cleanGrid, DEFAULT_START, DEFAULT_END);
        const elapsed = performance.now() - startTime;

        const delay = Math.max(5, 100 - speed);

        visitedOrder.forEach((pos, i) => {
          const t = window.setTimeout(() => {
            setGrid(g => {
              const ng = g.map(r => r.map(c => ({ ...c })));
              if (ng[pos.row][pos.col].state === 'empty') {
                ng[pos.row][pos.col].state = 'visited';
              }
              return ng;
            });
          }, i * delay);
          timeoutsRef.current.push(t);
        });

        // Draw path after visited
        const pathStart = visitedOrder.length * delay;
        path.forEach((pos, i) => {
          if (pos.row === DEFAULT_END.row && pos.col === DEFAULT_END.col) return;
          const t = window.setTimeout(() => {
            setGrid(g => {
              const ng = g.map(r => r.map(c => ({ ...c })));
              ng[pos.row][pos.col].state = 'path';
              return ng;
            });
          }, pathStart + i * (delay * 2));
          timeoutsRef.current.push(t);
        });

        // Set final state
        const finishT = window.setTimeout(() => {
          setIsRunning(false);
        }, pathStart + path.length * (delay * 2) + 100);
        timeoutsRef.current.push(finishT);

        setStats({
          nodesVisited: visitedOrder.length,
          pathLength: path.length,
          timeMs: Math.round(elapsed * 100) / 100,
        });

        return cleanGrid;
      });
    }, 50);
  }, [isRunning, selectedAlgorithm, speed, clearVisualization]);

  return {
    grid, selectedAlgorithm, setSelectedAlgorithm,
    isRunning, speed, setSpeed, stats,
    toggleWall, runAlgorithm, reset,
  };
}
