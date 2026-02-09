import { AlgorithmType } from '@/lib/pathfinding';
import { Play, RotateCcw } from 'lucide-react';

interface ControlPanelProps {
  selectedAlgorithm: AlgorithmType;
  onSelectAlgorithm: (algo: AlgorithmType) => void;
  onRun: () => void;
  onReset: () => void;
  isRunning: boolean;
  speed: number;
  onSpeedChange: (speed: number) => void;
}

const algorithms: { id: AlgorithmType; label: string }[] = [
  { id: 'bfs', label: 'BFS' },
  { id: 'dfs', label: 'DFS' },
  { id: 'dijkstra', label: 'Dijkstra' },
];

export function ControlPanel({
  selectedAlgorithm, onSelectAlgorithm,
  onRun, onReset, isRunning,
  speed, onSpeedChange,
}: ControlPanelProps) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {algorithms.map(algo => (
        <button
          key={algo.id}
          onClick={() => onSelectAlgorithm(algo.id)}
          disabled={isRunning}
          className={`control-btn font-mono text-xs tracking-wide ${selectedAlgorithm === algo.id ? 'active' : ''}`}
        >
          {algo.label}
        </button>
      ))}

      <button
        onClick={onRun}
        disabled={isRunning}
        className="control-btn active flex items-center gap-2 disabled:opacity-50"
      >
        <Play size={14} />
        <span className="font-mono text-xs tracking-wide">
          {isRunning ? 'Running...' : 'Visualize'}
        </span>
      </button>

      <button
        onClick={onReset}
        className="control-btn flex items-center gap-2"
      >
        <RotateCcw size={14} />
        <span className="font-mono text-xs tracking-wide">Reset</span>
      </button>

      <div className="flex items-center gap-3 ml-auto">
        <label className="text-xs font-mono text-muted-foreground">Speed</label>
        <input
          type="range"
          min={5}
          max={95}
          value={speed}
          onChange={e => onSpeedChange(Number(e.target.value))}
          className="w-24 accent-primary"
        />
      </div>
    </div>
  );
}
