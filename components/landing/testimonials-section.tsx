'use client';

import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Fatima Akhter',
    role: 'HR Manager, Dhaka Bank',
    text: 'ResumeBuilder helped me create a professional CV that landed me 5 interview calls in one week. The Bangladeshi-style format is exactly what local employers expect.',
    rating: 5,
  },
  {
    name: 'Rafiq Hasan',
    role: 'Software Engineer, Pathao',
    text: 'The two-column template is perfect for tech professionals. The skills section with progress bars made my resume stand out. Highly recommended!',
    rating: 5,
  },
  {
    name: 'Tania Sultana',
    role: 'MBA Graduate, University of Dhaka',
    text: 'As a fresh graduate, I was confused about CV format. This tool made it so easy. The education section layout is exactly what Bangladeshi recruiters look for.',
    rating: 5,
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-20 md:py-28 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
            Testimonials
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
            Loved by{' '}
            <span className="text-blue-600">Thousands</span> of Job Seekers
          </h2>
          <p className="mt-4 text-slate-600 text-lg">
            See what professionals and students across Bangladesh are saying.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 border border-slate-100 hover:shadow-lg transition-shadow"
            >
              <Quote className="w-8 h-8 text-blue-100 mb-4" />
              <p className="text-sm text-slate-600 leading-relaxed mb-4">&ldquo;{testimonial.text}&rdquo;</p>
              <div className="flex items-center gap-1 mb-3">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                ))}
              </div>
              <div className="border-t border-slate-100 pt-3">
                <p className="text-sm font-semibold text-slate-900">{testimonial.name}</p>
                <p className="text-xs text-slate-500">{testimonial.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
