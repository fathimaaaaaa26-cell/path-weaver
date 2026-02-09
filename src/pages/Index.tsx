import { Grid } from '@/components/Grid';
import { ControlPanel } from '@/components/ControlPanel';
import { SidePanel } from '@/components/SidePanel';
import { usePathfinder } from '@/hooks/usePathfinder';
import { Route, Zap } from 'lucide-react';

const Index = () => {
  const {
    grid, selectedAlgorithm, setSelectedAlgorithm,
    isRunning, speed, setSpeed, stats,
    toggleWall, runAlgorithm, reset,
  } = usePathfinder();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Navbar */}
      <header className="border-b border-border glass-panel">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
              <Route size={20} className="text-primary" />
            </div>
            <div>
              <h1 className="text-lg font-semibold tracking-tight flex items-center gap-2">
                Pathfinding Visualizer
                <Zap size={14} className="text-primary animate-pulse-glow" />
              </h1>
              <p className="text-xs text-muted-foreground font-mono">
                Visualize BFS, DFS, and Dijkstra in real time
              </p>
            </div>
          </div>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-mono text-muted-foreground hover:text-foreground transition-colors"
          >
            v1.0.0
          </a>
        </div>
      </header>

      {/* Controls */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 py-4">
        <ControlPanel
          selectedAlgorithm={selectedAlgorithm}
          onSelectAlgorithm={setSelectedAlgorithm}
          onRun={runAlgorithm}
          onReset={reset}
          isRunning={isRunning}
          speed={speed}
          onSpeedChange={setSpeed}
        />
      </div>

      {/* Main content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
          <Grid grid={grid} onToggleWall={toggleWall} isRunning={isRunning} />
          <SidePanel selectedAlgorithm={selectedAlgorithm} stats={stats} />
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-4">
        <p className="text-center text-xs text-muted-foreground font-mono">
          Built with React + TypeScript · Click cells to create walls · Select algorithm and visualize
        </p>
      </footer>
    </div>
  );
};

export default Index;
