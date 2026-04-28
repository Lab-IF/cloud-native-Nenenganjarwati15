export default function DeploymentStep({ step }) {
  return (
    <article className="stepCard">
      <span className="stepNumber">{step.number}</span>
      <div>
        <h3>{step.title}</h3>
        <p>{step.description}</p>
      </div>
      <code className="command">{step.command}</code>
    </article>
  );
}
