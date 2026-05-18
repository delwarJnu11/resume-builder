const stats = [
  { value: '50,000+', label: 'Resumes Created', description: 'Professionals trust us' },
  { value: '98%', label: 'ATS Pass Rate', description: 'Beat applicant tracking systems' },
  { value: '2 min', label: 'Average Build Time', description: 'From blank to complete' },
  { value: '4.9 / 5', label: 'User Rating', description: 'Based on 2,400+ reviews' },
];

export default function Stats() {
  return (
    <section className="py-16 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <div key={i} className="text-center group">
              <div className="text-3xl lg:text-4xl font-extrabold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">
                {stat.value}
              </div>
              <div className="text-sm font-semibold text-slate-700 mb-0.5">{stat.label}</div>
              <div className="text-xs text-slate-400">{stat.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
