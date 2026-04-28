import DeploymentStep from "../components/DeploymentStep.js";
import MetricCard from "../components/MetricCard.js";
import {
  deploymentSteps,
  featureCards,
  runtimeChecks,
  teachingMetrics
} from "../lib/teachingData.js";

export default function Home() {
  const dockerImage = process.env.NEXT_PUBLIC_DOCKER_IMAGE || "nextjs-docker-app:kelas";
  const message =
    process.env.NEXT_PUBLIC_APP_MESSAGE ||
    "Aplikasi ini punya UI, API route, env var, dan health check untuk didockerisasi.";

  return (
    <main>
      <section className="hero">
        <p className="eyebrow">Cloud Native + DevOps Practicum</p>
        <div className="heroGrid">
          <div>
            <h1>Next.js yang benar-benar siap masuk container</h1>
            <p className="lead">
              {message} Mahasiswa bisa melihat bahwa Docker bukan hanya membungkus folder,
              tetapi menjalankan aplikasi web production dengan konfigurasi runtime.
            </p>
            <div className="heroActions">
              <a href="/api/health">Cek API Health</a>
              <a href="/api/deployments" className="secondary">
                Lihat Data Deploy
              </a>
            </div>
          </div>
          <aside className="terminalCard" aria-label="Contoh command Docker">
            <span className="dot red" />
            <span className="dot yellow" />
            <span className="dot green" />
            <pre>{`docker build -t ${dockerImage} .
docker run --rm -p 3000:3000 \\
  -e APP_ENV=docker \\
  ${dockerImage}`}</pre>
          </aside>
        </div>
      </section>

      <section className="metrics" aria-label="Ringkasan materi">
        {teachingMetrics.map((metric) => (
          <MetricCard key={metric.label} {...metric} />
        ))}
      </section>

      <section className="contentGrid">
        <div className="panel">
          <p className="eyebrow">Implementasi yang masuk container</p>
          <h2>Apa isi aplikasinya?</h2>
          <div className="features">
            {featureCards.map((feature) => (
              <article key={feature.title}>
                <span>{feature.icon}</span>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="panel accent">
          <p className="eyebrow">Runtime checks</p>
          <h2>Yang bisa dibuktikan saat demo</h2>
          <ul className="checkList">
            {runtimeChecks.map((check) => (
              <li key={check}>{check}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="panel">
        <p className="eyebrow">Alur praktikum</p>
        <h2>Dari kode sampai container berjalan</h2>
        <div className="steps">
          {deploymentSteps.map((step) => (
            <DeploymentStep key={step.title} step={step} />
          ))}
        </div>
      </section>
    </main>
  );
}
