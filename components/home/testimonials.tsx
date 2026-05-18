import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Rakibul Islam',
    role: 'Software Engineer',
    company: 'BJIT Group',
    avatar: 'RI',
    color: 'bg-blue-500',
    rating: 5,
    text: 'I built my resume in under 5 minutes and got a callback from BJIT the very next day. The two-column template looks incredibly professional.',
  },
  {
    name: 'Nusrat Jahan',
    role: 'Marketing Executive',
    company: 'Grameenphone',
    avatar: 'NJ',
    color: 'bg-violet-500',
    rating: 5,
    text: 'The customization options are amazing. I matched the resume colors to my personal brand and the PDF export was pixel-perfect. Highly recommend!',
  },
  {
    name: 'Tanvir Ahmed',
    role: 'Fresh Graduate',
    company: 'BUET',
    avatar: 'TA',
    color: 'bg-emerald-500',
    rating: 5,
    text: 'As a fresh graduate with no design skills, this tool was a lifesaver. The ATS optimization helped me get past automated screening at 3 companies.',
  },
  {
    name: 'Fatema Khatun',
    role: 'HR Manager',
    company: 'bKash Limited',
    avatar: 'FK',
    color: 'bg-rose-500',
    rating: 5,
    text: 'I recommend this to all candidates I interview. The resumes are clean, structured, and easy to read. The declaration section is a great touch for BD context.',
  },
  {
    name: 'Mahmudul Hasan',
    role: 'Data Analyst',
    company: 'Dutch-Bangla Bank',
    avatar: 'MH',
    color: 'bg-amber-500',
    rating: 5,
    text: 'The section reordering feature is brilliant. I could prioritize my skills section over experience since I was switching careers. Got the job!',
  },
  {
    name: 'Sadia Rahman',
    role: 'UX Designer',
    company: 'Shajgoj',
    avatar: 'SR',
    color: 'bg-teal-500',
    rating: 5,
    text: 'The minimal theme is gorgeous — clean, modern, and professional. The live preview made it so easy to get everything just right before exporting.',
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block px-3 py-1 text-xs font-semibold text-rose-600 bg-rose-50 rounded-full border border-rose-100 mb-4 uppercase tracking-wider">
            Testimonials
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
            Loved by Professionals Across Bangladesh
          </h2>
          <p className="text-slate-500 text-lg leading-relaxed">
            Join thousands of job seekers who landed their dream roles with our resume builder.
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="group bg-white rounded-2xl p-6 border border-slate-100 hover:border-slate-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 relative"
            >
              {/* Quote icon */}
              <Quote className="absolute top-5 right-5 w-8 h-8 text-slate-100 group-hover:text-slate-200 transition-colors" />

              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {[...Array(t.rating)].map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>

              {/* Text */}
              <p className="text-sm text-slate-600 leading-relaxed mb-5">"{t.text}"</p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-full ${t.color} flex items-center justify-center text-white text-xs font-bold shrink-0`}
                >
                  {t.avatar}
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">{t.name}</p>
                  <p className="text-xs text-slate-400">
                    {t.role} · {t.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
