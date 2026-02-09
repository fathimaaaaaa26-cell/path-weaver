import { AlgorithmType, ALGORITHMS } from '@/lib/pathfinding';
import { Info, Layers, BarChart3 } from 'lucide-react';

interface SidePanelProps {
  selectedAlgorithm: AlgorithmType;
  stats: { nodesVisited: number; pathLength: number; timeMs: number };
}

const legendItems = [
  { label: 'Start Node', cssVar: '--cell-start' },
  { label: 'End Node', cssVar: '--cell-end' },
  { label: 'Wall', cssVar: '--cell-wall' },
  { label: 'Visited', cssVar: '--cell-visited' },
  { label: 'Shortest Path', cssVar: '--cell-path' },
  { label: 'Unvisited', cssVar: '--cell-empty' },
];

export function SidePanel({ selectedAlgorithm, stats }: SidePanelProps) {
  const algo = ALGORITHMS[selectedAlgorithm];

  return (
    <div className="flex flex-col gap-4">
      {/* Algorithm Info */}
      <div className="glass-panel rounded-xl p-5">
        <div className="flex items-center gap-2 mb-3">
          <Info size={16} className="text-primary" />
          <h3 className="font-mono text-xs font-semibold uppercase tracking-widest text-primary">
            Algorithm Info
          </h3>
        </div>
        <h4 className="text-lg font-semibold mb-2">{algo.name}</h4>
        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
          {algo.description}
        </p>
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-lg bg-secondary/50 p-3">
            <span className="text-[10px] font-mono text-muted-foreground uppercase">Time</span>
            <p className="text-sm font-mono font-semibold mt-0.5">{algo.timeComplexity}</p>
          </div>
          <div className="rounded-lg bg-secondary/50 p-3">
            <span className="text-[10px] font-mono text-muted-foreground uppercase">Space</span>
            <p className="text-sm font-mono font-semibold mt-0.5">{algo.spaceComplexity}</p>
          </div>
          <div className="rounded-lg bg-secondary/50 p-3">
            <span className="text-[10px] font-mono text-muted-foreground uppercase">Weighted</span>
            <p className="text-sm font-mono font-semibold mt-0.5">{algo.weighted ? 'Yes' : 'No'}</p>
          </div>
          <div className="rounded-lg bg-secondary/50 p-3">
            <span className="text-[10px] font-mono text-muted-foreground uppercase">Shortest Path</span>
            <p className="text-sm font-mono font-semibold mt-0.5">{algo.guaranteed ? 'Guaranteed' : 'Not guaranteed'}</p>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="glass-panel rounded-xl p-5">
        <div className="flex items-center gap-2 mb-3">
          <Layers size={16} className="text-primary" />
          <h3 className="font-mono text-xs font-semibold uppercase tracking-widest text-primary">
            Legend
          </h3>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {legendItems.map(item => (
            <div key={item.label} className="flex items-center gap-2.5">
              <div
                className="w-4 h-4 rounded-sm shrink-0"
                style={{ background: `hsl(var(${item.cssVar}))` }}
              />
              <span className="text-xs text-muted-foreground">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="glass-panel rounded-xl p-5">
        <div className="flex items-center gap-2 mb-3">
          <BarChart3 size={16} className="text-primary" />
          <h3 className="font-mono text-xs font-semibold uppercase tracking-widest text-primary">
            Statistics
          </h3>
        </div>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-xs text-muted-foreground">Nodes Visited</span>
            <span className="font-mono text-sm font-semibold text-primary">{stats.nodesVisited}</span>
          </div>
          <div className="h-px bg-border" />
          <div className="flex justify-between items-center">
            <span className="text-xs text-muted-foreground">Path Length</span>
            <span className="font-mono text-sm font-semibold text-cell-path">{stats.pathLength || '—'}</span>
          </div>
          <div className="h-px bg-border" />
          <div className="flex justify-between items-center">
            <span className="text-xs text-muted-foreground">Compute Time</span>
            <span className="font-mono text-sm font-semibold">{stats.timeMs ? `${stats.timeMs}ms` : '—'}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
