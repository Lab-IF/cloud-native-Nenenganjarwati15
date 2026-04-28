export default function MetricCard({ value, label }) {
  return (
    <article className="metricCard">
      <span className="metricValue">{value}</span>
      <span className="metricLabel">{label}</span>
    </article>
  );
}
