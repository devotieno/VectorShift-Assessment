import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';

function App() {
  return (
    <div className="app-shell">
      <header className="app-shell__header">
        <div>
          <p className="app-shell__eyebrow">VectorShift Technical Assessment</p>
          <h1>Pipeline Studio</h1>
        </div>
        <p className="app-shell__lede">
          Drag nodes from the library, wire them together, and submit the pipeline for DAG validation.
        </p>
      </header>
      <div className="app-shell__content">
        <aside className="app-shell__sidebar">
          <PipelineToolbar />
        </aside>
        <main className="app-shell__main">
          <PipelineUI />
          <SubmitButton />
        </main>
      </div>
    </div>
  );
}

export default App;
