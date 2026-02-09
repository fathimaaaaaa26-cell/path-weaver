import { Cell } from '@/lib/pathfinding';
import { useRef } from 'react';

interface GridProps {
  grid: Cell[][];
  onToggleWall: (row: number, col: number) => void;
  isRunning: boolean;
}

export function Grid({ grid, onToggleWall, isRunning }: GridProps) {
  const isDrawing = useRef(false);

  const handleMouseDown = (row: number, col: number) => {
    if (isRunning) return;
    isDrawing.current = true;
    onToggleWall(row, col);
  };

  const handleMouseEnter = (row: number, col: number) => {
    if (!isDrawing.current || isRunning) return;
    const cell = grid[row][col];
    if (cell.state === 'empty') onToggleWall(row, col);
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
  };

  return (
    <div
      className="glass-panel rounded-xl p-4 md:p-6"
      onMouseLeave={handleMouseUp}
      onMouseUp={handleMouseUp}
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-mono font-medium text-muted-foreground uppercase tracking-widest">
          Grid · 20×20
        </h2>
        <span className="text-xs font-mono text-muted-foreground">
          Click or drag to place walls
        </span>
      </div>
      <div
        className="grid gap-[2px] mx-auto"
        style={{
          gridTemplateColumns: `repeat(20, 1fr)`,
          maxWidth: '520px',
          aspectRatio: '1',
        }}
      >
        {grid.flat().map(cell => (
          <div
            key={`${cell.row}-${cell.col}`}
            className={`grid-cell ${cell.state}`}
            onMouseDown={() => handleMouseDown(cell.row, cell.col)}
            onMouseEnter={() => handleMouseEnter(cell.row, cell.col)}
            style={{ aspectRatio: '1' }}
          />
        ))}
      </div>
    </div>
  );
}
