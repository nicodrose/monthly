export default function ToDoSummary(props) {
  const summary = props.summary;
  return (
    <div>
      {Object.entries(summary).map(function(entry) {
        const [category, details] = entry;
        return (
          <div key={category}>
            <span>{category}: </span>
            {!details.exists && <span>No to-dos</span>}
            {details.exists && details.allComplete && <span>All complete</span>}
            {details.exists && !details.allComplete && <span>Incomplete</span>}
          </div>
        );
      })}
    </div>
  );
}