export default function ToDoSummary(props) {
  const summary = props.summary;
  return (
    <div>
      {Object.entries(summary).map(function(entry) {
        const [category, details] = entry;
        return (
          <div key={category}>
            <span>{category}: </span>
            {!details.exists && <span>No To-Dos</span>}
            {details.exists && details.allComplete && <span>✓</span>}
            {details.exists && !details.allComplete && <span>X</span>}
          </div>
        );
      })}
    </div>
  );
}